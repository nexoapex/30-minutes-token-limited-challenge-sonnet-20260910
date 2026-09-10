# Prompt: Write a Commit Message From Staged Changes

Use for: fast, consistent commit messages that explain "why."

```
Write a commit message for the currently staged changes.

- First line: imperative mood, under 72 characters, summarizing the change
  (e.g. "Fix race condition in session cleanup", not "Fixed bug").
- Body (only if the "why" isn't obvious from the first line): 1-3 sentences
  on the motivation or the problem being solved. Do not restate what the diff
  does line by line — that's what `git diff` is for.
- Do not mention file names unless the change is a rename/move and that's the
  whole point of the commit.
- Match this repo's existing commit style — check the last 10 messages with
  `git log --oneline -10` first.
```

## Why this works

Constraining to "why, not what" is the single change that most improves
commit message quality — file-by-file summaries are redundant with the diff
itself and add noise to `git log`.
