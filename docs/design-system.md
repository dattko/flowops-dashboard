# FlowOps design system

## Recommended structure

Use three layers so visual decisions stay centralized:

1. **Primitive tokens** live in `apps/admin/app/globals.css` (font sizes, line heights, color values).
2. **Semantic styles** describe intent (`pageTitle`, `cardTitle`, `metric`) and reuse shadcn color tokens (`foreground`, `muted-foreground`, `primary`, `destructive`).
3. **UI components** such as `Typography` and `SectionHeading` apply those styles consistently.

Feature components should not introduce a new `text-[Npx]` value unless the design system is extended first.

## Typography scale

| Variant | Size / line height | Weight | Typical use |
| --- | --- | --- | --- |
| `display` | 36 / 44 | 700 | Marketing or empty-state hero |
| `pageTitle` | 30 / 38 | 600 | One H1 per page |
| `sectionTitle` | 20 / 28 | 600 | Major page section |
| `cardTitle` | 16 / 24 | 600 | Card and panel H2 |
| `metric` | 26 / 32 | 600 | KPI and large numeric value |
| `body` | 14 / 22 | 400 | Default content |
| `bodySmall` | 13 / 20 | 400 | Dense tables and supporting copy |
| `label` | 12 / 18 | 500 | Labels and metadata |
| `caption` | 11 / 16 | 400 | Captions and auxiliary data |
| `overline` | 10 / 16 | 500 | Brand eyebrow and uppercase category |

The scale is intentionally fixed across breakpoints. Responsive behavior should come from layout and wrapping, not ad-hoc font-size changes.

## Usage

```tsx
import { Typography } from "@/components/ui/typography"
import { SectionHeading } from "@/components/ui/section-heading"

<Typography as="h1" variant="pageTitle">운영 대시보드</Typography>
<Typography variant="body" tone="muted">오늘의 요약입니다.</Typography>

<SectionHeading
  title="최근 주문"
  description="실시간으로 들어온 최신 주문입니다."
/>
```

## Extension rule

Before adding a new variant, confirm that it represents a reusable product role rather than a one-off screen detail. Add its primitive token, semantic class, component variant, and this table together. Keep heading tags semantic (`h1` then `h2`) independently of their visual variant.

Typography colors must use the semantic palette: `foreground`, `muted-foreground`, `primary`, `destructive`, `success`, or `warning`. Add a new global color token only when the product needs a reusable semantic role that cannot be represented by these values.
