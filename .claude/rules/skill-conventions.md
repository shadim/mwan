---
name: skill-conventions
description: When and how to invoke skills and agents defined in .claude/agents/ and via the Skill tool
---

# Skill & Agent Conventions

## Available agents (`.claude/agents/`)
Invoke with `@agent-name` or via the Agent tool.

| Agent | Invoke when |
|-------|------------|
| `code-reviewer` | Before marking any non-trivial task done; after implementing a feature |
| `code-simplifier` | Code feels over-engineered; after a first-pass implementation |
| `comment-analyzer` | Pre-release or pre-PR; after a large refactor |
| `db-completeness-reviewer` | After adding a migration or new route that touches the DB |
| `infra-reviewer` | Before any deployment; when changing Dockerfile/compose/Railway config |
| `pr-test-analyzer` | After creating or updating a PR; when writing a test plan |
| `security-reviewer` | Any auth change; new API routes; before a release |
| `silent-failure-hunter` | After implementing payment, attendance, or auth flows |
| `type-design-analyzer` | When adding new interfaces; when `any` usage is growing |

## When NOT to use an agent
- Simple, self-contained edits (fixing a typo, updating a comment, renaming a variable)
- When you already have full context and the task is a single-file change
- Don't chain agents unnecessarily — one agent per concern per task

## Agent prompting rules
- Always give the agent the specific files or scope to review — never "review everything"
- Include the outcome you're trying to achieve, not just the task: "check for SQL injection in the new finance route"
- If an agent returns findings, address them before reporting the task done

## Available skills (Skill tool)
- `/commit` — stage and commit with a conventional message
- `/review` — trigger Copilot/AI review on an open PR
- `update-config` — modify `settings.json` or `settings.local.json` (for hooks, permissions, env vars)

## Running agents in parallel
When multiple independent concerns exist, launch agents simultaneously:
```
// Review security AND check DB completeness at the same time
Agent(security-reviewer, "check new /api/payments route")
Agent(db-completeness-reviewer, "check new payments table migration")
```

## Escalation path
If a review agent finds a CRITICAL issue, stop and fix before proceeding.
If it finds WARNINGs, list them to the user and ask whether to fix now or log a TODO.
SUGGESTIONS can be addressed in a follow-up task.
