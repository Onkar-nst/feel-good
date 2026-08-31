/**
 * Pages that are linked everywhere but not open yet.
 *
 * They appear in the navbar, footer and in-page links exactly as normal —
 * clicking one returns a real 404 and shows the "Page not found" screen.
 *
 * TO OPEN THEM UP: empty this array — `const HIDDEN_PAGES: string[] = []`.
 * Nothing else needs editing, and the pages start working again immediately.
 * To open just one section, delete its line.
 *
 * No pages, components or routes were deleted — only gated.
 */
export const HIDDEN_PAGES: string[] = [
  '/about',
  '/service-detail',   // also covers /service-detail/personal and /corporate
  '/blog',
  '/blog-details'
]

/** True when `path` is a gated page, or lives underneath one. */
export const isHiddenPage = (path: string): boolean => {
  const clean = path.split('?')[0]!.split('#')[0]!.replace(/\/+$/, '') || '/'
  return HIDDEN_PAGES.some(hidden => clean === hidden || clean.startsWith(`${hidden}/`))
}
