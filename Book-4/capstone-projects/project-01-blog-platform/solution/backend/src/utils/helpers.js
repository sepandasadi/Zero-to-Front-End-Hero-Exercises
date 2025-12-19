import slugify from 'slugify'

// Generate unique slug for posts
export const generateSlug = async (title, prisma) => {
  let slug = slugify(title, { lower: true, strict: true })

  // Check if slug exists
  const existingPost = await prisma.post.findUnique({
    where: { slug }
  })

  if (existingPost) {
    // Append random string to make it unique
    slug = `${slug}-${Date.now()}`
  }

  return slug
}

// Calculate reading time based on word count
export const calculateReadingTime = (content) => {
  const wordsPerMinute = 200
  const wordCount = content.trim().split(/\s+/).length
  const readingTime = Math.ceil(wordCount / wordsPerMinute)
  return readingTime
}

// Sanitize user input (basic)
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input

  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .trim()
}

// Extract excerpt from content
export const extractExcerpt = (content, maxLength = 160) => {
  const strippedContent = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()

  if (strippedContent.length <= maxLength) {
    return strippedContent
  }

  return strippedContent.substring(0, maxLength).trim() + '...'
}

