<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Deploying

**Do not run `vercel deploy`, `vercel --prod`, or `vercel build` from this repo.**

Pushing to `master` deploys. The GitHub integration is connected, so a CLI
deploy does not replace it, it duplicates it: the push builds, the CLI builds
the same commit again 1-2 seconds later, and both go to production. In the 90
days to 20 August 2026, 14 of this project's 33 deployments were redundant
second copies of a commit already deploying. One commit shipped five times
inside an hour.

`.vercel/` is present and gitignored, which is what makes `vercel deploy`
silently succeed here. Leave it alone; it is also what `vercel env pull` uses.

That waste is not free. The Vercel account is on Hobby, and in the 30 days to
20 August 2026 it was over three hard caps: ISR writes 613k against 200k,
image optimisation transformations 5.4k against 5k, and Fluid Active CPU
4h12m against 4h. The image cap is why `next.config.ts` sets
`images.unoptimized` — `/_next/image` returns HTTP 402 for any new
transformation, and because already-cached images keep serving, it fails
silently and new images render as blank frames.

To check what a change did to production, read the deployment the push created
rather than making another one.
