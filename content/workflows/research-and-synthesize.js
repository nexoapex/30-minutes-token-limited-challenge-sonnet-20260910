// Skillpack workflow: research-and-synthesize
//
// A multi-modal research sweep: several agents search the same question from
// different angles (blind to each other), then one agent synthesizes the
// combined findings and flags what's still unverified or missing.
//
// Usage: pass args = { question: "..." } when invoking via the Workflow tool.

export const meta = {
  name: 'research-and-synthesize',
  description: 'Multi-angle research sweep with a completeness-critic synthesis pass',
  phases: [{ title: 'Sweep' }, { title: 'Synthesize' }],
}

const question = args?.question
if (!question) {
  throw new Error('Pass args = { question: "..." } when invoking this workflow')
}

const ANGLES = [
  `Research this question by looking for primary/official sources first: ${question}`,
  `Research this question by looking for recent discussion, changes, or updates that might supersede older answers: ${question}`,
  `Research this question by looking for counter-examples or reasons the obvious answer might be wrong or incomplete: ${question}`,
]

phase('Sweep')
const sweeps = await parallel(
  ANGLES.map((prompt, i) => () => agent(prompt, { label: `angle-${i + 1}`, phase: 'Sweep' }))
)

phase('Synthesize')
const combined = sweeps.filter(Boolean).map((s, i) => `--- Angle ${i + 1} ---\n${s}`).join('\n\n')

const synthesis = await agent(
  `Here is research gathered from ${sweeps.filter(Boolean).length} independent angles on the question: "${question}"\n\n${combined}\n\nSynthesize a single answer. Note any contradictions between angles and how you resolved them. Then, as a completeness critic: what part of this question is still unverified, or what angle wasn't covered that should have been?`,
  { phase: 'Synthesize' }
)

return { question, synthesis, rawAngles: sweeps }
