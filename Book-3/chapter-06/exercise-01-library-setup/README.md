# Exercise 1: Library Setup & First Components

## Learning Objectives

By the end of this exercise, you will:

- ✅ Install and configure Material UI, Chakra UI, Bootstrap, and Ant Design
- ✅ Understand basic setup requirements for each library
- ✅ Build a simple page with core components
- ✅ Compare the development experience of each library

**Time:** 45-60 minutes
**Difficulty:** Beginner

---

## Scenario

You're evaluating component libraries for an upcoming project. The team wants to see a **hands-on comparison** of all 4 major libraries before making a decision. Your task: Set up each library and build the same simple page to compare developer experience.

---

## Requirements

Build the **same page** in all 4 libraries with these components:

### **Page Structure:**
```
Header
  - Logo (text)
  - Navigation links (Home, About, Contact)
  - Primary action button

Main Content
  - Heading
  - Description paragraph
  - Card with:
    - Title
    - Body text
    - Primary button

Form Section
  - Text input (Name)
  - Email input (Email)
  - Select dropdown (Country)
  - Checkbox (Accept terms)
  - Submit button
```

---

## Part 1: Material UI Setup (15 minutes)

### **Step 1: Create Project**

```bash
npm create vite@latest mui-demo -- --template react
cd mui-demo
npm install
```

### **Step 2: Install MUI**

```bash
npm install @mui/material @emotion/react @emotion/styled
```

### **Step 3: Add to `src/main.jsx`**

```jsx
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme();

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);
```

### **Step 4: Build the Page**

Use these MUI components:
- `AppBar`, `Toolbar`, `Button`
- `Container`, `Typography`
- `Card`, `CardContent`, `CardActions`
- `TextField`, `Select`, `MenuItem`, `Checkbox`, `FormControlLabel`

### **Acceptance Criteria:**
- [ ] All components render correctly
- [ ] Form inputs are functional
- [ ] Buttons have hover states
- [ ] Page is responsive

---

## Part 2: Chakra UI Setup (15 minutes)

### **Step 1: Create Project**

```bash
npm create vite@latest chakra-demo -- --template react
cd chakra-demo
npm install
```

### **Step 2: Install Chakra**

```bash
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

### **Step 3: Add to `src/main.jsx`**

```jsx
import { ChakraProvider } from '@chakra-ui/react';

root.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
);
```

### **Step 4: Build the Page**

Use these Chakra components:
- `Box`, `Flex`, `Heading`, `Text`
- `Button`
- `Card`, `CardBody`, `CardFooter`
- `Input`, `Select`, `Checkbox`, `VStack`, `FormControl`, `FormLabel`

### **Acceptance Criteria:**
- [ ] All components render correctly
- [ ] Chakra's style props work
- [ ] Dark mode toggle works (bonus)
- [ ] Page is responsive

---

## Part 3: Bootstrap Setup (10 minutes)

### **Step 1: Create Project**

```bash
npm create vite@latest bootstrap-demo -- --template react
cd bootstrap-demo
npm install
```

### **Step 2: Install Bootstrap**

```bash
npm install bootstrap
```

### **Step 3: Add to `src/main.jsx`**

```jsx
import 'bootstrap/dist/css/bootstrap.min.css';
```

### **Step 4: Build the Page**

Use these Bootstrap classes:
- `navbar`, `navbar-brand`, `nav`, `nav-link`, `btn`
- `container`, `card`, `card-body`
- `form-control`, `form-select`, `form-check`

### **Acceptance Criteria:**
- [ ] All components render correctly
- [ ] Bootstrap styles apply
- [ ] Form is functional
- [ ] Page is responsive

---

## Part 4: Ant Design Setup (15 minutes)

### **Step 1: Create Project**

```bash
npm create vite@latest antd-demo -- --template react
cd antd-demo
npm install
```

### **Step 2: Install Ant Design**

```bash
npm install antd
```

### **Step 3: Add to `src/App.jsx`**

```jsx
import { ConfigProvider } from 'antd';

function App() {
  return (
    <ConfigProvider>
      {/* Your app */}
    </ConfigProvider>
  );
}
```

### **Step 4: Build the Page**

Use these Ant Design components:
- `Layout`, `Header`, `Content`
- `Button`, `Card`, `Typography`
- `Form`, `Input`, `Select`, `Checkbox`

### **Acceptance Criteria:**
- [ ] All components render correctly
- [ ] Ant Design styles apply
- [ ] Form validation works
- [ ] Page is responsive

---

## Comparison Exercise

After building all 4, fill out this comparison:

| Criteria | MUI | Chakra | Bootstrap | Ant Design |
|----------|-----|--------|-----------|------------|
| **Setup Difficulty** (1-5) | | | | |
| **Code Required** (lines) | | | | |
| **Developer Experience** (1-5) | | | | |
| **Documentation Quality** (1-5) | | | | |
| **Component API Intuition** (1-5) | | | | |
| **Styling Approach** | | | | |
| **Would Use Again?** (Yes/No) | | | | |

**Questions to consider:**
- Which was easiest to set up?
- Which had the most intuitive API?
- Which required the least code?
- Which felt best to write?
- Which would you choose for your project?

---

## Deliverables

- [ ] 4 working applications (MUI, Chakra, Bootstrap, Ant Design)
- [ ] All required components implemented
- [ ] Comparison table filled out
- [ ] Personal recommendation with reasoning

---

## Hints

<details>
<summary>Hint 1: MUI Button Example</summary>

```jsx
import { Button } from '@mui/material';

<Button variant="contained" color="primary">
  Click Me
</Button>
```
</details>

<details>
<summary>Hint 2: Chakra Card Example</summary>

```jsx
import { Card, CardBody, CardFooter, Button } from '@chakra-ui/react';

<Card>
  <CardBody>
    <p>Content</p>
  </CardBody>
  <CardFooter>
    <Button colorScheme="blue">Action</Button>
  </CardFooter>
</Card>
```
</details>

<details>
<summary>Hint 3: Bootstrap Form Example</summary>

```jsx
<form>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" />
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
```
</details>

<details>
<summary>Hint 4: Ant Design Form Example</summary>

```jsx
import { Form, Input, Button } from 'antd';

<Form onFinish={handleSubmit}>
  <Form.Item label="Name" name="name" rules={[{ required: true }]}>
    <Input />
  </Form.Item>
  <Form.Item>
    <Button type="primary" htmlType="submit">Submit</Button>
  </Form.Item>
</Form>
```
</details>

---

## Success Criteria

- [ ] All 4 libraries set up correctly
- [ ] Same page built in each library
- [ ] All components functional
- [ ] Comparison table completed with thoughtful analysis
- [ ] Personal recommendation with clear reasoning

---

## Extension Challenges

1. **Add Dark Mode** to MUI and Chakra versions
2. **Custom Theme** - Add custom colors to all 4
3. **Performance Test** - Measure bundle size of each
4. **Mobile Test** - Test on mobile device or emulator

---

## Key Learnings

After this exercise, you understand:

- ✅ Setup process for each library
- ✅ Basic component usage patterns
- ✅ Styling approaches (theme, props, classes)
- ✅ Developer experience differences
- ✅ Which library fits different project types

**This hands-on comparison is invaluable for making informed library choices!** 🎯

---

## Next Steps

Move on to **Exercise 2: Theming & Customization** where you'll deeply customize one library to match a brand identity!

