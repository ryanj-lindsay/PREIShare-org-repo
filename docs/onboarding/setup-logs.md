# PREIshare setup log

**Learner:** Ryan
**Date:** 2026-09-17
**OS:** Windows + WSL2 (Linux 6.6.87.2-microsoft-standard-WSL2)
**Team repo (upstream):** https://github.com/EdTechForLearning/PREIShare-org-repo
**Orientation notes used:** `docs/onboarding/team-orientation-notes.md`

## 1. Accounts and fork

| Check | Result | Notes |
| --- | --- | --- |
| GitHub sign-in works | PASS | Account username: @ryanj-lindsay |
| Can view team repo https://github.com/EdTechForLearning/PREIShare-org-repo | PASS | |
| Fork created in my account | PASS | My fork URL: https://github.com/ryanj-lindsay/PREIShare-org-repo |

## 2. Git install and identity

```text
# git --version
git version 2.43.0

# git config --global user.name
Ryan

# git config --global user.email
lindsayryan0@gmail.com
```

Identity configured: PASS

## 3. Clone (of MY fork)

- Parent directory used: `/home/ryan_lindsay/school/3330/PREIshare-workspace`
- Clone command used: `git clone https://github.com/ryanj-lindsay/PREIShare-org-repo.git`
- Cloned my fork (not the team repo): PASS
- Clone completed without error: PASS
- Local project path: `/home/ryan_lindsay/school/3330/PREIshare-workspace/PREIShare-org-repo`

## 4. Remotes (run inside the repo)

- `git remote add upstream https://github.com/EdTechForLearning/PREIShare-org-repo.git` run: PASS

### git remote -v

```text
origin    https://github.com/ryanj-lindsay/PREIShare-org-repo (fetch)
origin    https://github.com/ryanj-lindsay/PREIShare-org-repo (push)
upstream  https://github.com/EdTechForLearning/PREIShare-org-repo.git (fetch)
upstream  https://github.com/EdTechForLearning/PREIShare-org-repo.git (push)
```

origin points at MY fork: PASS
upstream points at the team repo: PASS

## 5. Post-clone verification

### git status

```text
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

### Default branch

```text
# git branch --show-current
main
```

Default branch name: `main`
Working tree clean after clone: PASS (this setup log itself has since been committed and pushed to `origin/main`)

## 6. Auth notes (no secrets)

- Clone method: HTTPS
- Auth method used (if prompted): credential helper
- Auth succeeded: PASS
- **Do not paste tokens or private keys here**

## 7. Issues and fixes

| Issue | What I tried | Outcome |
| --- | --- | --- |
| None | | |

## 8. Ready for next step

I have a fork I own, a local clone of it with origin and upstream set, and a setup log another teammate could audit: YES
