# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

**Start every task at the recipe index** — `../start-technologies/projects/start-sdk/docs/src/recipes.md`
(or <https://docs.start9.com/packaging/recipes.html>). It maps an intent ("prompt the user to create
admin credentials", "expose a web UI") to the constructs, the reference pages, and a named production
package to copy. Find the recipe before you read this package's neighbours: a package you reach by
grepping may be non-conformant, and the recipe outranks it.

Freshly scaffolded? Work the
[New Package Checklist](../start-technologies/projects/start-sdk/docs/src/new-package-checklist.md)
(or <https://docs.start9.com/packaging/new-package-checklist.html>) from top to bottom. It is a
guide page, not a file in this repo — read it, don't copy it in.

Keep `README.md` (technical reference for an AI support or administering agent) and
`instructions.md` (end-user docs) in sync with your changes.

**Bugs and feature requests are GitHub issues on this repo** — file them as you find them.
Don't record work in the repo instead: no `TODO.md`, no `NOTES.md`, no `PLAN.md`. What you
verified, tried, and decided belongs in the commit message and the PR body.

## This repo

- **The container never talks to Core Lightning, and must not start.** This is a static SPA served by nginx; the browser holds the rune and opens the websocket itself. Don't add an address resolution, a dependency mount, or a proxy — any of them would put node credentials on the server, which is the thing this design avoids.
- **The Core Lightning dependency is declared for ordering and gating only.** Nothing is mounted and no bridge address is read; it exists so the app is not installed without a node.
- **Run `git submodule update --init --recursive` before a local build.** The app lives in the `clams-remote/` submodule; without it there is nothing to compile.
- **The `main` volume is unused.** Leave it: it keeps the package's shape standard, and removing it would be a migration for no gain.
