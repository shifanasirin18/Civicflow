import { Router } from 'express'
import { z } from 'zod'
import { requireAuth } from '../middleware/requireAuth.js'
import { ApiError } from '../middleware/errorHandler.js'
import { classifyQuery } from '../rag/classify.js'
import { query } from '../db/pool.js'
import { asyncHandler } from '../middleware/asyncHandler.js'

export const chatRouter = Router()
chatRouter.use(requireAuth)

const messageSchema = z.object({
  text: z.string().min(1),
  lang: z.enum(['en', 'ta', 'hi']).default('en'),
})

chatRouter.post('/', asyncHandler(async (req, res) => {
  const parsed = messageSchema.safeParse(req.body)
  if (!parsed.success) throw new ApiError(400, 'A non-empty "text" field is required')
  const { text, lang } = parsed.data

  const [topMatch] = classifyQuery(text)

  // Phase-1 templated reply. Swap for a real LLM call once src/rag is wired
  // up per README.md — keep the "AI Guidance, not Official Government
  // Action" framing in the system prompt when you do.
  const reply =
    lang === 'ta'
      ? `சரி. நான் உங்களுக்கு ${topMatch.name.ta} செயல்முறையில் வழிகாட்ட முடியும். இது AI வழிகாட்டுதல் — அரசு அதிகாரப்பூர்வ நடவடிக்கை அல்ல.`
      : lang === 'hi'
        ? `ज़रूर। मैं आपको ${topMatch.name.en} प्रक्रिया में मार्गदर्शन कर सकता हूँ। यह AI मार्गदर्शन है — आधिकारिक सरकारी कार्रवाई नहीं।`
        : `Sure. I can guide you through the ${topMatch.name.en} process. This is AI Guidance, not an Official Government Action — you'll still submit on the official portal.`

  try {
    await query(
      `INSERT INTO chat_messages (user_id, role, text, matched_service_id) VALUES ($1, 'user', $2, $3), ($1, 'assistant', $4, $3)`,
      [req.userId, text, topMatch.id, reply],
    )
  } catch {
    // DB not configured yet in Phase 1 — chat still works, just isn't persisted.
  }

  res.json({ reply, matchedService: topMatch })
}))

