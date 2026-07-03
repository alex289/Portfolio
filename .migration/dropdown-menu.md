# dropdown-menu

2026-07-03. Golden pair fetched via CLI, hand-applied (not a straight
copy/merge — see note below). Verdict: migrated with the canonical Menu
mapping; two consumers updated.

## Changed

- `src/components/ui/dropdown-menu.tsx`: full rewrite following the canonical
  DropdownMenu → Menu mapping (`menus.md`):
  - `DropdownMenuPrimitive` (`radix-ui`) → `MenuPrimitive`
    (`@base-ui/react/menu`).
  - `Label` → `GroupLabel`, `ItemIndicator` → `CheckboxItemIndicator` /
    `RadioItemIndicator`, `Sub` → `SubmenuRoot`, `SubTrigger` →
    `SubmenuTrigger`.
  - `Content` restructured `Portal > Content` → `Portal > Positioner > Popup`;
    `align`/`alignOffset`/`side`/`sideOffset` declared via
    `Pick<MenuPrimitive.Positioner.Props, ...>`, destructured, and forwarded
    to `Positioner` (declare → destructure → forward, per the Positioner
    rule). Positioner gets `className="isolate z-50 outline-none"` per
    `wrapper-shapes.md`; Popup keeps its own `z-50`/`outline-none`.
  - CSS vars renamed: `--radix-dropdown-menu-content-available-height` →
    `--available-height`, `--radix-dropdown-menu-trigger-width` →
    `--anchor-width`, `--radix-dropdown-menu-content-transform-origin` →
    `--transform-origin`.
  - `SubTrigger` open-state styling gains `data-popup-open:bg-accent
    data-popup-open:text-accent-foreground` alongside the existing
    `data-open:*` classes (SubTrigger's real open marker in Base UI is
    `data-popup-open`; kept `data-open:*` too since it was already present in
    this project's Tailwind setup).
  - `SubContent` now composes the public `DropdownMenuContent` wrapper
    (`align="start" alignOffset={-3} side="right" sideOffset={0}`) instead of
    talking to a `SubContent` primitive directly, matching the current
    base-vega registry shape. Its class list keeps the wrapper's own visual
    styling (`rounded-md`, `bg-popover`, `shadow-lg`, the slide-in/animate
    variants) and overrides `min-w-24` (numerically identical to the
    registry's `min-w-[96px]`, kept as a Tailwind utility for consistency
    with the rest of the codebase) — sizing/overflow (`max-h`, `w-anchor`,
    `overflow-x/y`) is inherited from `DropdownMenuContent`, which is an
    intentional registry behavior change, not a regression.
  - Icons: kept the project's existing `CheckIcon`/`ChevronRightIcon` from
    `lucide-react` (unchanged) rather than the registry's unresolved
    `IconPlaceholder` (the raw JSON fetch doesn't run the icon-library
    resolution step that `shadcn add` performs). Leftover scan clean:
    `grep -n "radix-ui\|@radix-ui\|IconPlaceholder"
    src/components/ui/dropdown-menu.tsx` → no matches.
  - NOTE ON METHOD: a straight three-way `git merge-file` was attempted first
    but produced spurious conflicts — the live registry has since added
    `cn-menu-target cn-menu-translucent` translucency classes and an
    `IconPlaceholder` resolution step to BOTH the radix and base golden
    variants, unrelated to this project's installed (older) component
    version and unrelated to the radix→base transformation itself. Rather
    than adopt that out-of-scope drift, the file was hand-authored from the
    user's original content plus the mapping tables, keeping every existing
    class/prop that wasn't part of the radix→base transformation.
- `src/components/lang-toggle.tsx`, `src/components/mode-toggle.tsx`:
  `DropdownMenuTrigger asChild` wrapping a `<Button>` → `render={<Button
  .../>}`. `DropdownMenuItem onClick={...}` call sites needed no change —
  this project already used `onClick`, not the Radix `onSelect`.

## Left alone

None related to this component.

## Behavior changes

- `DropdownMenuSubContent` sizing (`max-height`/`width`/scroll overflow) is
  now inherited from the parent `DropdownMenuContent`'s anchor-relative vars
  instead of being unset — a registry-level behavior change, not something
  introduced by this migration's judgment calls.
- Per `menus.md`: `closeOnClick` defaults to `false` on `CheckboxItem` /
  `RadioItem` (Radix closed the menu on select by default). This project
  doesn't use `DropdownMenuCheckboxItem`/`DropdownMenuRadioItem` anywhere
  today, so it's a latent behavior delta only — flagging for future use.

## Verify by hand

- Header language/theme toggles: click to open, confirm the menu appears
  below-right of the trigger button, items highlight on hover/keyboard
  arrow-navigation, and clicking an item both fires the action (language
  switch / theme switch) and closes the menu.
- Keyboard: Tab to the trigger, Enter/Space to open, arrow keys to move
  through items, Escape to close and return focus to the trigger.
- Confirm the menu repositions correctly if opened near the viewport edge
  (collision avoidance still active via Positioner defaults).
