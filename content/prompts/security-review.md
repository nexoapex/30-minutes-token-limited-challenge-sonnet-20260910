# Prompt: Security Review of Changed Code

Use for: a focused security pass on a diff before merge (not a full pentest).

```
Review [diff/PR] for security issues introduced or touched by this change:

1. Injection: SQL/NoSQL/command/template injection from any new user-controlled
   input reaching a query, shell call, or template render.
2. AuthZ/AuthN: new or modified endpoints/handlers — confirm they check the
   right permission for the right resource, not just "is logged in."
3. Secrets: API keys, tokens, credentials committed in code, config, or test
   fixtures — including ones that look like placeholders but aren't.
4. Deserialization/parsing: unsafe eval, pickle-equivalents, XML entity
   expansion, unbounded input sizes on parsers.
5. Data exposure: new fields/endpoints/logs that could leak PII or internal
   data to a client or log aggregator that shouldn't see it.

For each finding: exact file:line, the attack scenario (attacker input → what
they gain), and severity (critical/high/medium/low). Skip theoretical issues
with no realistic attacker-controlled path — flag only what's actually
reachable given how this code is called.
```

## Why this works

Naming the OWASP-style categories explicitly gets broader coverage than "check
for security issues." The "actually reachable" constraint filters out the
noisy, technically-true-but-irrelevant findings that make security review
output hard to act on.
