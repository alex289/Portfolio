# button

2026-07-03. Golden pair via CLI (fetched `radix-vega`/`base-vega` JSON directly,
three-way merged with `git merge-file`). Verdict: migrated cleanly, one
customization preserved.

## Changed

- `src/components/ui/button.tsx`: replaced `Slot`-based `asChild` idiom with
  the real `@base-ui/react/button` primitive (`ButtonPrimitive`), which
  accepts `render` natively. Dropped `data-variant`/`data-size` DOM
  attributes and the `React` import, matching the base-vega registry shape.
  The user's customization to the `secondary` variant hover color
  (`hover:bg-secondary/80` instead of the stock
  `hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]`) was
  detected via diff against the radix-vega golden and preserved through the
  merge. Leftover scan clean: `grep -n "radix-ui\|@radix-ui" src/components/ui/button.tsx` → no matches.
- `src/app/[locale]/privacy/page.tsx:38` — `asChild` + `<a>` child →
  `render={<a .../>}` prop, text moved to children.
- `src/components/projects/project-card.tsx:21,32` — same `asChild` →
  `render` conversion for both external-link buttons.
- `src/components/social-icons.tsx:23` — same conversion for the mapped
  social link buttons.

## Left alone

None related to this component.

## Behavior changes

None observed. `render` is a drop-in replacement for `asChild` at the
type/behavior level for this primitive.

## Verify by hand

- Privacy page: click the "source" link button, confirm it navigates and
  still receives focus-visible ring styling.
- Project cards: click homepage/GitHub icon buttons, confirm links open in
  new tab and outline variant styling (border, hover) is intact.
- Social icons in header/footer: hover and click, confirm ghost variant
  hover color and icon sizing unchanged.
