# Exercise 3: Attributes Practice

## 🎯 Goal

Master HTML attributes by creating links, images, IDs, and classes.

## 📋 Requirements

Create a file called `attributes-practice.html` with all the following:

### 1. Links Section
Create three different types of links:

- [ ] **External link** (same tab): Link to your favorite website
- [ ] **External link** (new tab): Link to GitHub with proper `target` and `rel` attributes
- [ ] **Email link**: `mailto:` link with your email address

### 2. Images Section
Add two images:

- [ ] **Image with descriptive alt**: Any image with meaningful alt text
- [ ] **Decorative image**: Image that's purely decorative with empty `alt=""`

*Note: You can use placeholder images from https://via.placeholder.com/150 or any images you have*

### 3. IDs and Classes Section
Create:

- [ ] A paragraph with `id="introduction"`
- [ ] Two paragraphs with the same `class="highlight"`
- [ ] One paragraph with multiple classes: `class="highlight important"`

### 4. Organization
- [ ] Add comments to explain what each section demonstrates
- [ ] Use proper indentation
- [ ] Include a main heading and subheadings for each section

## 💡 Attribute Examples

**Link attributes:**
```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">Text</a>
```

**Image attributes:**
```html
<img src="path/to/image.jpg" alt="Description of image">
<img src="decorative.jpg" alt="">  <!-- Decorative only -->
```

**ID and Class:**
```html
<p id="unique-identifier">Content</p>
<p class="class-one class-two">Content</p>
```

## ✅ Success Criteria

- [ ] All three types of links work correctly
- [ ] Images display (or show alt text if image missing)
- [ ] IDs are unique (no duplicates!)
- [ ] Classes are applied correctly
- [ ] External links opening in new tab have proper `rel` attribute
- [ ] Code has helpful comments explaining each attribute
- [ ] HTML validates with no errors

## 🚀 Bonus Challenges

- [ ] Add a link that jumps to a specific section using `#id`
- [ ] Add `title` attributes to your links (hover to see tooltip)
- [ ] Create a "Back to Top" link using IDs
- [ ] Add `width` and `height` attributes to images

## 🔍 Testing Your Work

1. **Test links**: Click each one to verify they work
2. **Test new tab behavior**: External links should open new tabs
3. **Check images**: All images should display or show appropriate alt text
4. **Inspect elements**: Right-click elements and "Inspect" to see attributes in DevTools
5. **Break an image path**: Change `src` to a wrong path and verify alt text shows

## 📊 Estimated Time

20 minutes

---

**Pro tip**: Use VS Code's Emmet shortcuts! Type `img` and press Tab to auto-generate image tag structure!

