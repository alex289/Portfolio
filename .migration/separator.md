# separator

2026-07-03. Golden pair via CLI (fetched `radix-vega`/`base-vega` JSON
directly). Verdict: pristine wrapper, direct 1:1 replacement.

## Changed

- `src/components/ui/separator.tsx`: diffed clean against the `radix-vega`
  golden (no user customizations), so the `base-vega` golden variant was
  applied directly. `SeparatorPrimitive.Root` (single-part) becomes the
  callable `SeparatorPrimitive` per the part-rename table. The `decorative`
  prop is dropped (no longer accepted or forwarded) — Base UI's Separator
  always renders with `role="none"`/decorative semantics baked in. `React`
  import removed (no longer needed once `SeparatorPrimitive.Props` replaces
  `React.ComponentProps<typeof SeparatorPrimitive.Root>`). Leftover scan
  clean: `grep -n "radix-ui\|@radix-ui" src/components/ui/separator.tsx` → no
  matches.

## Left alone

- `src/components/ui/dropdown-menu.tsx` still has its own
  `DropdownMenuSeparator` (a different, unrelated primitive part scoped to
  the dropdown-menu family) — untouched here, covered when dropdown-menu is
  migrated.

## Consumers checked

`privacy/page.tsx`, `about/page.tsx`, `guestbook/page.tsx`,
`imprint/page.tsx` all use `<Separator className="..." />` with no
`decorative` prop — no call-site changes needed. Typecheck and build both
pass clean.

## Behavior changes

None observed — the dropped `decorative` prop was unused everywhere in this
codebase.

## Verify by hand

- Visit privacy, about, guestbook, and imprint pages; confirm the horizontal
  rule still renders with the correct border color and full width.
