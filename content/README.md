# Skillpack — Prompts, Skills & Workflows for Claude Code

A curated set of battle-tested prompt templates, drop-in skills, and multi-agent
workflow scripts for developers using Claude Code day to day. Everything here
is plain text/JS/Markdown — no dependencies, no lock-in, no phoning home.

Not affiliated with or endorsed by Anthropic. "Claude Code" is used descriptively
to identify compatibility.

## What's inside

- `prompts/` — 8 copy-paste prompt templates for the tasks you repeat every week
  (code review, root-causing bugs, safe refactors, PR descriptions, commit
  messages, security review, edge-case test generation, architecture decisions).
- `skills/` — 3 ready-to-drop-in Skill folders (`SKILL.md` + description) you can
  place under `.claude/skills/` to trigger automatically on the right task.
- `workflows/` — 2 ready-made Workflow tool scripts (parallel code review with
  adversarial verification, and a multi-modal research/synthesis pipeline) you
  can hand to the `Workflow` tool as-is or adapt.
- `settings/` — a starter safe-command allowlist and an example pre-commit hook
  you can merge into your own `.claude/settings.json`.

## How to use

1. **Prompts** — open the `.md` file for the task at hand, copy the template,
   fill in the bracketed placeholders, paste into Claude Code.
2. **Skills** — copy a folder from `skills/` into your project's `.claude/skills/`
   directory (or your user-level skills directory). Claude Code will pick it up
   automatically the next session.
3. **Workflows** — copy the script body into a `Workflow` tool call, or save it
   with your own workflow name under `.claude/workflows/`.
4. **Settings** — merge the relevant keys from `settings/*.json` into your own
   `.claude/settings.json`. Review every allowlisted command before trusting it
   in your own environment — these are starting points, not guarantees.

## License

Personal/commercial use by the purchaser. Do not resell or redistribute the
pack itself as-is.
