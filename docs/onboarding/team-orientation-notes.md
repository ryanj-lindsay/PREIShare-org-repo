# PREIshare team orientation notes

Author: Ryan Lindsay
Date: 2026-09-17

## 0. Team repository of record

- **Team repo (upstream):** https://github.com/EdTechForLearning/PREIShare-org-repo
- **My fork (created in Step 3):** https://github.com/ryanj-lindsay/PREIShare-org-repo
- I contribute by forking this repo and opening pull requests from my fork. I do not push to the team repo directly.

## 1. Product mission (my words)

PREIshare is a intelligence built for smart real-estate decisions. My job is not to ship any major features, but join a team
in a professional way, by practicing safe team collaboration methods, using AI responsibly, and landing a small, reviewed pull request.

## 2. Everyday collaboration → engineering workflow

| Everyday picture                    | PREIshare engineering parallel               |
| ----------------------------------- | -------------------------------------------- |
| Shared work in progress file        | Shared default branch on the team repository |
| My draft copy with my changes       | My feature branch with a small change        |
| Save history                        | Commits with clear messages                  |
| Ask a peer to review before publish | Open a pull request (PR) for review          |
| Peer approves, then we publish      | Review passes, then the PR can merge         |

## 3. Actors in a pull-request workflow

- **Contributor (me):** picks a tiny safe change, works on a branch, describes the change, responds to feedback.
- **Reviewer (teammate or simulated reviewer):** checks correctness, scope, and clarity before merge.
- **Shared repository:** the team’s source of truth on GitHub; default branch is protected by process even when tools allow edits.
- **Automation (later):** checks such as GitHub Actions may run on the PR; I treat failing checks as blockers, not noise.

## 4. First-PR definition of done (beginner-safe)

My first reviewed PR is done only when all of the following are true:

1. **Branch is current:** My feature branch is up to date with main, so the PR has no avoidable merge conflicts.
2. **Change is scoped:** The PR touches only the files needed for this one change—no unrelated edits mixed in.
3. **Description is complete:** The PR explains why the change exists, what changed, and how to verify it, so a reviewer doesn't have to ask.
4. **Diff is easy to review:** Commit messages are clear, the diff has no leftover debug code or commented-out lines, and any non-obvious decision has an inline note.
5. **I checked it myself first:** I read my own diff top to bottom and fixed anything sloppy before asking a teammate to spend time on it.
6. **No blockers are outstanding:** Any automated checks pass, and I've responded to earlier feedback before requesting another look.

## 5. Out of scope for the first PR

- Large refactors, dependency upgrades, or database schema changes
- Secrets, production credentials, or real customer data
- “While I was here” unrelated edits that enlarge review risk

## 6. How I will use AI on this team

I will prompt agents in small cycles: understand → plan → prompt → review → refine.
I will not paste secrets into agents. I will not accept agent output I cannot explain.
Orientation complete means I can tell a human what PREIshare is, who is in the
PR loop, and what “first PR done” means—before I configure tools or write code.
