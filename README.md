<p align="center">
  <img src="icon.png" alt="Clams Remote Logo" width="21%">
</p>

# Clams Remote on StartOS

> Everything not listed in this document should behave the same as upstream
> Clams Remote. If a feature, setting, or behavior is not mentioned here, the
> upstream documentation is accurate and fully applicable — see the
> Documentation section of `instructions.md` for links.

[Clams Remote](https://github.com/clams-tech/Remote) is a browser-only app for controlling a Core Lightning node. **Everything runs client-side**: this package serves the built page and nothing else, and the browser talks straight to Core Lightning's websocket. That single fact explains almost every difference below.

- **Upstream repo:** <https://github.com/clams-tech/Remote>
- **Wrapper repo:** <https://github.com/Start9-Community/clams-remote-startos>

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

One image, built here: nginx plus the built static app.

| Property      | Value                               |
| ------------- | ----------------------------------- |
| Image         | Built from this repo's `Dockerfile` |
| Architectures | x86_64, aarch64                     |
| Command       | `nginx -g 'daemon off;'`            |

| Subcontainer | Purpose                                  |
| ------------ | ---------------------------------------- |
| `primary`    | The only daemon — the one to `attach` to |

**The container's entire job is to hand the browser a page.** It holds no node credentials, opens no connection to Core Lightning, and has nothing to configure. A support question about a wallet not connecting is almost never about this container.

## Volume and Data Layout

One volume, and nothing uses it.

| Volume | Mount Point | Purpose                                       |
| ------ | ----------- | --------------------------------------------- |
| `main` | `/data`     | Mounted, but the service writes nothing to it |

Every piece of user state — wallets, node connections, runes, settings, transaction history — lives in the **browser's** local storage on the device being used, not on the server. See [Backups and Restore](#backups-and-restore), because this is what surprises people.

## File Models

None. The package writes no configuration file and models nothing; nginx's configuration is baked into the image.

There is nothing on the server to seed, correct, or inspect — which also means there is no server-side setting that could be wrong.

## Dependencies

One, and it is required — though not in the way most dependencies are.

| Dependency     | Required | Health checks required | Mounted | Why                           |
| -------------- | -------- | ---------------------- | ------- | ----------------------------- |
| Core Lightning | Yes      | `lightningd`           | Nothing | The node the browser controls |

**Nothing is mounted and no address is resolved.** This package never talks to Core Lightning; the dependency exists because the app is useless without a node, and because the user has to configure that node before the app can reach it.

**Core Lightning's websocket must be turned on**, from its own configuration action, and that is a step nothing here can do or verify. Until it is, Clams Remote will serve perfectly and fail to connect. Refer users to Core Lightning's own settings for it.

## Network Access and Interfaces

One interface, which serves the page — and one connection that does **not** go through it.

| Interface | Id   | Type | Port | Description              |
| --------- | ---- | ---- | ---- | ------------------------ |
| Web UI    | `ui` | ui   | 80   | The Clams Remote web app |

Bound on the `ui-multi` MultiHost over HTTP and not masked.

**The browser connects to Core Lightning directly**, on Core Lightning's own websocket address, not through this service. So two addresses are in play at once, and they have to match in network context: a page loaded over Tor must be given Core Lightning's onion address, and a page loaded over the LAN must be given its LAN address. Mixing them fails at the browser, with nothing on the server to show for it.

That is also why the scheme differs between the two — the LAN address is TLS-terminated by StartOS and the onion is not.

## Installation and First-Run Flow

There is no wizard, no credential, and no task on this side. The work is on Core Lightning's side and in the browser:

1. Turn on Core Lightning's websocket, in its own configuration.
2. Generate a rune there, and copy its websocket address.
3. Start Clams Remote, open the interface, and add the node in the app using both.

**Nothing about that survives on the server.** It is entered into the browser, and stays there.

## Actions

None. The package ships an empty action set — there is nothing on the server side to act on.

## Tasks

None. This package raises no tasks, so the service is never held on a prompt and its ordinary controls are always available.

## Health Checks

One check, on the only daemon.

| Check     | Displayed as    | Method               |
| --------- | --------------- | -------------------- |
| `primary` | "Web Interface" | Port 80 is listening |

**A green check means the page is being served, and says nothing about your node.** A user whose wallet shows disconnected while this check is green is looking at a Core Lightning problem, a websocket that was never enabled, or an address given to the app from the wrong network context.

## Backups and Restore

The `main` volume is copied wholesale — `sdk.Backups.ofVolumes('main')` — and in practice **the backup is empty**, because the service writes nothing.

**A StartOS backup of this service protects nothing.** Wallets, node connections, runes and history are in the browser's local storage. Clearing site data, switching browsers, or moving to another device means setting the connection up again, whatever backups exist here. The rune is the thing worth keeping a copy of, and it is generated by Core Lightning rather than by this package.

## Limitations and Differences

1. **All state is browser-side.** Backups, restores, and moving to a new device do nothing for your configuration.
2. **The websocket must be enabled on Core Lightning**, and this package cannot do it or detect that it is missing.
3. **The address you give the app must match how you loaded the page** — onion with onion, LAN with LAN, each with its own scheme.
4. **No actions and no configuration.** There is nothing to set on this service.
5. **The volume is unused**, and kept only for the shape of a standard package.
6. **Health says nothing about the node.** It reports only that the page is being served.

---

## Quick Reference for AI Consumers

```yaml
package_id: clams-remote
image: built from ./Dockerfile # nginx serving the built upstream SPA
architectures:
  - x86_64
  - aarch64
subcontainers:
  - primary
volumes:
  main: /data # mounted but unused
file_models: []
startos_managed_env_vars: []
dependencies:
  - c-lightning # required, kind: running; nothing mounted, no address resolved
interfaces:
  ui: { type: ui, port: 80 }
actions: []
tasks: []
health_checks:
  - primary # displayed "Web Interface"; reports the page only
```
