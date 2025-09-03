# Contributing to EvenOS‑G1

We welcome contributions to EvenOS‑G1! This project is a prototype HUD overlay and launcher for the Even G1 smart‑glasses. To keep the codebase healthy and maintainable, please follow these guidelines:

## Getting started

1. **Fork the repository** on GitHub and clone your fork locally.  
   Example:

   ```bash
   git clone https://github.com/your‑username/evenos‑g1.git
   cd evenos‑g1
   pnpm install
   ```

2. **Create a branch** for your work. Use descriptive names such as `feat/translator‑on‑device` or `fix/hud‑layout`.

   ```bash
   git checkout -b feat/my‑feature
   ```

3. Make your changes, **add tests** where appropriate, and run the build to ensure everything compiles:

   ```bash
   pnpm -r build
   pnpm -r typecheck
   ```

## Conventional commits

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. This helps generate changelogs and keep a clear project history. Commit messages should start with one of the following prefixes:

- `feat:` – new features or major changes
- `fix:` – bug fixes
- `docs:` – documentation changes only
- `test:` – adding or fixing tests
- `refactor:` – code changes that neither fix a bug nor add a feature
- `chore:` – maintenance tasks (e.g. update dependencies)

Example commit message:

```
feat: add speech recognition to translator app

Adds a new API call to the `mentra-bridge` package for speech recognition and integrates
it into the translator overlay. This allows real‑time voice translation.
```

## Linting and formatting

We plan to add linting rules in future revisions. For now, please ensure your code compiles with TypeScript in strict mode and is formatted consistently.

## Pull requests

When you are ready to share your work:

1. **Push your branch** to your fork and open a pull request against `playerclosed/evenos‑g1:main`.
2. Provide a clear description of your changes and why they are needed. Link to any related issues.
3. Ensure that CI passes. If there are failing tests or type errors, please address them before requesting a review.

Thank you for contributing! With your help, EvenOS‑G1 will continue to improve and provide a better experience for users of the Even G1 smart glasses.