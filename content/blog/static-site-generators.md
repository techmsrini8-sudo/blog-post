---
title: "Static Site Generators: Why the Old Idea Is the New Best Practice"
description: "Static site generators pre-render every page at build time, shipping pure HTML, CSS, and JavaScript to the browser. This post examines how they work, why they outperform traditional CMSes for most content-focused sites, and how to choose among the many options available today."
date: 2026-05-08
tags:
  - posts
  - static sites
  - performance
---

The web started static. In the early 1990s every page was a hand-written HTML file sitting on a server, waiting to be served. Then came dynamic applications — PHP, Rails, WordPress — which assembled pages on the fly from a database and templates. Dynamic rendering unlocked features that static files simply could not provide: user accounts, real-time data, personalised content. For a long time it felt like progress only moved in one direction.

But dynamic rendering carries costs. Every request needs a server to execute code, query a database, and assemble a response, adding latency at every step. Security vulnerabilities emerge wherever user input meets server-side logic. Scaling requires provisioning and babysitting infrastructure. For the majority of content-focused sites — blogs, documentation, marketing pages, portfolios — the dynamic overhead buys nothing of value. Static site generators (SSGs) recognised this and brought the pre-rendered page back, but with all the ergonomic tools that modern development expects.

## How Static Site Generators Work

An SSG reads source files — typically Markdown content and template files — runs a build process, and outputs a folder of plain HTML, CSS, and JavaScript files. That folder is then deployed to a CDN or any static file host. There is no server-side code running at request time; the CDN simply returns the file closest to the user. A request that previously took 400–800 ms waiting for PHP to hit a database now resolves in 20–50 ms from an edge node a few milliseconds away from the visitor.

The build-time model also unlocks an interesting security property: there is no surface area for SQL injection, authentication bypass, or server-side remote code execution because there is no server code running. The worst an attacker can do is read public HTML that you already intended to publish.

Modern SSGs integrate seamlessly with headless CMSes (Contentful, Sanity, Prismic) via API calls at build time, so editors still get a comfortable authoring interface while the generated output stays static. Services like Netlify and Vercel add webhooks that trigger a fresh build and deploy in under a minute whenever content changes — giving content teams a publishing workflow that feels dynamic while the infrastructure remains gloriously simple.

## A Brief Tour of the Landscape

The SSG ecosystem is broad and competitive. A few landmarks are worth knowing:

**[Eleventy (11ty)](https://www.11ty.dev/)** — the engine powering this site — is a JavaScript-based SSG that deliberately avoids prescribing a front-end framework. It supports eleven template languages out of the box, processes data from files and APIs, and ships zero client-side JavaScript by default. Its flexibility makes it an excellent choice for content-heavy sites that want full control over the output.

**[Astro](https://astro.build/)** takes a "islands architecture" approach, rendering components to static HTML at build time and hydrating only the interactive pieces client-side. It has first-class support for React, Vue, Svelte, and Solid components, making it a natural fit for teams migrating from a JavaScript-heavy stack who want to dramatically reduce their JavaScript footprint.

**[Hugo](https://gohugo.io/)** is written in Go and is legendarily fast — capable of building tens of thousands of pages in under a second. Its speed makes it particularly attractive for large documentation sites and projects where build time is a bottleneck.

**[Next.js](https://nextjs.org/)** and **[Nuxt](https://nuxt.com/)** (React and Vue respectively) support static export alongside server-side rendering, offering a spectrum from fully static to fully dynamic depending on the needs of each route. They are well suited to applications that need both static marketing pages and authenticated dynamic views.

## Choosing the Right Tool

The best SSG for a project depends on what the team already knows and what the site needs to do. A few practical heuristics: if your content team authors in Markdown and you want total control over the HTML you ship, Eleventy is hard to beat. If you have a large existing React codebase and want progressive enhancement, Astro or Next.js static export is a natural fit. If raw build speed is the bottleneck, Hugo is the answer.

What all of these tools share is the core premise: do as much work as possible at build time, ship as little as necessary to the browser, and keep the runtime infrastructure as simple as humanly possible. After years of increasingly complex application architectures, the simplicity of a folder of HTML files — deployed globally in seconds, scaling to any traffic without a single line of server configuration — feels less like a step backward and more like hard-won wisdom.
