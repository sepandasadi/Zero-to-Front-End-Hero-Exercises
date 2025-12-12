import { useState } from 'react'

// PERFORMANCE ISSUE #6: Unoptimized Images - All Load at Once
function UnoptimizedImages() {
  const [showImages, setShowImages] = useState(false)

  // Simulate loading 20 high-res images
  const images = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    // Using placeholder images (these are actually small, but imagine they're 2MB each)
    url: `https://picsum.photos/800/600?random=${i}`,
    title: `Image ${i + 1}`
  }))

  return (
    <section className="section">
      <h2>🖼️ Issue 6: Unoptimized Images</h2>
      <p>All images load at once - check Network tab waterfall!</p>

      <button onClick={() => setShowImages(!showImages)}>
        {showImages ? 'Hide' : 'Show'} Images
      </button>

      {showImages && (
        <div className="image-grid">
          {images.map(img => (
            <div key={img.id} className="image-card">
              {/* ❌ ISSUES:
                  1. No lazy loading
                  2. No width/height (causes layout shift)
                  3. Loading full-res images
                  4. No modern formats (WebP/AVIF)
              */}
              <img
                src={img.url}
                alt={img.title}
                // ❌ Missing: loading="lazy"
                // ❌ Missing: width/height
                // ❌ Missing: srcset for responsive images
              />
              <div className="caption">{img.title}</div>
            </div>
          ))}
        </div>
      )}

      <div className="metrics">
        <h3>Problems:</h3>
        <ol style={{ marginLeft: '1.5rem' }}>
          <li>All 20 images load at once (parallel requests)</li>
          <li>No lazy loading (images below fold load immediately)</li>
          <li>Full resolution (not responsive)</li>
          <li>Old format (JPEG instead of WebP)</li>
          <li>No dimensions = layout shift</li>
        </ol>

        <h3 style={{ marginTop: '1rem' }}>How to Detect:</h3>
        <ol style={{ marginLeft: '1.5rem' }}>
          <li>Open Network tab</li>
          <li>Click "Show Images"</li>
          <li>See 20 image requests fire simultaneously</li>
          <li>Check waterfall - all start at same time</li>
          <li>Throttle to "Slow 3G" to see impact</li>
        </ol>

        <h3 style={{ marginTop: '1rem' }}>Fixes:</h3>
        <ol style={{ marginLeft: '1.5rem' }}>
          <li><strong>Lazy Loading:</strong> loading="lazy" attribute</li>
          <li><strong>Responsive Images:</strong> srcset for different sizes</li>
          <li><strong>Modern Formats:</strong> WebP with JPEG fallback</li>
          <li><strong>Dimensions:</strong> Add width/height to prevent shift</li>
          <li><strong>Progressive Loading:</strong> BlurHash or placeholders</li>
        </ol>
      </div>
    </section>
  )
}

export default UnoptimizedImages


