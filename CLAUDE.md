# Agent guidance

## Nexo Apex credential location

The designated local credential collection is `~/Projects/github/nexoapex/.app-credentials/`. Read
`~/Projects/github/nexoapex/.app-credentials/README.md` and `~/Projects/github/nexoapex/.app-credentials/inventory.json` before
looking for signing keys, App Store Connect keys, Google service accounts, or
RevenueCat credentials. Match the app, environment, purpose, and account scope;
shared Apple API keys are not exclusive to one app.

If the collection or a required entry is missing, report the missing credential;
do not generate, rotate, revoke, or borrow another app's key as a shortcut.
Existing consumer paths use compatibility symlinks to the collection.
New credentials belong in the collection, with
source and ownership metadata recorded there. Keep directories mode 0700 and
files mode 0600. Never commit credential material, paste it into logs or PRs, or
copy the private inventory into this repository. This lookup convention does
not authorize access changes, uploads, purchases, or store publication.

Look up this repository in the private inventory; absence of an entry does not
mean another project’s credentials are suitable.
