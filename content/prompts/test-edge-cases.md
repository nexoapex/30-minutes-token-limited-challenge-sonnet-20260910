# Prompt: Generate Edge-Case Tests for Existing Code

Use for: filling test gaps for code that already exists (not TDD).

```
Write tests for [function/module] covering edge cases the existing test suite
(if any) doesn't already cover:

1. Read the existing tests first — list what's already covered so you don't
   duplicate it.
2. Boundary values: empty input, single element, max size, zero, negative,
   off-by-one around any loop bound or array index.
3. Type/shape edge cases: null/undefined where the type system allows it,
   unexpected but valid input shapes (extra fields, different casing/encoding).
4. Concurrency/ordering, if applicable: what happens if this is called twice
   before the first call resolves.
5. Failure paths: what happens when a dependency (network call, file read,
   subprocess) fails or times out.

For each test, the assertion should describe the actual expected behavior —
not just "doesn't throw." If you find a case where the current behavior looks
wrong, write the test to the correct behavior and flag it separately rather
than asserting the buggy behavior as correct.
```

## Why this works

"Read existing tests first" prevents redundant coverage. The last rule is the
important one: without it, models tend to write tests that just codify
whatever the code currently does, bugs included.
