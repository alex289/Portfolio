# avatar

2026-07-03. Golden pair via CLI (fetched `radix-vega`/`base-vega` JSON
directly). Verdict: pristine wrapper, direct 1:1 replacement.

## Changed

- `src/components/ui/avatar.tsx`: diffed clean against the `radix-vega`
  golden (no user customizations), so the `base-vega` golden variant was
  applied directly. Import changed from `import { Avatar as AvatarPrimitive }
  from 'radix-ui'` to `import { Avatar as AvatarPrimitive } from
  '@base-ui/react/avatar'`. Types changed from
  `React.ComponentProps<typeof AvatarPrimitive.Root>` etc. to
  `AvatarPrimitive.Root.Props` / `.Image.Props` / `.Fallback.Props`.
  `AvatarBadge`, `AvatarGroup`, `AvatarGroupCount` (plain span/div parts, not
  radix-backed) are untouched — direct Avatar-family mapping. Leftover scan
  clean: `grep -n "radix-ui\|@radix-ui" src/components/ui/avatar.tsx` → no
  matches.

## Left alone

None related to this component.

## Consumers checked

`guestbook-auth.tsx` imports `Avatar`, `AvatarFallback`, `AvatarImage` and
uses only `src`/`alt` on `AvatarImage` — no `delayMs` usage, so no call-site
change needed. Typecheck and build both pass clean.

## Behavior changes

None observed.

## Verify by hand

- Guestbook page: confirm the user avatar image loads, and the fallback
  initials/icon render correctly if the image fails or is absent.
- Resize to check the `sm`/`default`/`lg` size variants still apply their
  `data-size` styling (border ring, dimensions).
