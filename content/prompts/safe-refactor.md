# Prompt: Refactor Without Changing Behavior

Use for: cleaning up code you don't want to accidentally break.

```
Refactor [file/module/function] to [goal: extract duplication / simplify
control flow / rename for clarity / split a god-function], with these
constraints:

1. Behavior must be identical before and after — same inputs produce same
   outputs, same errors thrown in the same cases, same side effects and order.
2. Do not change public function signatures, exported names, or file paths
   unless I explicitly asked for that.
3. Do not add abstractions, config options, or generality beyond what's needed
   for the stated goal. No speculative flexibility.
4. Before you finish: list every call site of what you changed and confirm
   each one still compiles/type-checks and its existing tests still pass.
5. If a "cleaner" version would change behavior, stop and ask me rather than
   silently changing it.

Show me a diff, not a rewritten file, so I can verify scope stayed minimal.
```

## Why this works

The biggest risk in LLM-driven refactors is silent scope creep — "while I was
in there" changes that aren't behavior-preserving. Requiring a diff (not a
full rewrite) makes scope creep visible immediately, and the call-site check
catches signature drift before it ships.
