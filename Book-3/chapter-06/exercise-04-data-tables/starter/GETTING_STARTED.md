# Exercise 04: Data Tables - Getting Started

## Your Task

Build a production-ready **user management table** with Ant Design featuring sorting, filtering, pagination, row selection, and mobile responsiveness.

## Step-by-Step Instructions

### 1. Create Project

```bash
npm create vite@latest user-management -- --template react-ts
cd user-management
npm install
npm install antd
npm install @faker-js/faker # For mock data generation
npm install react-responsive # For mobile detection
```

### 2. Generate Mock Data

Create `src/data/mockUsers.ts`:

```typescript
import { faker } from '@faker-js/faker'

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'moderator'
  status: 'active' | 'inactive' | 'pending'
  lastLogin: string
  createdAt: string
}

export const generateUsers = (count: number): User[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: faker.helpers.arrayElement(['admin', 'user', 'moderator']),
    status: faker.helpers.arrayElement(['active', 'inactive', 'pending']),
    lastLogin: faker.date.recent({ days: 30 }).toISOString(),
    createdAt: faker.date.past({ years: 2 }).toISOString(),
  }))
}

export const users = generateUsers(100)
```

### 3. Build the Table Component

Create `src/components/UserTable.tsx` with:

**Required Features:**
- [ ] Display 100+ users
- [ ] Sort by: name, email, last login, created date
- [ ] Filter by: role (admin/user/moderator)
- [ ] Filter by: status (active/inactive/pending)
- [ ] Global search across all fields
- [ ] Pagination: 10, 25, 50, 100 per page
- [ ] Row selection (checkboxes)
- [ ] Bulk actions: Activate selected, Delete selected
- [ ] Individual actions per row: View, Edit, Delete
- [ ] Confirmation modal for delete
- [ ] Success/error notifications
- [ ] Mobile responsive layout

### 4. Mobile Layout

For screens < 768px, show:
- Cards instead of table
- User info in card format
- Action buttons in card footer
- Pagination still works

### 5. File Structure

```
src/
├── App.tsx
├── components/
│   └── UserTable.tsx     # Your main table component
├── data/
│   └── mockUsers.ts      # Mock data generator
└── main.tsx
```

## Implementation Tips

### Table Columns

```typescript
const columns: ColumnsType<User> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    filters: [
      { text: 'Admin', value: 'admin' },
      { text: 'User', value: 'user' },
      { text: 'Moderator', value: 'moderator' },
    ],
    onFilter: (value, record) => record.role === value,
    render: (role) => <Tag color={...}>{role}</Tag>,
  },
  // Add more columns...
]
```

### Row Selection

```typescript
const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

const rowSelection = {
  selectedRowKeys,
  onChange: (selectedKeys: React.Key[]) => {
    setSelectedRowKeys(selectedKeys)
  },
}

<Table rowSelection={rowSelection} ... />
```

### Global Search

```typescript
const [searchText, setSearchText] = useState('')

const handleSearch = (value: string) => {
  const filtered = users.filter(user =>
    user.name.toLowerCase().includes(value.toLowerCase()) ||
    user.email.toLowerCase().includes(value.toLowerCase())
  )
  setFilteredData(filtered)
}

<Input.Search
  placeholder="Search users..."
  onSearch={handleSearch}
/>
```

## Requirements Checklist

- [ ] Table displays 100+ users
- [ ] All columns sortable
- [ ] Role and status filters work
- [ ] Global search functional
- [ ] Pagination works (10/25/50/100)
- [ ] Can select single row
- [ ] Can select multiple rows
- [ ] Bulk activate works
- [ ] Bulk delete works (with confirmation)
- [ ] View user details (modal)
- [ ] Edit user (modal)
- [ ] Delete user (with confirmation)
- [ ] Mobile responsive (cards layout)
- [ ] Loading states
- [ ] Empty state ("No users found")

## Bonus Features

- [ ] Export to CSV
- [ ] Column visibility toggle
- [ ] Date range filter
- [ ] Virtual scrolling for 10,000+ rows
- [ ] Save filter presets

## Need Help?

Check `hints.md` for:
- Complete UserTable implementation (500+ lines)
- All features working
- Mobile responsive code
- Export to CSV function

## Testing

Test these scenarios:
1. Sort each column
2. Filter by role (each option)
3. Filter by status (each option)
4. Search for a user
5. Select multiple users
6. Delete selected users
7. Resize to mobile and test card layout
8. Test with 1000 rows for performance

## Success Criteria

Your table should:
- Handle 100+ rows smoothly
- All sorting/filtering works
- Mobile layout is usable
- Actions have confirmations
- Professional look and feel

Good luck building your data table! 📊

