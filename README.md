# EvenOS-G1

[![CI](https://img.shields.io/github/actions/workflow/status/playerclosed/evenos-g1/ci.yml?label=CI)](https://github.com/playerclosed/evenos-g1/actions)
[![Stars](https://img.shields.io/github/stars/playerclosed/evenos-g1?style=social)](https://github.com/playerclosed/evenos-g1/stargazers)

Retro-2025 Pixel-HUD & Mini-OASIS für Even G1 (grünes Monochrom-Display).

## Quickstart
```bash
pnpm install
pnpm -r build
pnpm -C apps/oasis dev   # http://localhost:5175/?sim
```

## Deploy auf MentraOS
- App in der Mentra Console anlegen (Public URL, API Key)
- `server/oasis-server/.env` ausfüllen
- `bun install && bun run dev`