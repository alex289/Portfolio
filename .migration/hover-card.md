# hover-card

2026-07-03. Golden pair via CLI (fetched `radix-vega`/`base-vega` JSON
directly). Verdict: migrated cleanly; wrapper renamed internally to
PreviewCard, public `HoverCard*` names kept; call sites updated.

## Changed

- `src/components/ui/hover-card.tsx`: diffed clean against the `radix-vega`
  golden (no user customizations), so the `base-vega` golden variant was
  applied directly. Import changed to `PreviewCard as PreviewCardPrimitive`
  from `@base-ui/react/preview-card` (primitive renamed; public wrapper names
  `HoverCard`/`HoverCardTrigger`/`HoverCardContent` unchanged). Restructured
  `Portal > Content` to `Portal > Positioner > Popup`: `HoverCardContent` now
  declares `side`/`sideOffset`/`align`/`alignOffset` via
  `Pick<PreviewCardPrimitive.Positioner.Props, ...>` and forwards all four to
  `<PreviewCardPrimitive.Positioner>` (declare → destructure → forward,
  verified against `overlays.md`'s Positioner-forward rule). CSS var
  `--radix-hover-card-content-transform-origin` → `--transform-origin`; added
  `data-[side=inline-start]`/`data-[side=inline-end]` slide-in variants
  alongside the existing left/right/top/bottom ones. Leftover scan clean:
  `grep -n "radix-ui\|@radix-ui" src/components/ui/hover-card.tsx` → no
  matches.
- `src/app/[locale]/about/page.tsx`: 5 `HoverCard` usages updated.
  - `openDelay`/`closeDelay` moved from `HoverCard` (Root, which no longer
    accepts them per `PreviewCardRootProps`) to `HoverCardTrigger` as
    `delay`/`closeDelay` (per `PreviewCardTriggerProps`), for all 5 instances
    (2 rich-text link cards at `openDelay={100}`, 3 skill-badge cards at
    `openDelay={10}`).
  - The 2 rich-text cards additionally used `HoverCardTrigger asChild` wrapping
    an `<a>` — converted to `render={<a .../>}` with the link text moved to
    children, per the universal asChild → render pattern.

## Left alone

None related to this component.

## Behavior changes

None beyond the mechanical prop relocation — `delay`/`closeDelay` values are
unchanged, so open/close timing feel is preserved.

## Verify by hand

- About page: hover the "netgo" and "Westfälische Hochschule" bio links,
  confirm the preview card opens after ~100ms, shows the description and
  link, and dismisses correctly on mouse-out.
- About page skills section: hover a language/framework/tool badge, confirm
  the small preview card opens quickly (~10ms) showing the skill key.
- Confirm cards close via Escape and clicking outside.
