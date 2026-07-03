# project — Radix UI → Base UI, whole-project migration

2026-07-03. Style: `radix-vega` → `base-vega`. All 8 Radix-backed shadcn
wrappers migrated on branch `migrate/radix-to-base-ui`, one commit per
component (see `.migration/<component>.md` for full per-component detail).

## Dependency swap

- Installed `@base-ui/react@1.6.0` alongside `radix-ui` at the start (task 1
  baseline), removed `radix-ui` and `@radix-ui/react-visually-hidden` at the
  end once every consumer was clear.
- `pnpm remove radix-ui @radix-ui/react-visually-hidden` — both fully
  unused after the `sheet` migration replaced the codebase's only
  `VisuallyHidden` usage with a plain `sr-only` class.
- `components.json` `style` flipped `radix-vega` → `base-vega` (last step,
  after every wrapper was migrated, so future `shadcn add` calls deliver
  Base UI variants).

## Components migrated (dependency order: leaves first)

1. `button` — real `@base-ui/react/button` primitive; preserved a
   customized `secondary` variant hover color detected via golden diff.
2. `badge` — no Base UI primitive exists for it; `useRender` + `mergeProps`.
3. `avatar` — direct 1:1 golden-pair mapping.
4. `separator` — direct 1:1, single-part primitive became callable.
5. `hover-card` — renamed to `PreviewCard` internally (public `HoverCard*`
   names kept); `openDelay`/`closeDelay` moved from Root to Trigger as
   `delay`/`closeDelay` at 5 call sites in `about/page.tsx`.
6. `dropdown-menu` — renamed to `Menu`; hand-authored (not merged) because
   the live registry has drifted with unrelated translucency classes and an
   icon-placeholder step since this project's version was installed; full
   canonical Menu mapping applied by hand instead.
7. `navigation-menu` — `viewport` boolean dropped in favor of a new
   `NavigationMenuPositioner` (`Portal > Positioner > Popup > Viewport`).
8. `sheet` — last wrapper; `Overlay` → `Backdrop`, `Content` → `Popup`,
   slide animations rewritten to `data-starting/ending-style`. Also cleared
   the project's only `@radix-ui/react-visually-hidden` usage.

## App-code sweep (consumer-props.md)

Beyond the asChild → render conversions handled per-component (privacy page,
project cards, social icons, lang/mode toggles, navbar, about page), a final
sweep across all of `src` confirmed zero remaining hits for: `radix-ui`/
`@radix-ui` imports, `asChild`, `delayDuration`/`skipDelayDuration`,
`textValue`, `onSelect`, `decorative`, `IconPlaceholder`.

## Intentionally untouched (not Radix)

- `sonner.tsx` (sonner), and the third-party libraries the SKILL hard rules
  call out as never-touch: `cmdk`, `vaul`, `input-otp`, `react-day-picker`,
  `recharts` — none of these are used in this project except `sonner`,
  which was confirmed to import only from the `sonner` package, not radix.

## Verify build

- Baseline (pre-migration, on `main`): `tsc --noEmit` clean, `next build`
  clean, all 8 locale-prefixed routes present.
- Final (this branch, after dependency removal): `tsc --noEmit` clean,
  `next build` clean with an identical route list, `oxlint` clean.
- No browser automation tool was available in this environment to visually
  exercise the interactive components (menus, sheets, hover cards) — the
  per-component `.migration/*.md` files each include a manual "Verify by
  hand" checklist; recommend running through those in a real browser before
  merging.

## Derived status

`grep -rl "radix-ui\|@radix-ui" src/components/ui` → **0 wrappers remain on
Radix.**
