# Exercise 3: Technology Stack Analysis

## 🎯 Objective

Analyze real websites to identify the technologies they use and understand the reasoning behind technology choices.

## 📝 Instructions

1. **Choose 3 different types of websites:**
   - A social media platform (e.g., Twitter, LinkedIn)
   - An e-commerce site (e.g., Amazon, Shopify store)
   - A content/news site (e.g., Medium, NYTimes)

2. **Use tools to identify their tech stack:**
   - [Wappalyzer](https://www.wappalyzer.com/) browser extension
   - [BuiltWith](https://builtwith.com/)
   - Browser DevTools → Sources tab
   - View Page Source (Ctrl+U or Cmd+U)

3. **Document your findings** in `tech-stack-analysis.md`

## 💡 What to Look For

For each website, identify:
- **Front-end Framework** (React, Vue, Angular, or vanilla JS?)
- **CSS Framework** (Bootstrap, Tailwind, custom?)
- **Build Tools** (Webpack, Vite, etc.)
- **Additional Libraries** (jQuery, Lodash, etc.)
- **Performance Optimizations** (CDN, image optimization, lazy loading)
- **Accessibility Features** (ARIA labels, semantic HTML)

## 📋 Analysis Template

```markdown
# Technology Stack Analysis

## Website 1: [Name]

**Type**: [Social Media/E-commerce/Content]
**URL**: [URL]

### Technologies Identified
- **Front-end Framework**: [Framework name or "Vanilla JS"]
- **CSS Approach**: [Framework/methodology]
- **Notable Libraries**: [List]
- **CDN**: [Yes/No]
- **Performance Features**: [List observations]

### Why These Choices?
[Your analysis - why do you think they chose these technologies?]

### Front-End Developer Takeaways
[What can you learn from this site's architecture?]

---

[Repeat for websites 2 and 3]

## Overall Insights

### Common Patterns
[What technologies/patterns did you see across all sites?]

### Differences Based on Site Type
[How do tech choices differ by website type?]

### Surprises
[Anything unexpected you discovered?]
```

## ✅ Success Criteria

- [ ] Analyzed 3 different website types
- [ ] Identified front-end technologies for each
- [ ] Explained WHY those technologies might have been chosen
- [ ] Found common patterns across sites
- [ ] Noted differences based on site purpose
- [ ] Reflected on learnings for your own development

## 🔍 Investigation Tips

- **Install Wappalyzer**: It instantly shows what technologies a site uses
- **Check the Sources tab**: Look at filenames (e.g., `react.js`, `tailwind.css`)
- **View Page Source**: Search for keywords like "react", "vue", "angular"
- **Network tab**: See what files are being loaded
- **Console warnings**: Sometimes frameworks identify themselves

## 💡 Bonus Challenge

Try to understand:
- Why might a social media site use different tech than an e-commerce site?
- What performance considerations are visible in each site?
- Which sites seem most accessible? How can you tell?

---

**Time**: ~25 minutes

