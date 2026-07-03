# navigation-menu

2026-07-03. Golden pair via CLI, three-way merged with `git merge-file`
(radix-vega golden as ancestor). Verdict: clean merge, no conflicts; one
consumer call site updated.

## Changed

- `src/components/ui/navigation-menu.tsx`: diffed against the `radix-vega`
  golden — only difference was the unresolved `IconPlaceholder` vs this
  project's already-resolved `ChevronDownIcon` (an artifact of fetching raw
  registry JSON instead of running `shadcn add`, not a real customization).
  Three-way merge against the `base-vega` golden applied cleanly with zero
  conflicts, correctly keeping the project's `ChevronDownIcon` import.
  Structural changes from the merge:
  - Import: `NavigationMenuPrimitive` from `radix-ui` → from
    `@base-ui/react/navigation-menu`.
  - The `viewport` boolean prop is dropped entirely (Base UI's Positioner
    model handles this unconditionally); `NavigationMenuViewport` is no
    longer a standalone exported part — it's replaced by a new
    `NavigationMenuPositioner` component (`Portal > Positioner > Popup >
    Viewport`) rendered automatically inside `NavigationMenu` root, per the
    "one Radix part becomes four" note in `menus.md`.
  - `NavigationMenu` now exposes `align` (forwarded to the new Positioner)
    via `Pick<NavigationMenuPrimitive.Positioner.Props, 'align'>`.
  - `NavigationMenuIndicator` now wraps `NavigationMenuPrimitive.Icon`
    (renamed part) instead of `.Indicator`.
  - CSS vars: `--radix-navigation-menu-viewport-height/width` →
    `--positioner-height/width` / `--popup-height/width` on the new
    Positioner/Popup, per `universal-patterns.md`.
  - `NavigationMenuPositioner` is now also exported (previously only
    `NavigationMenuViewport` was), matching the base-vega registry shape.
  - Leftover scan clean: `grep -n "radix-ui\|@radix-ui\|IconPlaceholder"
    src/components/ui/navigation-menu.tsx` → no matches.
- `src/components/navbar.tsx:73` — `NavigationMenuLink asChild` wrapping
  `<Link href={link.href}>{t(link.label)}</Link>` → `render={<Link
  href={link.href} />}` with the label moved to children.

## Left alone

- `src/components/navbar.tsx`'s `SheetClose`/`SheetTrigger` `asChild` usages
  are untouched — `Sheet` is still Radix-backed until the `sheet` component
  is migrated (task next in this run); converting them now would break, since
  Radix `Dialog` doesn't understand `render`.

## Behavior changes

- `NavigationMenuIndicator` (exported but unused anywhere in this codebase
  today) changes role subtly: Base UI's `Icon` part lives inside the
  `Trigger` and shows `data-popup-open` state, rather than Radix's
  `Indicator` which tracked the active trigger's position along the `List`.
  There is no direct Base UI equivalent for that list-tracking behavior (per
  `universal-patterns.md`). Flagged for if this part is ever wired up later.
- Hover-open delay changes from Radix's `delayDuration`(200)/
  `skipDelayDuration`(300) model to Base UI's `delay`(50)/`closeDelay`(50) —
  this wrapper never exposed those props at the call site, so the project
  gets the new faster default feel automatically. Not currently overridden
  anywhere in this codebase.

## Verify by hand

- Desktop navbar (`md:` and up): click each nav link, confirm the popup menu
  positions correctly below the trigger and closes on link click/outside
  click/Escape.
- Mobile navbar: open the hamburger sheet, confirm the vertical nav menu
  (`orientation="vertical"`) still renders correctly and links close the
  sheet on click (via `SheetClose asChild`, unaffected by this migration).
- Confirm keyboard navigation (Tab/Arrow keys) still moves focus through nav
  items and opens/closes the trigger popups.
