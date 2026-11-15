import { seedServices } from '../data/seedServices.js'

/**
 * Stand-in for the embedding + vector-search step described in ./README.md.
 * Scores services by keyword overlap against the user's query so the chat
 * endpoint has something real to return before the LLM/vector-DB pipeline
 * is wired up.
 */
export function classifyQuery(rawQuery) {
  const q = rawQuery.toLowerCase()
  const scored = seedServices.map((service) => {
    let score = 0
    for (const kw of service.keywords) if (q.includes(kw)) score += 2
    if (q.includes(service.category)) score += 1
    return { service, score }
  })
  const matches = scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score)
  return matches.length ? matches.map((m) => m.service) : seedServices.slice(0, 1)
}

