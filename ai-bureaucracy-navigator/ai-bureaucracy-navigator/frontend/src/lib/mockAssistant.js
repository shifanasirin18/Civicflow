import { classifyQuery } from '@/data/services'

/**
 * Stands in for the real backend flow:
 *   query -> embedding -> vector DB -> knowledge base retrieval -> LLM -> verified response
 * See backend/src/rag/README.md for the real architecture this will call.
 */
export function getAssistantReply(query, lang) {
  const matches = classifyQuery(query)
  const top = matches[0]

  if (lang === 'ta') {
    return {
      matchedService: top,
      text: `சரி. நான் உங்களுக்கு ${top.name.ta} செயல்முறையில் வழிகாட்ட முடியும். கீழே தகுதி, தேவையான ஆவணங்கள் மற்றும் படிகளைக் காணலாம். இது AI வழிகாட்டுதல் — அரசு அதிகாரப்பூர்வ நடவடிக்கை அல்ல.`,
    }
  }

  if (lang === 'hi') {
    return {
      matchedService: top,
      text: `ज़रूर। मैं आपको ${top.name.hi ?? top.name.en} प्रक्रिया में मार्गदर्शन कर सकता हूँ। नीचे आपको पात्रता, आवश्यक दस्तावेज़ और रोडमैप मिलेगा। ध्यान दें — यह AI मार्गदर्शन है, आधिकारिक सरकारी कार्रवाई नहीं।`,
    }
  }

  return {
    matchedService: top,
    text: `Sure. I can guide you through the ${top.name.en} process. Below you'll find eligibility, required documents, and the step-by-step roadmap sourced from the demo knowledge base. Remember — this is AI Guidance, not an Official Government Action; you'll still submit on the official portal.`,
  }
}

