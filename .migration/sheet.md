# sheet

2026-07-03. Golden pair via CLI, three-way merged with `git merge-file`
(radix-vega golden as ancestor); one conflict hand-resolved. This was the
last Radix wrapper in the project — `src/components/ui` is now fully on
Base UI.

## Changed

- `src/components/ui/sheet.tsx`: diffed against `radix-vega` golden — real
  differences were the unresolved `IconPlaceholder` (registry-fetch artifact,
  vs this project's resolved `XIcon`) and a `cn-font-heading` class on
  `SheetTitle` (an unrelated companion-class hook this project doesn't use
  anywhere else — skipped per the "only add cn-* hooks if the source already
  uses them" rule). Three-way merge against `base-vega` applied cleanly
  except for one conflict at the close button (both the icon-resolution
  diff and the `asChild`→`render` restructuring touched the same lines);
  hand-resolved to keep the base structure with the project's `XIcon`.
  Structural changes:
  - `SheetPrimitive` (`radix-ui`'s `Dialog`) → `@base-ui/react/dialog`.
  - `Overlay` → `Backdrop`; `Content` → `Popup` (per `universal-patterns.md`
    dialog/sheet mapping). No `Positioner` — sheets use fixed-position CSS
    per side, not anchored positioning, matching the "centered modals /
    side sheets skip Positioner" rule.
  - Slide animations rewritten from `animate-in`/`animate-out` +
    `slide-in-from-*`/`slide-out-to-*` to `data-starting-style`/
    `data-ending-style` with explicit `translate-x`/`translate-y` per
    `data-[side=...]`, per the dialog/sheet per-component note.
  - The close button's `SheetPrimitive.Close asChild` wrapping a `<Button>`
    child → `SheetPrimitive.Close render={<Button .../>}` with the icon and
    `sr-only` text moved to be direct children of `Close` (children live on
    the wrapping component now, not nested inside the render target — same
    convention used for `DropdownMenuTrigger`/`SheetTrigger` elsewhere).
  - Leftover scan clean: `grep -n "radix-ui\|@radix-ui\|IconPlaceholder"
    src/components/ui/sheet.tsx` → no matches.
- `src/components/navbar.tsx`: the only consumer of `Sheet`.
  - `SheetTrigger asChild` wrapping the hamburger `<Button>` → `render={<Button .../>}`.
  - `SheetClose asChild` wrapping the logo `<Link>` → `render={<Link .../>}`,
    text moved to children.
  - The `NavMenu` component's `SheetCloseWrapper` polymorphic pattern
    (`SheetClose` with `{asChild: true}` vs `Fragment`) no longer works with
    `render` (which needs the target element up front, not as children), so
    it was restructured: the `NavigationMenuLink` element is built once, then
    conditionally wrapped as `<SheetClose render={navLink} />` (mobile, with
    `withSheetClose`) or rendered bare (desktop) — same behavior, render-prop
    idiom instead of the removed `asChild` boolean. The `Fragment` import is
    no longer needed and was removed.
  - `<VisuallyHidden><SheetTitle>...</SheetTitle></VisuallyHidden>` (from the
    separate `@radix-ui/react-visually-hidden` package, which has no Base UI
    equivalent per the hard rules) → `<SheetTitle className="sr-only">`.
    This was the only usage of `VisuallyHidden` in the codebase; the
    `@radix-ui/react-visually-hidden` dependency is now fully unused and can
    be removed in the final dependency cleanup.

## Left alone

None related to this component.

## Behavior changes

None observed — the close-button restructuring and slide-animation rewrite
are purely mechanical; visual result (position, timing) is unchanged.

## Verify by hand

- Mobile navbar: open the hamburger sheet, confirm it slides in from the
  right, the close (X) button in the top-right closes it, and the logo link
  at the top also closes the sheet when clicked (via `SheetClose render`).
- Confirm the mobile nav links inside the sheet close it when clicked
  (the `withSheetClose` / `NavigationMenuLink` + `SheetClose` composition).
- Confirm the "Navigation Menu" sheet title remains screen-reader-only
  (visually hidden) but present in the accessibility tree.
- Test all four `side` variants if used elsewhere in the future (`top`,
  `right`, `bottom`, `left`) — only `right` (default) is exercised by this
  codebase today.
