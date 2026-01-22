# Solution Images

This solution uses emojis for icons and colored backgrounds instead of actual images to keep the project lightweight and focused on CSS/HTML skills.

## If You Want to Add Real Images

Replace these elements with actual images:

### Feature Icons
Current: Emoji characters (📊, 🤝, etc.)
Replace with: SVG icons or Font Awesome icons

### Testimonial Photos
Current: Colored div backgrounds
Replace with: Actual headshot photos (200x200px, circular crop)

### Hero Background
Current: CSS gradient
Replace with: High-quality background image (1920x1080px)

## Recommended Image Sources

- **Unsplash**: https://unsplash.com (Free, high-quality photos)
- **Pexels**: https://pexels.com (Free stock photos)
- **Heroicons**: https://heroicons.com (Free SVG icons)
- **Feather Icons**: https://feathericons.com (Simple SVG icons)
- **UI Faces**: https://uifaces.co (Profile photos)

## Example: Adding a Hero Background

```css
.hero {
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
                      url('../images/hero-background.jpg');
    background-size: cover;
    background-position: center;
}
```

The gradient overlay ensures text remains readable over the image.
