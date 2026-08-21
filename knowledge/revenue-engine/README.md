# Revenue Engine

A non-custodial creator-commerce system for producing, packaging, listing, promoting, and measuring digital assets across NFT/coin and conventional digital-product channels.

## Principles

1. Never store seed phrases, private keys, recovery phrases, card numbers, or banking credentials.
2. Human signature is mandatory for blockchain transactions and any marketplace step that creates a charge or transfers value.
3. No fake volume, wash trading, fake reviews, spam, misleading scarcity, copyright infringement, impersonation, or guaranteed-return claims.
4. Prefer zero-upfront-cost channels first; only spend money after an explicit budget is set.
5. Revenue settles directly to accounts/wallets controlled by the owner.

## Agent stack

- **Opportunity Scout** — ranks current monetization opportunities by cost, friction, time-to-market, and plausible demand.
- **Collection Architect** — creates collection concepts, naming, edition structure, utility, and release cadence.
- **Generative Studio** — builds original SVG-based digital art and metadata without third-party copyrighted assets.
- **Product Factory** — repackages original art into wallpapers, printable art, creator packs, templates, and bundles.
- **Listing Agent** — prepares titles, descriptions, tags, pricing hypotheses, royalties, and platform-specific listing payloads.
- **Distribution Agent** — prepares launch calendars and organic distribution copy without spam or deceptive engagement.
- **Analytics Agent** — records views, clicks, sales, fees, conversion, realized revenue, and channel ROI.
- **Risk & Rights Agent** — checks provenance, platform constraints, disclosures, security gates, and IP risks before release.

## Initial channel order

1. Zora posts/creator content — free creation; creator rewards depend on trading activity.
2. Ko-fi digital products/commissions — no listing fee; direct payout to the owner's payment account.
3. itch.io creator assets/tools — seller-selectable platform revenue share.
4. OpenSea — broad NFT distribution, but minting/deployment requires wallet signatures and network gas.
5. Rarible — NFT creation plus community marketplace option; wallet signature required.
6. Magic Eden — Solana-first marketplace in 2026; wallet signature required.
7. Etsy/Gumroad — useful once products and demand are validated because fees are higher or listing charges apply.

## First collection: Signal Relics

A deterministic generative-art series based on geometric signals, orbital paths, and machine-readable provenance. The generator creates original SVGs and NFT-compatible JSON metadata. The same originals can be packaged as phone/desktop wallpapers and printable digital art, giving each design multiple legitimate revenue channels.

Run locally:

```bash
python revenue-engine/src/generate_signal_relics.py --count 24 --out revenue-engine/build/signal-relics
```

The output contains `images/*.svg`, `metadata/*.json`, and `catalog.json`.

## Publication gates

Before any live listing, configure only public identifiers (usernames, public wallet address, store URLs) in `config/platforms.json`. Secret credentials belong only in the platform's own secure login/session or repository secrets when a documented API requires them. Never commit secrets.

## Earnings monitoring

The analytics layer can monitor public on-chain addresses and exported marketplace reports. A positive-revenue alert should be enabled only after a public wallet address and/or marketplace account identifier is supplied. Earnings should never route through this software or an AI-controlled wallet.