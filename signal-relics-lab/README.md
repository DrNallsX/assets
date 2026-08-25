# Signal Relics Lab

Interactive, deterministic art explorer for the Signal Relics project.

## Purpose

Turn Signal Relics from a static collection into an accessible creative-technology experience. The Lab is intentionally wallet-optional and does **not** mint into Genesis Eight.

## Canonical links

- Genesis Eight on OpenSea: https://opensea.io/collection/signal-relics-genesis-eight
- Ko-fi: https://ko-fi.com/drnalls

## Local preview

This is a static app. Serve the folder with any local HTTP server, for example:

```bash
python -m http.server 8080 --directory signal-relics-lab
```

Then open `http://localhost:8080`.

## Vercel deployment

Import `DrNallsX/assets` into Vercel and set the **Root Directory** to:

```text
signal-relics-lab
```

Framework preset: **Other** / static.

No environment variables are required for the MVP.

## Determinism

The renderer hashes:

- seed
- ring count
- vector density
- symmetry
- palette

The same parameter set reproduces the same state. Parameters are encoded in the URL so a state can be shared and reconstructed.

## Analytics hook

The app emits browser events named `signalrelics:analytics` with an event name and current state ID. Production analytics can subscribe to this event without changing the renderer.

Events currently emitted:

- `lab_open`
- `new_state`
- `share`
- `opensea_click`
- `kofi_click`

## Security and integrity

- No wallet connection is required.
- No blockchain transaction is initiated by the Lab.
- No private key, seed phrase, or wallet credential is requested or stored.
- Genesis Eight remains closed at eight 1/1 works.
- The Lab must not be used to manufacture marketplace activity.
