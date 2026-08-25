# Signal Relics — Attention & Base Execution Plan

## Current canonical links

- OpenSea Genesis Eight: https://opensea.io/collection/signal-relics-genesis-eight
- Ko-fi storefront: https://ko-fi.com/drnalls
- YouTube: @SignalRelics

## Immediate owner-only actions

### 1. OpenSea — Feature My NFTs

OpenSea Profile Settings → locate **Feature My NFTs** → review license terms → enable only if comfortable granting OpenSea a non-exclusive marketing license for qualifying NFTs held in connected wallets.

Purpose: makes eligible NFTs available for possible OpenSea-produced promotional content. Selection is not guaranteed.

### 2. Base — submit Signal Relics to the Onchain Registry

Open https://base.org/registry using the wallet/account associated with the project.

Recommended submission copy:

**Project name:** Signal Relics

**Category:** Art / Creator / Onchain Art (choose closest available)

**Short description:**
Signal Relics is a deterministic digital-art system exploring geometry, code, motion, and onchain provenance. Genesis Eight is its inaugural closed collection of eight 1/1 works minted on Base.

**Long description:**
Signal Relics explores what happens when code becomes the creative medium rather than merely a tool. Its deterministic visual system produces distinct geometric states from defined rules involving symmetry, rings, vectors, controlled variation, and color. Genesis Eight is the inaugural onchain collection: eight unique 1/1 works minted on Base, permanently closed at eight pieces. The broader Signal Relics ecosystem includes digital artwork, wallpapers, motion editions, and an upcoming interactive Signal Relics Lab designed to let anyone explore the system without requiring a wallet.

**Primary URL:** https://opensea.io/collection/signal-relics-genesis-eight

**Store URL:** https://ko-fi.com/drnalls

**Network:** Base

**Creator/owner wallet:** use the project wallet already connected to OpenSea; verify the address on-screen before signing anything.

**Tagline:** This wasn't drawn. It was derived.

**Discovery pitch:** Eight immutable Genesis states from a deterministic visual system, with a frictionless interactive Lab planned for public exploration.

Do not claim sales, volume, buyers, verification, or partnerships that have not actually occurred.

### 3. Base App

Install/open the Base App and establish a creator profile for Signal Relics. Add the OpenSea Genesis Eight link and Ko-fi storefront. Publish native posts centered on curiosity and process, not repetitive sales announcements.

Initial post hook:

> I gave software a set of geometric rules. These eight states became Genesis Eight. Which one would you keep — 1 through 8?

## Signal Relics Lab — build brief

Build an interactive deterministic-art experience that turns the project into something people can use, not just view.

### MVP
- Mobile-first responsive interface
- Deterministic renderer
- Controls: ring count, vector density, symmetry mode, optional palette/seed
- No wallet required for basic exploration
- Shareable state URL if feasible
- CTA to Genesis Eight on OpenSea
- CTA to Ko-fi
- About/methodology panel
- Accessibility: keyboard controls, contrast, readable labels, reduced-motion option
- Do not expose paid full-resolution master files

### Current Base architecture
Use the current Base model: standard web app + wallet, compatible with the Base App in-app browser and registered through Base.dev metadata. Prefer wagmi + viem + SIWE/Base Account-compatible patterns. Do not depend on deprecated Farcaster-only app assumptions.

### Analytics
Track: lab_open, parameter_change, share, opensea_click, kofi_click. Use UTM-tagged outbound URLs.

### Security
- Never request or handle seed phrases/private keys
- No wallet transaction without explicit user interaction
- No arbitrary token approvals
- No manufactured NFT activity or wash trading

## Content engine

Change hooks from `NFT collection is live` to curiosity-led creative technology:

- This wasn't drawn. It was derived.
- Can an algorithm develop a visual signature?
- I gave software geometric rules. This is what happened.
- Pick a signal before you know its name: 1–8.
- What happens when code becomes the medium?

Use short-form structure:

1. 0–1 sec: disruptive hook
2. 1–3 sec: visual transformation
3. 3–7 sec: mystery/tension
4. 7–11 sec: reveal
5. 11–14 sec: participation question

## Genesis Eight integrity

Genesis Eight remains permanently closed at eight unique 1/1 works. Do not mint additional items into that collection. Do not manufacture volume or transfer among controlled wallets to simulate collectors.
