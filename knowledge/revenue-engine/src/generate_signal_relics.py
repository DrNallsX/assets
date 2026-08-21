#!/usr/bin/env python3
"""Generate original SVG art and NFT-compatible metadata for Signal Relics.

Standard-library only. Deterministic: a token number always generates the same work
for a given seed. No copyrighted third-party assets are used.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import math
import random
from pathlib import Path

COLLECTION = "Signal Relics"
DESCRIPTION = (
    "A deterministic generative-art relic built from geometric signals, orbital paths, "
    "and machine-readable provenance. Generated from original first-party code."
)


def token_rng(seed: str, token_id: int) -> random.Random:
    digest = hashlib.sha256(f"{seed}:{token_id}".encode()).digest()
    return random.Random(int.from_bytes(digest[:8], "big"))


def palette(rng: random.Random) -> tuple[str, str, str, str]:
    hue = rng.randrange(0, 360)
    h2 = (hue + rng.randrange(35, 110)) % 360
    h3 = (h2 + rng.randrange(35, 130)) % 360
    return (
        f"hsl({hue} 78% 11%)",
        f"hsl({hue} 88% 56%)",
        f"hsl({h2} 82% 62%)",
        f"hsl({h3} 86% 70%)",
    )


def svg_for(token_id: int, seed: str) -> tuple[str, dict]:
    rng = token_rng(seed, token_id)
    bg, c1, c2, c3 = palette(rng)
    spokes = rng.randint(7, 18)
    rings = rng.randint(3, 8)
    phase = rng.random() * math.tau
    cx = 512
    cy = 512

    parts = [
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">',
        f'<rect width="1024" height="1024" fill="{bg}"/>',
        '<g fill="none" stroke-linecap="round">',
    ]

    for i in range(rings):
        radius = 110 + i * (330 / max(1, rings - 1))
        width = 2 + (i % 3)
        color = (c1, c2, c3)[i % 3]
        opacity = 0.35 + 0.5 * rng.random()
        dash = f'{rng.randint(10, 55)} {rng.randint(8, 45)}'
        parts.append(
            f'<circle cx="{cx}" cy="{cy}" r="{radius:.2f}" '
            f'stroke="{color}" stroke-width="{width}" opacity="{opacity:.3f}" '
            f'stroke-dasharray="{dash}" transform="rotate({rng.randrange(360)} {cx} {cy})"/>'
        )

    for i in range(spokes):
        a = phase + (math.tau * i / spokes)
        inner = rng.randint(75, 165)
        outer = rng.randint(300, 455)
        x1 = cx + math.cos(a) * inner
        y1 = cy + math.sin(a) * inner
        x2 = cx + math.cos(a) * outer
        y2 = cy + math.sin(a) * outer
        color = (c1, c2, c3)[i % 3]
        parts.append(
            f'<path d="M{x1:.2f},{y1:.2f} L{x2:.2f},{y2:.2f}" '
            f'stroke="{color}" stroke-width="{rng.uniform(1.5, 5.5):.2f}" '
            f'opacity="{rng.uniform(0.35, 0.9):.3f}"/>'
        )

    sides = rng.randint(3, 8)
    r = rng.randint(70, 135)
    pts = []
    for i in range(sides):
        a = -math.pi / 2 + math.tau * i / sides
        pts.append(f"{cx + math.cos(a)*r:.2f},{cy + math.sin(a)*r:.2f}")
    parts.append(
        f'<polygon points="{" ".join(pts)}" stroke="{c3}" stroke-width="8" '
        f'fill="{c1}" fill-opacity="0.12"/>'
    )

    fingerprint = hashlib.sha256(f"{seed}:{token_id}".encode()).hexdigest()[:12].upper()
    parts += [
        '</g>',
        f'<text x="48" y="956" fill="{c3}" opacity="0.72" '
        f'font-family="monospace" font-size="22">SR-{token_id:04d} · {fingerprint}</text>',
        '</svg>',
    ]

    traits = {
        "Spokes": spokes,
        "Rings": rings,
        "Glyph Sides": sides,
        "Signal Fingerprint": fingerprint,
    }
    return "\n".join(parts), traits


def build(count: int, out_dir: Path, seed: str) -> None:
    images = out_dir / "images"
    metadata = out_dir / "metadata"
    images.mkdir(parents=True, exist_ok=True)
    metadata.mkdir(parents=True, exist_ok=True)

    catalog = []
    for token_id in range(1, count + 1):
        svg, traits = svg_for(token_id, seed)
        svg_name = f"signal-relic-{token_id:04d}.svg"
        meta_name = f"signal-relic-{token_id:04d}.json"
        (images / svg_name).write_text(svg, encoding="utf-8")

        record = {
            "name": f"Signal Relic #{token_id:04d}",
            "description": DESCRIPTION,
            "image": f"../images/{svg_name}",
            "external_url": "",
            "attributes": [
                {"trait_type": key, "value": value} for key, value in traits.items()
            ],
            "properties": {
                "collection": COLLECTION,
                "generator": "knowledge/revenue-engine/src/generate_signal_relics.py",
                "license": "Copyright retained by creator; purchaser receives ownership of the token/digital file only unless separately licensed."
            }
        }
        (metadata / meta_name).write_text(json.dumps(record, indent=2), encoding="utf-8")
        catalog.append({"token_id": token_id, "image": svg_name, "metadata": meta_name, **traits})

    (out_dir / "catalog.json").write_text(json.dumps(catalog, indent=2), encoding="utf-8")
    (out_dir / "PROVENANCE.txt").write_text(
        f"Collection: {COLLECTION}\nSeed label: {seed}\nCount: {count}\n"
        "Method: deterministic original SVG generation using Python standard library.\n",
        encoding="utf-8",
    )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--count", type=int, default=24)
    parser.add_argument("--out", type=Path, default=Path("knowledge/revenue-engine/build/signal-relics"))
    parser.add_argument("--seed", default="signal-relics-v1")
    args = parser.parse_args()
    if args.count < 1 or args.count > 10000:
        raise SystemExit("--count must be between 1 and 10000")
    build(args.count, args.out, args.seed)
    print(f"Generated {args.count} Signal Relics in {args.out}")


if __name__ == "__main__":
    main()
