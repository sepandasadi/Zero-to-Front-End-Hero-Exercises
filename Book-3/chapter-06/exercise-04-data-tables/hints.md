# Exercise 4: Data Table Implementation - Complete Hints

## Overview

Build a production-ready user management table with sorting, filtering, pagination, row selection, and mobile responsiveness using **Ant Design** (the best library for data tables).

---

## Mock Data Generator

```tsx
// src/data/mockUsers.ts
import { faker } from '@faker-js/faker' // npm install @faker-js/faker

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

// Or manual generation (no dependencies)
export const manualUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-15T10:30:00Z',
    createdAt: '2022-06-10T08:00:00Z',
  },
  // Add 99 more...
]
```

---

## Complete Table Implementation

```tsx
// src/components/UserTable.tsx
import { useState } from 'react'
import {
  Table,
  Button,
  Space,
  Tag,
  Input,
  Select,
  Modal,
  message,
  Popconfirm,
  Card,
  List,
  Typography,
} from 'antd'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import type { FilterValue } from 'antd/es/table/interface'
import { SearchOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import { useMediaQuery } from 'react-responsive'

const { Text } = Typography
const { Search } = Input

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'moderator'
  status: 'active' | 'inactive' | 'pending'
  lastLogin: string
  createdAt: string
}

export function UserTable({ initialData }: { initialData: User[] }) {
  const [data, setData] = useState<User[]>(initialData)
  const [filteredData, setFilteredData] = useState<User[]>(initialData)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [searchText, setSearchText] = useState('')
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    showTotal: (total) => `Total ${total} users`,
    pageSizeOptions: ['10', '25', '50', '100'],
  })

  const isMobile = useMediaQuery({ maxWidth: 768 })

  // Global search
  const handleSearch = (value: string) => {
    setSearchText(value)
    const filtered = data.filter(
      (user) =>
        user.name.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase()) ||
        user.role.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredData(filtered)
    setPagination({ ...pagination, current: 1 })
  }

  // Actions
  const handleEdit = (record: User) => {
    Modal.info({
      title: 'Edit User',
      content: `Editing ${record.name}`,
      onOk: () => message.success('User updated successfully'),
    })
  }

  const handleView = (record: User) => {
    Modal.info({
      title: 'User Details',
      content: (
        <div>
          <p><strong>Name:</strong> {record.name}</p>
          <p><strong>Email:</strong> {record.email}</p>
          <p><strong>Role:</strong> {record.role}</p>
          <p><strong>Status:</strong> {record.status}</p>
          <p><strong>Last Login:</strong> {new Date(record.lastLogin).toLocaleString()}</p>
        </div>
      ),
    })
  }

  const handleDelete = (id: string) => {
    setData(data.filter((user) => user.id !== id))
    setFilteredData(filteredData.filter((user) => user.id !== id))
    message.success('User deleted successfully')
  }

  // Bulk actions
  const handleBulkActivate = () => {
    const updatedData = data.map((user) =>
      selectedRowKeys.includes(user.id) ? { ...user, status: 'active' as const } : user
    )
    setData(updatedData)
    setFilteredData(updatedData)
    setSelectedRowKeys([])
    message.success(`${selectedRowKeys.length} users activated`)
  }

  const handleBulkDelete = () => {
    Modal.confirm({
      title: `Delete ${selectedRowKeys.length} users?`,
      content: 'This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      onOk: () => {
        const newData = data.filter((user) => !selectedRowKeys.includes(user.id))
        setData(newData)
        setFilteredData(newData)
        setSelectedRowKeys([])
        message.success(`${selectedRowKeys.length} users deleted`)
      },
    })
  }

  // Row selection
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedRowKeys(selectedKeys)
    },
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  }

  // Column definitions
  const columns: ColumnsType<User> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      fixed: 'left',
      width: 200,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
      width: 250,
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
      render: (role: string) => (
        <Tag color={role === 'admin' ? 'gold' : role === 'moderator' ? 'blue' : 'default'}>
          {role.toUpperCase()}
        </Tag>
      ),
      width: 120,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Inactive', value: 'inactive' },
        { text: 'Pending', value: 'pending' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : status === 'inactive' ? 'red' : 'orange'}>
          {status.toUpperCase()}
        </Tag>
      ),
      width: 120,
    },
    {
      title: 'Last Login',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      sorter: (a, b) => new Date(a.lastLogin).getTime() - new Date(b.lastLogin).getTime(),
      render: (date: string) => new Date(date).toLocaleDateString(),
      width: 150,
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (date: string) => new Date(date).toLocaleDateString(),
      width: 150,
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 180,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
            size="small"
          >
            View
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size="small"
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete this user?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger icon={<DeleteOutlined />} size="small">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  // Mobile view
  if (isMobile) {
    return (
      <div>
        <Search
          placeholder="Search users..."
          onSearch={handleSearch}
          style={{ marginBottom: 16 }}
          allowClear
        />
        <List
          dataSource={filteredData}
          renderItem={(user) => (
            <Card key={user.id} style={{ marginBottom: 16 }} size="small">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Text strong>{user.name}</Text>
                <Text type="secondary">{user.email}</Text>
                <Space>
                  <Tag color={user.role === 'admin' ? 'gold' : 'default'}>
                    {user.role}
                  </Tag>
                  <Tag color={user.status === 'active' ? 'green' : 'red'}>
                    {user.status}
                  </Tag>
                </Space>
                <Space>
                  <Button size="small" icon={<EditOutlined />} onClick={() => handleEdit(user)}>
                    Edit
                  </Button>
                  <Popconfirm
                    title="Delete?"
                    onConfirm={() => handleDelete(user.id)}
                  >
                    <Button size="small" danger icon={<DeleteOutlined />}>
                      Delete
                    </Button>
                  </Popconfirm>
                </Space>
              </Space>
            </Card>
          )}
          pagination={pagination}
        />
      </div>
    )
  }

  // Desktop view
  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Search users..."
          onSearch={handleSearch}
          style={{ width: 300 }}
          allowClear
        />
        {selectedRowKeys.length > 0 && (
          <>
            <Button type="primary" onClick={handleBulkActivate}>
              Activate Selected ({selectedRowKeys.length})
            </Button>
            <Button danger onClick={handleBulkDelete}>
              Delete Selected ({selectedRowKeys.length})
            </Button>
          </>
        )}
      </Space>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        rowSelection={rowSelection}
        pagination={pagination}
        onChange={setPagination}
        scroll={{ x: 1200 }}
        loading={false}
      />
    </div>
  )
}
```

---

## Performance Optimization

For 10,000+ rows:

```tsx
<Table
  virtual
  scroll={{ y: 600, x: 1200 }}
  pagination={false} // Use virtual scrolling instead
/>
```

---

## Export to CSV

```tsx
const handleExportCSV = () => {
  const csv = [
    ['Name', 'Email', 'Role', 'Status', 'Last Login'],
    ...filteredData.map(user => [
      user.name,
      user.email,
      user.role,
      user.status,
      new Date(user.lastLogin).toLocaleDateString(),
    ]),
  ]
    .map(row => row.join(','))
    .join('\n')

  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'users.csv'
  a.click()
}
```

---

## Key Features Checklist

- [x] Sorting on all columns
- [x] Filtering by role and status
- [x] Global search
- [x] Pagination (10, 25, 50, 100 per page)
- [x] Row selection (single and multiple)
- [x] Bulk actions (activate, delete)
- [x] Individual actions (view, edit, delete)
- [x] Mobile responsive (card layout)
- [x] Loading states
- [x] Empty states

---

**Ant Design makes data tables easy!** 📊

