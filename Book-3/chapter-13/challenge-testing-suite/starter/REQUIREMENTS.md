# Challenge Requirements Checklist

Use this checklist to track your progress on the Full Testing Suite challenge.

---

## 📋 Application Features

### Authentication
- [ ] User can sign up with email/password
- [ ] Email validation (proper format)
- [ ] Password validation (min 8 chars, uppercase, lowercase, number, special char)
- [ ] User can log in
- [ ] User can log out
- [ ] Session persists on page refresh
- [ ] Protected routes (redirect to login if not authenticated)

### Todo Management
- [ ] User can create a new todo
- [ ] User can view all todos
- [ ] User can edit todo text
- [ ] User can mark todo as complete/incomplete
- [ ] User can delete a todo
- [ ] Todos are saved to backend/localStorage

### Filtering & Search
- [ ] Filter todos: All / Active / Completed
- [ ] Search todos by text
- [ ] Clear completed todos (bulk action)

### UI/UX
- [ ] Dark/light mode toggle
- [ ] Theme preference persists
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Loading states for async operations
- [ ] Error messages for failed operations
- [ ] Empty states (no todos, no search results)
- [ ] Keyboard shortcuts (optional)

---

## 🧪 Testing Requirements

### Unit Tests (70% of test suite)

**Utilities:**
- [ ] Form validation functions (10+ tests)
- [ ] Date formatting helpers (5+ tests)
- [ ] Filter/search logic (8+ tests)
- [ ] Auth helpers (5+ tests)

**Custom Hooks:**
- [ ] useAuth hook (8+ tests)
- [ ] useTodos hook (10+ tests)
- [ ] useLocalStorage hook (6+ tests)
- [ ] useTheme hook (4+ tests)

**Components (Isolated):**
- [ ] Button component (5+ tests)
- [ ] Input component (6+ tests)
- [ ] TodoItem component (8+ tests)
- [ ] TodoList component (10+ tests)
- [ ] FilterButtons component (5+ tests)
- [ ] LoginForm component (12+ tests)
- [ ] TodoForm component (8+ tests)

**Target:** 100+ unit tests

---

### Integration Tests (20% of test suite)

**User Workflows:**
- [ ] Sign up → Login → Create todo → Logout
- [ ] Login → Create multiple todos → Filter → Search
- [ ] Login → Edit todo → Mark complete → Delete
- [ ] Create todo → Toggle theme → Verify persistence
- [ ] Error handling → Retry → Success

**Multi-Component Interactions:**
- [ ] Header + TodoList + Filters integration
- [ ] Auth flow with protected routes
- [ ] Form validation with error display
- [ ] API error handling across components

**Target:** 15-20 integration tests

---

### E2E Tests (10% of test suite)

**Critical User Paths:**
- [ ] **Happy path:** Sign up → Create todo → Mark complete → Logout
- [ ] **Full workflow:** Login → CRUD operations → Filtering → Logout
- [ ] **Error recovery:** Network error → Retry → Success
- [ ] **Mobile responsive:** All features work on mobile
- [ ] **Accessibility:** Keyboard navigation works

**Cross-Browser:**
- [ ] Chrome
- [ ] Firefox
- [ ] Safari/WebKit
- [ ] Mobile (iOS/Android viewports)

**Target:** 8-10 E2E tests

---

### Accessibility Tests

**Automated (axe-core):**
- [ ] No WCAG 2.1 violations on home page
- [ ] No violations on login page
- [ ] No violations on todos page
- [ ] Form inputs have proper labels
- [ ] Buttons have accessible names
- [ ] Proper heading hierarchy

**Manual Testing:**
- [ ] Tab navigation works
- [ ] Enter key submits forms
- [ ] Escape key closes modals
- [ ] Focus management (after delete, after create)
- [ ] Screen reader announces errors
- [ ] Skip to content link

**Target:** No accessibility violations

---

### API Mocking (MSW)

- [ ] GET /api/todos - List todos
- [ ] POST /api/todos - Create todo
- [ ] PUT /api/todos/:id - Update todo
- [ ] DELETE /api/todos/:id - Delete todo
- [ ] POST /api/auth/signup - Sign up
- [ ] POST /api/auth/login - Login
- [ ] POST /api/auth/logout - Logout
- [ ] Error scenarios (500, 404, network errors)
- [ ] Slow responses (loading states)

---

## 📊 Coverage Goals

### Overall Coverage Targets
- [ ] Statements: 80%+
- [ ] Branches: 75%+
- [ ] Functions: 80%+
- [ ] Lines: 80%+

### By Module
- [ ] Utilities: 95%+
- [ ] Hooks: 90%+
- [ ] Components: 80%+
- [ ] Pages: 75%+

---

## 🚀 CI/CD & Deployment

### GitHub Actions
- [ ] Workflow file created (.github/workflows/test.yml)
- [ ] Runs on: push to main, pull requests
- [ ] Executes: lint, unit tests, E2E tests
- [ ] Generates: coverage report
- [ ] Blocks: merge if tests fail
- [ ] Matrix testing: Node 18, 20

### Pre-commit Hooks (Optional)
- [ ] Husky installed
- [ ] lint-staged configured
- [ ] Runs tests on staged files
- [ ] Blocks commit if tests fail

### Deployment
- [ ] Deployed to Vercel/Netlify
- [ ] Automatic deployment on main branch
- [ ] Environment variables configured
- [ ] Live URL accessible

---

## 📝 Documentation

- [ ] README.md with:
  - [ ] Project description
  - [ ] Tech stack
  - [ ] Installation instructions
  - [ ] How to run tests
  - [ ] How to run E2E tests
  - [ ] How to check coverage
  - [ ] Deployment instructions
  - [ ] Live demo link

- [ ] TESTING.md with:
  - [ ] Testing strategy
  - [ ] How to write tests
  - [ ] Coverage goals
  - [ ] CI/CD pipeline

- [ ] Code comments and JSDoc

---

## 🏆 Bonus Features (Optional)

### Level 1 ⭐
- [ ] Todo priority (high/medium/low)
- [ ] Due dates
- [ ] Sort by date/priority
- [ ] Todo categories/tags

### Level 2 ⭐⭐
- [ ] Drag & drop reordering
- [ ] Rich text editor for descriptions
- [ ] File attachments
- [ ] Export todos (JSON/CSV)

### Level 3 ⭐⭐⭐
- [ ] Real-time collaboration (WebSocket)
- [ ] Offline support (Service Worker)
- [ ] Performance testing (Lighthouse >90)
- [ ] Visual regression testing
- [ ] Mutation testing with Stryker

---

## ✅ Completion Criteria

**Minimum for completion:**
- ✅ All core features implemented
- ✅ 100+ total tests
- ✅ 80%+ code coverage
- ✅ No accessibility violations
- ✅ CI/CD pipeline working
- ✅ Deployed and accessible
- ✅ Documentation complete

**Time estimate:** 8-12 hours

---

## 💡 Tips

1. **Start with TDD:** Write tests first for utilities and hooks
2. **Test incrementally:** Don't wait until the end
3. **Use this checklist:** Check off items as you complete them
4. **Commit often:** Small, tested commits
5. **Deploy early:** Set up deployment early, update frequently
6. **Ask for help:** Use the hints file and community

---

**Good luck! This is your portfolio piece!** 🚀

Track your progress by checking off items as you complete them.

