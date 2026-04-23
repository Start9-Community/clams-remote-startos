<p align="center">
  <img src="icon.svg" alt="Clams Remote Logo" width="21%">
</p>

# Clams Remote on StartOS

> **Upstream docs:** <https://github.com/clams-tech/Remote#readme>
>
> Everything not listed in this document should behave the same as upstream
> Clams Remote. If a feature, setting, or behavior is not mentioned here,
> the upstream documentation is accurate and fully applicable.

[Clams Remote](https://clams.tech/remote) is an open-source progressive web app for controlling Core Lightning nodes. Send and receive lightning and onchain transactions, create BOLT12 offers, and view the status of your channels from your phone or desktop.

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Dependencies](#dependencies)
- [Backups and Restore](#backups-and-restore)
- [Health Checks](#health-checks)
- [Building from Source](#building-from-source)

---

## Image and Container Runtime

| Property | Value |
|----------|-------|
| Image | `nginx:1.27-alpine` serving the Clams Remote static SPA (built from upstream `clams-tech/Remote`) |
| Architectures | x86_64, aarch64 |

Clams Remote is a browser-only progressive web app: all logic runs client-side. The StartOS package ships an nginx container whose sole job is to serve the built static files. All lightning-node communication happens directly from your browser to Core Lightning's websocket interface.

---

## Volume and Data Layout

| Volume | Mount Point | Purpose |
|--------|-------------|---------|
| `main` | `/data` | Reserved for future persistent state; currently unused by the service |

The SPA itself is stateless server-side; all user state (nodes, settings) is stored in the browser.

---

## Installation and First-Run Flow

1. **Install Core Lightning** on StartOS if you do not already have it.
2. **Enable the websocket interface in Core Lightning.** Open Core Lightning → Actions → Config, toggle **Clams Remote** on, and save. This adds `ws::7272` to CLN's `bind-addr` list and exposes the websocket interface that Clams Remote needs.
3. **Install Clams Remote** from the marketplace and start it.
4. **Open the web UI** (Tor or LAN).
5. **Add your node in Clams Remote:** Wallets → Add → Core Lightning → Advanced → Direct Connection → `ws`. Paste the **Remote Websocket URI** from Core Lightning's Properties into the Address field, and paste a **Rune** (Core Lightning → Actions → Generate Rune) into the Rune field. Click **Update**. The status should change to **Connected**.

**Tor vs. LAN:** over Tor Browser, use the `.onion` address and scheme `ws`. On your LAN, use the `.local` address and scheme `wss`.

---

## Network Access and Interfaces

| Interface | Protocol | Port | Purpose |
|-----------|----------|------|---------|
| Web UI | HTTP | 80 | Clams Remote progressive web app |

Both Tor and LAN bindings are exposed via a standard StartOS MultiHost. The SPA itself listens on no network ports — the browser talks directly to Core Lightning's websocket endpoint (port 7272), which must be reachable from the same network context as the browser (Tor or LAN).

---

## Dependencies

| Dependency | Required | Health Check | Version |
|------------|----------|--------------|---------|
| Core Lightning (`c-lightning`) | Yes | `lightningd` | `>=25.12.1:8` |

The **Clams Remote** toggle in Core Lightning's config action must be enabled. It is the only CLN configuration required for this service.

---

## Backups and Restore

The `main` volume is included in backups for symmetry with other packages, but the service currently stores no persistent state there — all user-visible state lives in the browser's local storage.

---

## Health Checks

| Check | Purpose |
|-------|---------|
| `primary` (port 80) | nginx is listening and ready to serve the web app |

---

## Building from Source

### Prerequisites

- `docker` with `buildx`
- `node` (LTS) and `npm`
- `start-cli` from the [start-os SDK](https://docs.start9.com/latest/developer-docs/packaging)
- `make`

### Clone

```sh
git clone https://github.com/clams-tech/clams-remote-startos
cd clams-remote-startos
git submodule update --init --recursive
```

### Build

```sh
make           # build for all supported architectures
make x86       # amd64 only
make arm       # arm64 only
```

### Install

With `host: http://<your-server>.local` set in `~/.startos/config.yaml`:

```sh
make install
```

Or install manually:

```sh
start-cli package install clams-remote.s9pk
```
