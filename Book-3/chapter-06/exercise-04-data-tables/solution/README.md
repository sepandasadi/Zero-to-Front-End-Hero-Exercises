# Exercise 04: Data Tables - Solution

This solution implements a complete user management table with all required features using Ant Design.

## Setup

```bash
cd solution
npm install
npm run dev
```

## What's Included

### Core Features
- ✅ Display 100+ users in a table
- ✅ Sortable columns (name, email, last login, created)
- ✅ Filterable columns (role, status)
- ✅ Global search across all fields
- ✅ Pagination (10, 25, 50, 100 per page)
- ✅ Row selection (single and multiple)
- ✅ Bulk actions (activate, delete)
- ✅ Individual actions (view, edit, delete)
- ✅ Mobile responsive (card layout)
- ✅ Loading and empty states

### Advanced Features
- Mock data generation (100 users with faker.js)
- Export to CSV functionality
- Confirmation modals for destructive actions
- Success/error notifications
- Responsive design (table on desktop, cards on mobile)

## Files

- `src/App.tsx` - Main application
- `src/components/UserTable.tsx` - Complete table implementation
- `src/data/mockData.ts` - Mock user data generator
- `package.json` - Dependencies (Ant Design, faker.js)

## Key Features Demonstrated

1. **Ant Design Table** - Production-ready table component
2. **Column Configuration** - Sorting, filtering, custom rendering
3. **Row Selection** - Single and bulk operations
4. **Mobile Responsive** - Alternative card layout for mobile
5. **User Actions** - View, edit, delete with confirmation
6. **Bulk Operations** - Activate/delete multiple users
7. **Search & Filter** - Real-time filtering and search

## Run the Solution

```bash
npm install
npm run dev
```

Open http://localhost:5173 to see the user management table!

## Performance Notes

The solution handles 100+ rows efficiently. For 10,000+ rows, consider:
- Virtual scrolling (`virtual` prop)
- Server-side pagination
- Debounced search

