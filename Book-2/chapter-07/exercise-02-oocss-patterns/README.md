# Exercise 2: OOCSS Pattern Library

## Difficulty
⭐⭐ Intermediate

## Time Estimate
1-2 hours

## Learning Objectives
- Understand OOCSS's "Structure from Skin" separation
- Build reusable pattern objects
- Practice composability
- Create the famous Media Object
- Make location-independent components

---

## The Challenge

Build a small pattern library using OOCSS principles. You'll create three core objects and demonstrate how they compose together.

### Objects to Build

1. **Media Object** - Image/avatar + content
2. **Box Object** - Container with header, body, footer
3. **Button System** - Structure + multiple skins

---

## Requirements

### 1. Media Object

**Structure (layout/positioning):**
```scss
.media {
  display: flex;
  gap: 16px;
}

.media-figure {
  flex-shrink: 0;  // Image doesn't shrink
}

.media-body {
  flex: 1;  // Content takes remaining space
}
```

**Skins (appearance):**
- `.media-reverse` - Image on right
- `.media-stack` - Vertical layout
- `.media-center` - Vertically centered

### 2. Box Object

**Structure:**
```scss
.box {
  border-radius: 8px;
  background: white;
}

.box-header,
.box-body,
.box-footer {
  padding: 16px;
}
```

**Skins:**
- `.box-shadow` - Add shadow
- `.box-primary` - Primary border color
- `.box-danger` - Danger border color

### 3. Button System

**Structure:**
```scss
.button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
}
```

**Skins:**
- `.button-primary` - Blue background
- `.button-secondary` - Gray background
- `.button-ghost` - Transparent with border

---

## Composition Example

Show how objects compose:

```html
<!-- Box + Media -->
<div class="box box-shadow">
  <div class="box-header">
    <h3>User Profile</h3>
  </div>
  <div class="box-body">
    <div class="media">
      <div class="media-figure">
        <img src="avatar.jpg" alt="User">
      </div>
      <div class="media-body">
        <h4>John Doe</h4>
        <p>Software Engineer</p>
        <button class="button button-primary">Follow</button>
      </div>
    </div>
  </div>
</div>
```

---

## Success Criteria

✅ Clear separation of structure and skin
✅ Objects work anywhere (location-independent)
✅ Multiple skins per object
✅ Objects compose together
✅ No hardcoded colors in structure
✅ Reusable across different contexts

---

## Starter Code

See `starter/` directory for:
- `index.html` - Template to fill in
- `styles.scss` - Structure to complete
- Examples of what to build

---

## Key OOCSS Principles

1. **Separate structure from skin**
   - Structure = layout, positioning, box model
   - Skin = colors, backgrounds, borders

2. **Separate container from content**
   - Content shouldn't depend on container
   - `.media` works anywhere, not just in `.profile`

3. **Build with "Lego blocks"**
   - Small, reusable pieces
   - Compose to build complex UIs

---

**Start building your pattern library!** 🎨

