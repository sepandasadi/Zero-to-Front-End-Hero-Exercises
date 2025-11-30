# Exercise 2: Building Components with Utilities

## Learning Objectives

By the end of this exercise, you will:

- ✅ Build complete components using only Tailwind utilities
- ✅ Create variant systems (primary, secondary, etc.)
- ✅ Master common component patterns
- ✅ Understand when to extract patterns
- ✅ Write zero custom CSS

**Time:** 60-90 minutes
**Difficulty:** Beginner-Intermediate

---

## Scenario

You're building a UI component library for **"DesignFlow"** (from Exercise 1). The design team needs **4 core components**, each with multiple variants. Your challenge: **Build them using ONLY Tailwind utilities**—no custom CSS!

---

## Requirements

### **Component 1: Button** (20 minutes)

Build a button component with **3 variants** and **3 sizes**.

**Variants:**
1. **Primary:** Purple background, white text, darker on hover
2. **Secondary:** Gray background, dark text, darker on hover
3. **Ghost:** Transparent background, purple text, light purple background on hover

**Sizes:**
- **Small:** Less padding, smaller text
- **Medium:** Default size
- **Large:** More padding, larger text

**States to handle:**
- Hover
- Focus (ring)
- Disabled (opacity, no pointer)
- Active (pressed state)

**Example usage:**
```jsx
<Button variant="primary" size="md">Click me</Button>
<Button variant="secondary" size="sm">Cancel</Button>
<Button variant="ghost" size="lg" disabled>Disabled</Button>
```

**Acceptance Criteria:**
- [ ] All 3 variants styled correctly
- [ ] All 3 sizes work
- [ ] Hover states smooth (transition)
- [ ] Focus has visible ring
- [ ] Disabled state looks inactive
- [ ] Uses only Tailwind classes

---

### **Component 2: Card** (20 minutes)

Build a card component for displaying content.

**Features:**
- Optional image at top
- Title (large, bold)
- Description text
- Optional footer with actions
- Hover effect (shadow grows)
- Smooth transitions

**Variants:**
1. **Default:** White background, border, subtle shadow
2. **Elevated:** No border, larger shadow
3. **Outlined:** Border only, no shadow

**Example:**
```jsx
<Card variant="elevated">
  <CardImage src="..." alt="..." />
  <CardTitle>Product Name</CardTitle>
  <CardDescription>This is a description...</CardDescription>
  <CardFooter>
    <Button variant="primary">Buy Now</Button>
  </CardFooter>
</Card>
```

**Acceptance Criteria:**
- [ ] Image fills card width, rounded top corners
- [ ] Title and description styled properly
- [ ] Footer has spacing/alignment
- [ ] Hover shadow transition smooth
- [ ] All 3 variants work
- [ ] Responsive (looks good mobile → desktop)

---

### **Component 3: Alert** (15 minutes)

Build an alert component for notifications.

**4 Types:**
1. **Success:** Green background, checkmark icon
2. **Warning:** Yellow background, warning icon
3. **Error:** Red background, X icon
4. **Info:** Blue background, info icon

**Features:**
- Icon on left
- Title (bold)
- Message text
- Optional close button
- Appropriate colors for each type

**Example:**
```jsx
<Alert type="success" title="Success!" message="Your changes were saved." />
<Alert type="error" title="Error!" message="Something went wrong." onClose={() => {...}} />
```

**Acceptance Criteria:**
- [ ] All 4 types styled correctly
- [ ] Icons align with text
- [ ] Close button (X) positioned correctly
- [ ] Background colors appropriate
- [ ] Text colors have good contrast
- [ ] Hover state on close button

---

### **Component 4: Badge** (10 minutes)

Build a small badge/tag component.

**Variants:**
1. **Default:** Gray
2. **Primary:** Purple
3. **Success:** Green
4. **Warning:** Yellow/Orange
5. **Error:** Red

**Sizes:**
- **Small:** Tiny text, minimal padding
- **Medium:** Default

**Example:**
```jsx
<Badge variant="success">Active</Badge>
<Badge variant="warning" size="sm">Pending</Badge>
<Badge variant="error">Cancelled</Badge>
```

**Acceptance Criteria:**
- [ ] All 5 variants work
- [ ] Both sizes work
- [ ] Inline with text (inline-flex or inline-block)
- [ ] Rounded corners
- [ ] Good contrast
- [ ] Looks like a tag/label

---

## Bonus Challenge: Compose Them Together (15 minutes)

Create a **Product Card** that uses all your components:

```jsx
<Card variant="elevated">
  <CardImage src="product.jpg" />
  <div className="absolute top-4 right-4">
    <Badge variant="success">New</Badge>
  </div>
  <CardTitle>Wireless Headphones</CardTitle>
  <CardDescription>
    High-quality sound with active noise cancellation.
  </CardDescription>
  <div className="mt-4 flex items-center justify-between">
    <span className="text-2xl font-bold text-purple-600">$299</span>
    <Button variant="primary">Add to Cart</Button>
  </div>
</Card>
```

---

## Implementation Tips

### **Tip 1: Start with HTML structure**

Before styling, get the structure right:

```jsx
function Button({ children, variant, size }) {
  return <button>{children}</button>;
}
```

Then add classes incrementally.

### **Tip 2: Common base classes**

All buttons share some classes:

```jsx
const baseClasses = "inline-flex items-center gap-2 font-semibold rounded-lg transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2";
```

Then add variant-specific classes:

```jsx
const variantClasses = {
  primary: "bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500",
  secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
  ghost: "bg-transparent text-purple-600 hover:bg-purple-50 focus:ring-purple-500",
};
```

### **Tip 3: Template literals for combining**

```jsx
className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
```

### **Tip 4: Icons**

For icons, you can use:
- Emoji (quick): ✅ ⚠️ ❌ ℹ️
- SVG (better): Use Heroicons or similar

```jsx
<svg className="w-5 h-5" fill="currentColor">...</svg>
```

---

## Hints

<details>
<summary>Hint 1: Button variant classes</summary>

```jsx
const variants = {
  primary: 'bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 focus:ring-purple-500',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400 focus:ring-gray-500',
  ghost: 'bg-transparent text-purple-600 hover:bg-purple-50 active:bg-purple-100 focus:ring-purple-500',
};
```
</details>

<details>
<summary>Hint 2: Button sizes</summary>

```jsx
const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};
```
</details>

<details>
<summary>Hint 3: Card hover effect</summary>

```jsx
className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
```

`overflow-hidden` ensures image respects rounded corners!
</details>

<details>
<summary>Hint 4: Alert icon alignment</summary>

```jsx
<div className="flex items-start gap-3">
  <div className="flex-shrink-0">
    {icon}  {/* Won't shrink */}
  </div>
  <div className="flex-1">
    {/* Content */}
  </div>
</div>
```
</details>

<details>
<summary>Hint 5: Badge rounded style</summary>

```jsx
className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
```

`rounded-full` makes it pill-shaped!
</details>

---

## Success Criteria

- [ ] All 4 components built and working
- [ ] All variants and sizes functional
- [ ] Interactive states (hover, focus, active, disabled)
- [ ] Smooth transitions
- [ ] Zero custom CSS (only Tailwind classes)
- [ ] Bonus: Product card composition works
- [ ] Components are reusable
- [ ] Code is clean and organized

---

## Extension Challenges

1. **Add more variants:**
   - Danger button (red)
   - Outline button (border only)

2. **Add loading state:**
   - Spinner icon
   - Disabled during loading

3. **Make components accessible:**
   - Add ARIA labels
   - Keyboard navigation
   - Screen reader support

4. **Add animations:**
   - Button press animation (scale down)
   - Alert slide-in entrance

---

## Key Learnings

After this exercise, you understand:

- ✅ How to build complete components with utilities
- ✅ Variant systems (primary, secondary, etc.)
- ✅ Size systems (sm, md, lg)
- ✅ Interactive states (hover, focus, active, disabled)
- ✅ Composition (combining components)
- ✅ When zero custom CSS is possible
- ✅ Template literal class combination

**You've built a component library with just Tailwind!** 🎨

---

## Next Steps

Move on to **Exercise 3: Responsive Design Mastery** where you'll make these components work beautifully across all screen sizes!

