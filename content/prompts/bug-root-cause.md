# Prompt: Root-Cause a Bug (Not Just Patch It)

Use for: a reported bug where the fix isn't obvious, or where you suspect a
symptom is masking a deeper issue.

```
Bug report: [paste report / stack trace / repro steps]

Before writing any fix:
1. Reproduce the bug yourself (write a failing test or minimal repro script if
   one doesn't exist) and show me the failure.
2. Trace the actual root cause — not just the line that throws, but why the
   system got into that state. If the fix is "add a null check," explain why
   the value was null in the first place, and whether that's the real bug.
3. Check whether the same root cause could cause other symptoms elsewhere in
   the codebase (search for the same pattern).
4. Only then propose the fix, and say explicitly whether it fixes the root
   cause or just this symptom.

Do not guess. If you can't reproduce it, say so and tell me what additional
information you need.
```

## Why this works

LLMs default to pattern-matching a plausible fix from the error message alone,
which often patches a symptom. Forcing reproduction before diagnosis, and
diagnosis before fix, keeps the model honest about what it actually verified
versus what it's guessing.
