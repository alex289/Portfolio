# badge

2026-07-03. Golden pair via CLI (fetched `radix-vega`/`base-vega` JSON
directly). Verdict: pristine wrapper, no customizations, direct replacement.

## Changed

- `src/components/ui/badge.tsx`: diffed clean against the `radix-vega` golden
  (no user customizations), so the `base-vega` golden variant was applied
  directly. Manual `Slot`/`asChild` idiom replaced with `useRender` +
  `mergeProps` from `@base-ui/react/use-render` / `@base-ui/react/merge-props`
  per the non-button polymorphic pattern (Badge is not a real Base UI
  primitive, unlike Button). `data-slot`/`data-variant` DOM attributes are no
  longer set manually — `useRender`'s `state: { slot, variant }` option
  converts them to `data-*` attributes automatically. Leftover scan clean:
  `grep -n "radix-ui\|@radix-ui" src/components/ui/badge.tsx` → no matches.

## Left alone

None related to this component.

## Consumers checked

`avatar.tsx`, `project-card.tsx`, `guestbook-auth.tsx` import `Badge` but none
use the `asChild` prop — no call-site changes required. Typecheck and build
both pass clean.

## Behavior changes

None observed.

## Verify by hand

- Find a Badge instance in the guestbook or project cards; confirm it still
  renders with the correct variant color and rounded shape.
- If any Badge is later given `render` at a call site, confirm the wrapped
  element (e.g. `<a>`) receives `data-slot="badge"` and `data-variant` in the
  DOM inspector.
