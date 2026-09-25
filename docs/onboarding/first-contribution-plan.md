# PREIShare first contribution plan

**Author:** Ryan Lindsay (@ryanj-lindsay)
**Date:** 2026-09-25
**Branch:** `docs/first-contribution-ryan` (from `main` at `956a94f`, which already includes upstream `main` at `20d98f9`)
**Inputs:** `docs/onboarding/repo-map.md`, `docs/onboarding/team-orientation-notes.md`, `docs/onboarding/ai-tooling-verification.md` (on branch `docs/agent-rules`, not yet merged)

## 1. Goal

Add a `CONTRIBUTORS.md` file at the repo root that lists me as a contributor. This practices the full fork → branch → PR → review loop on a change with no runtime effect.

## 2. Why this change

- Orientation notes §1: the first job is landing "a small, reviewed pull request", not shipping features.
- A Markdown file cannot break the build, the router, or the app, and the repo has no CI to catch breakage (repo-map §5).
- The repo has no `CONTRIBUTORS.md` today, so this adds something new without editing anyone else's work.

## 3. Scope

**Exactly one change:** create `CONTRIBUTORS.md` at the repo root containing:

1. A `# Contributors` heading.
2. One sentence: contributors add themselves in their first PR, one line each, at the end of the list.
3. A single entry for me:
   `- Ryan Lindsay (@ryanj-lindsay): onboarding docs`

**Placement note for the reviewer:** repo-map §6 lists `docs/**` and `README.md` as safe first-touch paths. A new root-level `CONTRIBUTORS.md` is not on that list. It follows the common GitHub convention and has no runtime effect, but the PR description must call it out. If the reviewer prefers, move it to `docs/CONTRIBUTORS.md` in the same PR.

## 4. Files

| File | Action |
| --- | --- |
| `CONTRIBUTORS.md` | **Create.** The only file this change creates or edits. |

The implementation commit touches no other file.

**What the PR will actually contain:** upstream `main` does not yet have my earlier onboarding commits (`docs/onboarding/` repo map, setup log, orientation notes) or this plan. A PR from this branch into upstream therefore also carries those commits. The PR description must list them. If the team wants a one-file PR, those docs need to be merged first, or the `CONTRIBUTORS.md` commit gets cherry-picked onto a branch cut from `upstream/main`. I'll ask the reviewer which they prefer before opening the PR.

## 5. Out of scope

- Adding other people to the list. Each contributor adds their own entry.
- Editing `README.md` to link to `CONTRIBUTORS.md`. That can be a separate follow-up PR.
- Any change under `src/`, or to `package.json`, `package-lock.json`, `vite.config.ts`, `tsconfig.json`, `tsr.config.json`, or `.cta.json`.
- Shared agent config: `AGENTS.md`, `.cursorrules`, `.cursor/`, `.vscode/`, a new `CLAUDE.md`. The `CLAUDE.md` and `.cursorrules` questions stay open in the verification report.
- Any change to the other onboarding docs, or to the `docs/agent-rules` PR.
- Emails, contact details, or personal information beyond a name and a public GitHub handle.
- "While I was here" edits: typo fixes, reformatting, reordering.

## 6. Acceptance criteria

The PR is done when all of these hold. They are the orientation-notes §4 definition of done, applied to this change.

1. **One file:** the implementation commit adds only `CONTRIBUTORS.md` (`git show --stat HEAD`). This plan is a separate, earlier commit.
2. **Content:** the file has the heading, the one-sentence instruction, and exactly one entry in the format from §3.
3. **Branch is current:** rebased on the latest upstream `main` right before opening the PR, with no merge conflicts.
4. **Clean diff:** one commit with a clear message (for example, `Add CONTRIBUTORS.md with first entry`). No stray whitespace, placeholder text, or commented-out lines.
5. **Self-review:** I read the full diff on GitHub before requesting review.
6. **PR description:** states why (first reviewed PR), what (one new file, plus any carried onboarding commits listed per §4), how to verify (§7), and the root-placement note from §3.
7. **Workflow:** pushed to my fork (`origin`) and opened as a PR into `EdTechForLearning/PREIShare-org-repo:main`. Never pushed to upstream or to `main` directly.
8. **Feedback:** every reviewer comment is answered or resolved before asking for another look.

## 7. Verification

Run on the branch before opening the PR:

```bash
git fetch upstream
git rebase upstream/main            # branch is current (criterion 3)
git show --stat HEAD                 # implementation commit adds only CONTRIBUTORS.md (criterion 1)
git show HEAD                        # read the change line by line (criteria 2, 4, 5)
git diff --stat upstream/main...HEAD  # everything the PR will carry; list it in the description (§4)
```

Then, on GitHub:

- The PR "Files changed" tab matches `git diff --stat upstream/main...HEAD`: `CONTRIBUTORS.md` plus any onboarding docs named in the description, and nothing else.
- The file renders correctly in GitHub's Markdown preview.

No build or dev-server check is needed, because no app file changes. The repo has no lint, test, or CI to run (repo-map §5).

## 8. Risks

| Risk | Mitigation |
| --- | --- |
| A teammate also creates `CONTRIBUTORS.md` first, causing a conflict | Rebase on upstream `main` before opening the PR. If the file exists, add one line at the end instead of creating it. |
| The reviewer wants the file under `docs/` | Move it in the same PR. It's still one file. |
| An agent helping with the change widens the scope | This branch has the old scaffold `AGENTS.md` and no `.cursor/rules/preishare.mdc`, because the `docs/agent-rules` PR isn't merged. Give the agent this plan's §3–5 as its whole brief, and check its diff against criterion 1. |
| PR carries unmerged onboarding commits | See §4. List them in the PR description, and confirm the reviewer's preference before opening the PR. |
