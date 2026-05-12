---
title: "CSS Design Tokens: The Single Source of Truth for Your Design System"
description: "Design tokens are named values that capture every visual decision in your design system — colors, spacing, typography, and more. This post explores how to implement them with CSS custom properties and why they belong at the foundation of every project."
date: 2026-05-01
tags:
  - posts
  - css
  - design systems
---

Every design system eventually runs into the same problem: a shade of blue is defined in a Figma component, duplicated in a Sass variable, hard-coded in a React styled component, and then manually updated in a mobile stylesheet. When the brand refreshes and the blue shifts two ticks warmer, someone has to hunt down every occurrence and hope they found them all. Design tokens exist to end that problem. They give every visual decision a single, canonical name that all platforms can consume.

## What Exactly Is a Design Token?

A design token is simply a name-value pair that encodes a design decision. `color.brand.primary = #0d9488` is a token. So is `spacing.md = 1rem` or `typography.body.line-height = 1.65`. The *name* is what gives the token its power — it communicates intent ("this is our primary brand color") rather than just a raw value. When a designer updates the value behind the name, every consumer of that token inherits the change automatically.

In CSS the native home for design tokens is the custom property (also called a CSS variable):

```css
:root {
  /* Color tokens */
  --color-brand-primary:   #0d9488;
  --color-brand-secondary: #fbbf24;
  --color-surface:         #f8fafc;
  --color-ink:             #0f172a;

  /* Spacing scale */
  --space-xs:  0.25rem;
  --space-sm:  0.5rem;
  --space-md:  1rem;
  --space-lg:  1.5rem;
  --space-xl:  2.5rem;

  /* Typography */
  --font-body: "Inter", system-ui, sans-serif;
  --text-base: 1rem;
  --leading-normal: 1.65;
  --weight-semibold: 600;
}
```

Consuming components then reference the tokens rather than raw values:

```css
.card {
  background: var(--color-surface);
  color: var(--color-ink);
  padding: var(--space-md) var(--space-lg);
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
}
```

## Structuring a Scalable Token Hierarchy

The community has converged on a three-tier model popularised by Nathan Curtis and later baked into tools like Style Dictionary and Tokens Studio:

1. **Primitive (global) tokens** — raw values with no semantic meaning. `--palette-amber-400: #fbbf24`. These should never be used directly in components.
2. **Semantic (alias) tokens** — tokens that reference a primitive and attach meaning. `--color-accent: var(--palette-amber-400)`. Components consume these.
3. **Component tokens** — scoped tokens for a specific component. `--button-bg: var(--color-accent)`. Optional, but invaluable for complex component APIs.

The layering means you can retheme an entire product by swapping semantic tokens to point at different primitives, without touching a single component file. A dark-mode stylesheet needs only to redefine the semantic layer:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-surface:  var(--palette-navy-900);
    --color-ink:      var(--palette-navy-100);
    --color-accent:   var(--palette-amber-400);
  }
}
```

This is precisely how the CSS on this site works: `index.css` declares the full primitive and semantic layer, and `theme.css` layers a brand-specific override on top — swapping in the navy and amber values — without rewriting any component selectors.

## Tokens Beyond the Browser

Because tokens are just named values, they are not limited to CSS. Tools like [Style Dictionary](https://amzn.github.io/style-dictionary/) can read a single JSON token file and output CSS custom properties, Swift UIColor extensions, Android XML resources, and Figma Variables in one build step. The design and engineering teams share the same source of truth, and drift between implementations becomes structurally impossible rather than a matter of discipline.

Adopting design tokens is one of the highest-leverage moves a front-end team can make early in a project. The upfront cost of naming things carefully is repaid many times over in maintenance, theming, and cross-platform consistency. If you are starting a new design system today, make design tokens your very first decision.
