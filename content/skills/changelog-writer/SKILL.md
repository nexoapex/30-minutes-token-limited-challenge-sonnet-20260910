---
name: changelog-writer
description: Generate a user-facing changelog entry from recent commits. Use when the user asks to "write the changelog", "update CHANGELOG.md", or "summarize what shipped since the last release/tag".
---

# Changelog Writer

Generate a changelog entry for user-facing consumption — not a commit log dump.

## Steps

1. Find the range: `git log <last-tag>..HEAD --oneline` (or ask the user for the
   range if there's no tag).
2. Read the actual diffs for anything whose commit message is ambiguous — don't
   trust commit messages alone to describe user-visible impact.
3. Group into **Added**, **Changed**, **Fixed**, **Removed** (omit empty
   sections). Skip internal-only changes (refactors, test-only commits, CI
   config) unless they affect something a user/customer would notice.
4. Write each entry from the user's point of view: what they can now do, or
   what's different for them — not "refactored X" or "updated dependency Y"
   unless the dependency bump fixes a user-visible bug or CVE.
5. Match the existing changelog's tone and format (check `CHANGELOG.md` if one
   exists) before inventing a new structure.

## Output

Append the new entry to `CHANGELOG.md` under today's date / the target version,
above the previous entries (newest first), unless the file's existing
convention is oldest-first.
