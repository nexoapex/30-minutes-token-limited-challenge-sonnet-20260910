// Skillpack workflow: parallel-code-review
//
// Reviews the current diff across independent dimensions in parallel, then
// adversarially verifies every finding before reporting it — so you don't
// get plausible-but-wrong findings mixed in with real ones.
//
// Usage: pass this script body to the Workflow tool, or save it as
// .claude/workflows/parallel-code-review.js and invoke by name.

export const meta = {
  name: 'parallel-code-review',
  description: 'Review the current diff across dimensions, verify each finding adversarially',
  phases: [{ title: 'Review' }, { title: 'Verify' }],
}

const DIMENSIONS = [
  { key: 'correctness', prompt: 'Review the current diff for correctness bugs only: logic errors, off-by-one, unhandled edge cases, race conditions. For each, give file:line, the concrete failure scenario, and severity.' },
  { key: 'security', prompt: 'Review the current diff for security issues only: injection, authz/authn gaps, secrets, unsafe deserialization. For each, give file:line, the attack scenario, and severity.' },
  { key: 'simplification', prompt: 'Review the current diff for reuse and simplification opportunities: duplicated logic, unneeded abstraction, dead code. For each, give file:line and the concrete simplification.' },
]

const FINDINGS_SCHEMA = {
  type: 'object',
  properties: {
    findings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          file: { type: 'string' },
          line: { type: 'number' },
          summary: { type: 'string' },
          failure_scenario: { type: 'string' },
          severity: { type: 'string' },
        },
        required: ['file', 'summary', 'failure_scenario'],
      },
    },
  },
  required: ['findings'],
}

const VERDICT_SCHEMA = {
  type: 'object',
  properties: {
    refuted: { type: 'boolean' },
    reason: { type: 'string' },
  },
  required: ['refuted', 'reason'],
}

const reviews = await parallel(
  DIMENSIONS.map(d => () => agent(d.prompt, { label: `review:${d.key}`, phase: 'Review', schema: FINDINGS_SCHEMA }))
)

const allFindings = reviews.filter(Boolean).flatMap(r => r.findings)
log(`${allFindings.length} candidate findings, verifying each...`)

const verified = await parallel(
  allFindings.map(f => () =>
    parallel(
      Array.from({ length: 3 }, () => () =>
        agent(
          `Try to refute this code review finding — argue why it is NOT a real, reproducible issue. Default to refuted=true if uncertain. Finding: ${f.summary} at ${f.file}:${f.line ?? '?'}. Failure scenario claimed: ${f.failure_scenario}`,
          { phase: 'Verify', schema: VERDICT_SCHEMA }
        )
      )
    ).then(votes => {
      const refutes = votes.filter(Boolean).filter(v => v.refuted).length
      return { ...f, survives: refutes < 2 }
    })
  )
)

const confirmed = verified.filter(Boolean).filter(v => v.survives)
return { confirmed, totalCandidates: allFindings.length }
