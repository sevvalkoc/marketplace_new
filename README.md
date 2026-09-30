
  # Studio Marché

  ## Running the code

  Run `pnpm i` to install the dependencies.

  Run `pnpm run dev` to start the development server.

  ## Building and deploying

  `pnpm run build` is the production build and must be the deploy build
  command (`vercel.json` already sets it). It:

  1. builds the client app (`dist/`),
  2. builds a server-side render bundle from `src/entry-server.tsx`,
  3. writes `dist/sitemap.xml`, and
  4. prerenders every public page to static HTML (`scripts/prerender.mjs`) so
     search engines and social-preview bots get each page's real title,
     description, canonical, structured data and content without running
     JavaScript. It also writes `dist/404.html` and a noindexed
     `dist/app-shell.html` for account-only routes.

  It needs only Node — no headless browser. Deploying the output of plain
  `vite build` (`pnpm run build:client`) would ship none of the above, and
  direct visits to pages like `/product/1` would 404.

  Adding a product, brand, category or Edit article to
  `src/app/data/mockData.ts` automatically gives it a prerendered page and a
  sitemap entry (`getIndexableRoutes` in `src/entry-server.tsx`).
