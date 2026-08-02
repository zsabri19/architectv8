## Answer first: publish before outreach

Yes — publish first. Every asset in the link-gap plan (the Continuity Gap page, `/press`, the workshop ledger) only converts if the editor or vendor clicks a live, indexable URL. Pitching first and publishing after burns the one warm contact attempt you get.

## On the old site: low stakes

Semrush shows `global-mkts.com` currently ranks for **one** keyword ("clarity os", position 68) on **one** URL — the homepage. There is effectively no organic equity to preserve, so a heavy URL-by-URL redirect map isn't worth the delay. Recommendation: straight cutover, with a small safety net of redirects for any URLs you know are printed on flyers, in the CXO magazine, or shared in LinkedIn posts.

The toxic PBN backlinks are the real inherited liability, not the pages. That's what the disavow file handles.

---

## Sequence

**Phase 1 — Ship (this session)**
1. Final pre-publish audit: head metadata on every route, canonicals all absolute on `global-mkts.com`, sitemap covers all live routes, robots.txt allows crawling.
2. Run a security scan, then publish to the Lovable URL.
3. Verify the published build: `/`, `/press`, `/frameworks/8c-crisis-to-clarity`, `/book-a-session`, `/sitemap.xml`.

**Phase 2 — Domain cutover**
4. Connect `global-mkts.com` (root) and `www.global-mkts.com` in Project settings → Domains, root as primary. DNS: A records to `185.158.133.1` plus the `_lovable` TXT record.
5. Add a small redirect set for legacy URLs you name (anything on a flyer or in print). Give me that list and I'll wire it.
6. Point `architect.global-mkts.com` at the root so the old subdomain doesn't compete.

**Phase 3 — Index and clean**
7. Verify the domain in Google Search Console via meta tag, submit `/sitemap.xml`, request indexing on `/`, `/press`, and the Continuity Gap page.
8. Upload `disavow.txt` in Search Console. This is the step that matters most for the inherited spam.
9. Wait for the first crawl to confirm the pages are indexed before pitching.

**Phase 4 — Run the link-gap plan**
10. Warm GCC contacts from `gcc-press-targets.md` first — they need no ranking history, just a credible press kit, which `/press` now is.
11. DRJ submission from `bc-risk-link-targets.md`, citing the Continuity Gap page as the original diagnostic.
12. Leadership peer/roundup outreach last, once one or two links have landed and the profile isn't all-spam.

## Technical notes

- Canonicals, sitemap, robots, and MCP strings already point at `global-mkts.com`, so no code reversal is needed for this choice.
- Google Search Console verification uses the META method and needs the token in the root `<head>` before verify is called — so it must happen after the domain is live, not before.
- Redirects for legacy URLs will be handled as TanStack routes; no `_redirects` or `vercel.json` files.
- Do not pitch DRJ before the disavow is submitted and the site is indexed — an editor checking the domain would see the PBN footprint.

## What I need from you

- Any legacy `global-mkts.com` URLs that appear in print, on flyers, or in the CXO feature, so they get redirects rather than 404s.
- Confirmation that taking the root domain offline briefly during DNS propagation is acceptable.
