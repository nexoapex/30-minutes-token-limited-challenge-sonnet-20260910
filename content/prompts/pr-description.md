# Prompt: Write a PR Description From the Actual Diff

Use for: generating a PR description that reviewers will actually read.

```
Write a pull request description for the changes in [branch/diff], based only
on what the diff actually does — not what the commit messages claim.

Structure:
- **Summary**: 1-3 sentences, the "why," not a restatement of file names.
- **What changed**: bullet points, grouped by concern if there are several.
- **Test plan**: concrete steps or commands to verify this, as a checklist.
- **Risk**: what could break, and what you'd want a reviewer to look at
  closely (migrations, config changes, anything hard to revert).

Keep it under 200 words outside the checklist. Do not describe intermediate
commits, reverted attempts, or implementation detail that isn't visible in the
final diff.
```

## Why this works

Asking for "why, not what" prevents the description from just narrating the
diff (which the reviewer can already see). The explicit "Risk" section
surfaces the one thing most auto-generated PR descriptions skip.
