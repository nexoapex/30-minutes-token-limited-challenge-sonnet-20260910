---
name: dependency-upgrade-checklist
description: Safely upgrade a package/dependency version. Use when the user asks to "upgrade X", "bump the version of Y", or "update dependencies".
---

# Dependency Upgrade Checklist

Upgrading a dependency is a common source of silent breakage. Follow this
sequence rather than just bumping the version number.

## Steps

1. Check the current and target version, and read the changelog/release notes
   between them — specifically look for breaking changes, not just new
   features.
2. Search the codebase for every usage of the package's API surface that
   changed (deprecated functions, renamed exports, changed default behavior).
3. Update the lockfile and the manifest together (never hand-edit just the
   lockfile version).
4. Run the full test suite. If there is no test suite covering this package's
   usage, say so explicitly — don't report success based on "it installed
   cleanly."
5. For major version bumps: check for a migration guide and apply it, don't
   just fix type errors until they go away — a type error going away can also
   mean a silent behavior change (e.g. a param becoming optional).
6. Report: old version → new version, what broke and was fixed, and anything
   you could not verify (e.g. a code path with no test coverage).

## Guardrail

Never upgrade multiple unrelated dependencies in one change — isolate each
upgrade so a regression can be bisected to a single package bump.
