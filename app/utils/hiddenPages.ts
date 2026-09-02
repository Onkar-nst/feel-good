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
  '/service-detail'   // also covers /service-detail/personal and /corporate
]

/**
 * Pages that sit underneath a gated path but are open anyway.
 *
 * Checked before HIDDEN_PAGES, so a single page can be released for review
 * without opening its whole section.
 */
export const VISIBLE_EXCEPTIONS: string[] = [
  '/service-detail/feeling-overwhelmed'   // design prototype, out for client sign off
]

/** True when `path` is a gated page, or lives underneath one. */
export const isHiddenPage = (path: string): boolean => {
  const clean = path.split('?')[0]!.split('#')[0]!.replace(/\/+$/, '') || '/'
  if (VISIBLE_EXCEPTIONS.includes(clean)) return false
  return HIDDEN_PAGES.some(hidden => clean === hidden || clean.startsWith(`${hidden}/`))
}
