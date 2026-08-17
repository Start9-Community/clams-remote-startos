# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (technical reference for an AI support or administering agent) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **The container never talks to Core Lightning, and must not start.** This is a static SPA served by nginx; the browser holds the rune and opens the websocket itself. Don't add an address resolution, a dependency mount, or a proxy — any of them would put node credentials on the server, which is the thing this design avoids.
- **The Core Lightning dependency is declared for ordering and gating only.** Nothing is mounted and no bridge address is read; it exists so the app is not installed without a node.
- **Run `git submodule update --init --recursive` before a local build.** The app lives in the `clams-remote/` submodule; without it there is nothing to compile.
- **The `main` volume is unused.** Leave it: it keeps the package's shape standard, and removing it would be a migration for no gain.
