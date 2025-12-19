# Blog Platform Frontend - Starter

React frontend for the blog platform.

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/       # Reusable components
│   ├── pages/            # Page components
│   ├── store/            # Redux store
│   ├── services/         # API services
│   ├── utils/            # Helper functions
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
├── public/               # Static assets
└── package.json
```

## 🎯 TODO: What You Need to Implement

### 1. Authentication Pages
- [ ] Login form with validation
- [ ] Registration form with validation
- [ ] Password reset form
- [ ] Email verification

### 2. Post Pages
- [ ] Post list with pagination
- [ ] Post detail with comments
- [ ] Create post with rich text editor
- [ ] Edit post
- [ ] Delete post confirmation

### 3. User Pages
- [ ] User dashboard
- [ ] Profile page with avatar upload
- [ ] User's posts list
- [ ] Account settings

### 4. Components
- [ ] Post card component
- [ ] Comment component
- [ ] Rich text editor (Markdown or WYSIWYG)
- [ ] Image upload component
- [ ] Loading spinner
- [ ] Error boundary

### 5. Features
- [ ] Like/unlike posts
- [ ] Bookmark posts
- [ ] Comment on posts
- [ ] Search posts
- [ ] Filter by category/tag
- [ ] Share posts

## 🔧 Technologies

- **React 18** - UI framework
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **Zod** - Validation
- **Tailwind CSS** - Styling
- **React Toastify** - Notifications
- **React Markdown** - Markdown rendering

## 📝 Key Implementation Notes

### Authentication
Store JWT token in localStorage and include it in API requests. Redirect to login if token is invalid.

### Rich Text Editor
Choose one:
- **Markdown:** react-markdown + react-simplemde-editor
- **WYSIWYG:** Draft.js, Quill, or Tiptap

### Image Upload
Handle file uploads with preview before sending to backend.

### State Management
Use Redux Toolkit for:
- Authentication state
- Posts list
- Current post
- Loading/error states

## 🧪 Testing

```bash
npm run test
```

## 🎨 Styling

Uses Tailwind CSS. Customize in `tailwind.config.js`.

Good luck building your frontend! 🚀

