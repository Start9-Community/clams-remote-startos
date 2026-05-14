# Clams Remote

## Documentation

- [Clams Remote README](https://github.com/clams-tech/Remote#readme) — the upstream README, covering the app's design and features.

## What you get on StartOS

Clams Remote is a browser-only progressive web app for controlling Core Lightning nodes. This package serves the built static app from an nginx container; everything else — node connections, settings, transaction history — lives in your browser. Your browser talks directly to Core Lightning's websocket; the StartOS package only delivers the page.

You get a **Web UI** interface, available over both Tor and your LAN.

## Getting set up

Install **Core Lightning** first if you do not already have it — Clams Remote depends on it.

1. In Core Lightning, open **Actions** → **Config**, toggle **Clams Remote** on, and save. This exposes the websocket interface (port 7272) that Clams Remote needs to reach your node.
2. In Core Lightning, run **Actions** → **Generate Rune** and copy the rune it produces.
3. In Core Lightning, open **Properties** and copy the **Remote Websocket URI**.
4. Start Clams Remote and open its **Web UI** from the Dashboard.
5. In Clams Remote, choose **Wallets** → **Add** → **Core Lightning** → **Advanced** → **Direct Connection** → **ws**.
6. Paste the Remote Websocket URI into **Address** and the rune into **Rune**, then click **Update**. The status should change to **Connected**.

When reaching the Web UI over Tor Browser, use the `.onion` address with scheme `ws`. On your LAN, use the `.local` address with scheme `wss`.

## Using Clams Remote

Once your node is connected you can send and receive lightning and on-chain transactions, create BOLT12 offers, and view channel status. All node activity flows directly from your browser to Core Lightning — keep the same network context (Tor or LAN) when switching between the Clams Remote UI and the URI you pasted in.

Wallets, settings, and transaction history are kept in the browser's local storage. Clearing site data, switching browsers, or switching devices means setting up the connection again.
