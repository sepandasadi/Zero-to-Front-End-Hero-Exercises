# Exercise 4: Data Table Implementation

## Learning Objectives

By the end of this exercise, you will:

- ✅ Build production-ready data tables
- ✅ Implement sorting, filtering, and pagination
- ✅ Handle row selection and actions
- ✅ Create responsive table alternatives for mobile
- ✅ Understand why Ant Design excels at data management

**Time:** 90-120 minutes
**Difficulty:** Intermediate-Advanced

---

## Scenario

You're building **"UserHub"**, a user management dashboard. The main feature is a table displaying 100+ users with full CRUD capabilities. The table must be sortable, filterable, paginated, and mobile-responsive.

---

## Requirements

Build a user management table with:

### **Core Features:**
1. **Display** - Show user data in a table
2. **Sorting** - Click column headers to sort
3. **Filtering** - Filter by status, role, date range
4. **Pagination** - 10, 25, 50, 100 per page
5. **Search** - Global search across all fields
6. **Row Selection** - Select single/multiple users
7. **Actions** - Edit, Delete, Activate/Deactivate
8. **Mobile** - Responsive design for mobile devices

---

## Mock Data Structure

```tsx
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;  // ISO date string
  createdAt: string;  // ISO date string
}
```

**Generate 100+ users** for testing (use faker.js or manual generation).

---

## Implementation Guide (Ant Design)

### **Why Ant Design?**

Ant Design has the **best data table** of any component library:
- Built-in sorting, filtering, pagination
- Row selection out of the box
- Expandable rows
- Fixed headers/columns
- Virtual scrolling for 10,000+ rows

---

### **Part 1: Basic Table (20 minutes)**

```tsx
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const columns: ColumnsType<User> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
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
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
      <Tag color={status === 'active' ? 'green' : 'red'}>
        {status.toUpperCase()}
      </Tag>
    ),
  },
];

function UserTable() {
  return (
    <Table
      columns={columns}
      dataSource={users}
      rowKey="id"
      pagination={{ pageSize: 10 }}
    />
  );
}
```

---

### **Part 2: Advanced Filtering (20 minutes)**

```tsx
const [filteredData, setFilteredData] = useState(users);
const [searchText, setSearchText] = useState('');

// Global search
const handleSearch = (value: string) => {
  setSearchText(value);
  const filtered = users.filter(user =>
    user.name.toLowerCase().includes(value.toLowerCase()) ||
    user.email.toLowerCase().includes(value.toLowerCase())
  );
  setFilteredData(filtered);
};

// Date range filter
const columns: ColumnsType<User> = [
  // ... other columns
  {
    title: 'Last Login',
    dataIndex: 'lastLogin',
    key: 'lastLogin',
    sorter: (a, b) => new Date(a.lastLogin).getTime() - new Date(b.lastLogin).getTime(),
    render: (date) => new Date(date).toLocaleDateString(),
  },
];

// In JSX
<Input.Search
  placeholder="Search users..."
  onSearch={handleSearch}
  style={{ width: 300, marginBottom: 16 }}
/>

<Table
  columns={columns}
  dataSource={filteredData}
  // ...
/>
```

---

### **Part 3: Row Selection & Bulk Actions (20 minutes)**

```tsx
const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

const rowSelection = {
  selectedRowKeys,
  onChange: (selectedKeys: React.Key[]) => {
    setSelectedRowKeys(selectedKeys);
  },
};

const handleBulkDelete = () => {
  Modal.confirm({
    title: `Delete ${selectedRowKeys.length} users?`,
    content: 'This action cannot be undone.',
    onOk: () => {
      // Delete logic
      message.success(`${selectedRowKeys.length} users deleted`);
      setSelectedRowKeys([]);
    },
  });
};

const handleBulkActivate = () => {
  // Activation logic
  message.success(`${selectedRowKeys.length} users activated`);
  setSelectedRowKeys([]);
};

// In JSX
{selectedRowKeys.length > 0 && (
  <Space style={{ marginBottom: 16 }}>
    <Button type="primary" onClick={handleBulkActivate}>
      Activate Selected
    </Button>
    <Button danger onClick={handleBulkDelete}>
      Delete Selected
    </Button>
    <span>{selectedRowKeys.length} selected</span>
  </Space>
)}

<Table
  rowSelection={rowSelection}
  // ...
/>
```

---

### **Part 4: Action Column (15 minutes)**

```tsx
const columns: ColumnsType<User> = [
  // ... other columns
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button
          type="link"
          onClick={() => handleEdit(record)}
        >
          Edit
        </Button>
        <Button
          type="link"
          onClick={() => handleView(record)}
        >
          View
        </Button>
        <Popconfirm
          title="Delete this user?"
          onConfirm={() => handleDelete(record.id)}
        >
          <Button type="link" danger>
            Delete
          </Button>
        </Popconfirm>
      </Space>
    ),
  },
];
```

---

### **Part 5: Mobile Responsiveness (20 minutes)**

**Problem:** Tables don't work well on mobile (too wide, hard to read).

**Solution:** Alternative layout for mobile.

```tsx
import { useMediaQuery } from 'react-responsive';

function UserTable() {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  if (isMobile) {
    return (
      <List
        dataSource={users}
        renderItem={user => (
          <Card key={user.id} style={{ marginBottom: 16 }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text strong>{user.name}</Text>
              <Text type="secondary">{user.email}</Text>
              <Tag color={user.status === 'active' ? 'green' : 'red'}>
                {user.status}
              </Tag>
              <Space>
                <Button size="small" onClick={() => handleEdit(user)}>
                  Edit
                </Button>
                <Button size="small" danger onClick={() => handleDelete(user.id)}>
                  Delete
                </Button>
              </Space>
            </Space>
          </Card>
        )}
      />
    );
  }

  return <Table columns={columns} dataSource={users} />;
}
```

---

## Deliverables

- [ ] Table displaying 100+ users
- [ ] Sortable columns (name, email, last login)
- [ ] Filters (role, status)
- [ ] Global search
- [ ] Pagination (10, 25, 50, 100 per page)
- [ ] Row selection (single and multiple)
- [ ] Bulk actions (activate, delete)
- [ ] Individual actions (edit, view, delete)
- [ ] Mobile-responsive alternative layout
- [ ] Loading states
- [ ] Empty states ("No users found")

---

## Success Criteria

- [ ] All sorting works correctly
- [ ] Filters apply properly
- [ ] Search filters across all fields
- [ ] Selection persists across pages
- [ ] Bulk actions work on selected rows
- [ ] Mobile layout is usable
- [ ] Performance is good with 100+ rows
- [ ] No console errors

---

## Extension Challenges

1. **Export Functionality**
   - Export to CSV
   - Export to Excel (xlsx)
   - Export selected rows only

2. **Virtual Scrolling**
   - Test with 10,000+ rows
   - Implement virtual scrolling for performance

3. **Column Management**
   - Show/hide columns
   - Reorder columns
   - Resize columns

4. **Advanced Filters**
   - Date range picker (last 7 days, 30 days, custom)
   - Multi-select filters
   - Save filter presets

5. **Server-Side Operations**
   - Simulate API calls for data
   - Server-side sorting
   - Server-side filtering
   - Server-side pagination

---

## Performance Tips

**For large datasets (1,000+ rows):**

1. **Virtual Scrolling:**
```tsx
<Table
  virtual
  scroll={{ y: 500, x: 1000 }}
  // Only renders visible rows
/>
```

2. **Pagination:**
```tsx
pagination={{
  pageSize: 50,
  showSizeChanger: true,
  showTotal: (total) => `Total ${total} users`,
}}
```

3. **Memoization:**
```tsx
const columns = useMemo(() => [...], []);
const dataSource = useMemo(() => filteredUsers, [filteredUsers]);
```

---

## Key Learnings

- ✅ Building production-ready data tables
- ✅ Sorting, filtering, pagination patterns
- ✅ Row selection and bulk operations
- ✅ Mobile-responsive table alternatives
- ✅ Performance optimization for large datasets
- ✅ Why Ant Design excels at data management

**You can now build any data management interface!** 📊

---

## Next Steps

Try **Exercise 5: Avoiding the "Library Look"** to make your tables unique while preserving functionality!

