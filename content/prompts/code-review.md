# Prompt: Focused Code Review

Use for: reviewing a diff, PR, or set of changed files before merge.

```
Review the changes in [DIFF / PR #NNN / file paths] for:

1. Correctness — logic errors, off-by-one, wrong operator, unhandled edge case,
   race conditions, null/undefined paths that aren't actually impossible.
2. Reuse & simplification — duplicated logic that already exists elsewhere,
   over-engineered abstractions for a one-off need, dead code.
3. Efficiency — unnecessary loops/allocations, N+1 queries, blocking calls on
   a hot path.
4. Security — injection, unsafe deserialization, secrets in code, missing
   authz checks on new endpoints.

Rules:
- Only report issues you can point to a concrete failure scenario for (input →
  wrong output/crash). No style nitpicks unless they cause a real bug.
- Rank findings most-severe first.
- For each finding: file:line, one-sentence summary, the concrete failure
  scenario, and a suggested fix.
- If nothing is wrong, say so — don't invent minor issues to seem thorough.
```

## Why this works

Naming the four lenses explicitly (correctness, reuse, efficiency, security)
stops the review from drifting into generic style commentary. The "concrete
failure scenario" rule is the single highest-leverage constraint — it filters
out plausible-sounding-but-wrong findings before they reach you.
