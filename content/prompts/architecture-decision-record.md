# Prompt: Write an Architecture Decision Record (ADR)

Use for: documenting a non-trivial technical decision so future-you (or
teammates) understand why, not just what.

```
Write an ADR for the decision to [decision, e.g. "use Postgres row-level
security instead of application-level authz checks"].

Structure:
- **Context**: the problem/constraint that forced a decision. What happens if
  we do nothing?
- **Decision**: what we're doing, stated plainly in one or two sentences.
- **Alternatives considered**: at least 2 other options and the concrete
  reason each was rejected (not "it was worse" — the specific tradeoff).
- **Consequences**: what this makes easier, what it makes harder, and what
  we're explicitly giving up. Include at least one real downside — if there
  isn't one, the decision probably wasn't hard enough to need an ADR.
- **Reversibility**: how hard this would be to undo later, concretely.

Base this only on the actual discussion/code/constraints I've given you — do
not invent context or stakeholders that weren't mentioned.
```

## Why this works

Requiring a real downside in "Consequences" stops ADRs from reading as
one-sided justifications. "Reversibility" is the section teams skip most and
regret skipping most.
