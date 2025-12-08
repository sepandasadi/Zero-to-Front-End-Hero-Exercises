# Exercise 5: Database Integration with MongoDB

**Difficulty:** ⭐⭐ Intermediate
**Time Estimate:** 3-4 hours

## 🎯 Goal

Learn to integrate MongoDB with Express, perform CRUD operations, use Mongoose for schema validation, implement relationships, and handle database errors properly.

## 📝 Tasks

1. Set up MongoDB (local or MongoDB Atlas)
2. Connect Express to MongoDB with Mongoose
3. Create Mongoose schemas and models
4. Implement complete CRUD operations
5. Add data validation
6. Implement relationships (one-to-many)
7. Add database queries (filtering, sorting, pagination)
8. Handle database errors
9. Implement database middleware (timestamps, hooks)
10. Create indexes for performance

## ✅ Success Criteria

- ✅ MongoDB connected successfully
- ✅ All CRUD operations working
- ✅ Schema validation preventing invalid data
- ✅ Relationships working (user has many posts)
- ✅ Advanced queries (filter, sort, paginate)
- ✅ Database errors handled gracefully
- ✅ Mongoose hooks working (pre-save, etc.)
- ✅ Indexes created for performance

## 💡 Setup

### Install MongoDB

**Option 1: Local MongoDB**
```bash
# macOS
brew install mongodb-community
brew services start mongodb-community

# Ubuntu
sudo apt-get install mongodb

# Windows
# Download from mongodb.com
```

**Option 2: MongoDB Atlas (Cloud - Recommended)**
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create cluster
4. Get connection string

### Project Setup

```bash
mkdir blog-api-db
cd blog-api-db
npm init -y
npm install express mongoose dotenv
npm install -D nodemon

# Create .env
echo "MONGODB_URI=mongodb://localhost:27017/blog-db
PORT=3000" > .env
```

## 📁 Project Structure

```
blog-api-db/
├── src/
│   ├── server.js
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── User.js
│   │   └── Post.js
│   ├── routes/
│   │   ├── users.js
│   │   └── posts.js
│   ├── controllers/
│   │   ├── userController.js
│   │   └── postController.js
│   └── middleware/
│       └── errorHandler.js
├── .env
└── package.json
```

## 💻 Implementation

### config/database.js

```javascript
const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('✅ MongoDB connected successfully');

    // Connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  MongoDB disconnected');
    });

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
```

### models/User.js

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [20, 'Username cannot exceed 20 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters']
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters']
  },
  avatar: {
    type: String,
    default: 'https://via.placeholder.com/150'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true  // Adds createdAt and updatedAt automatically
});

// Indexes for performance
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

// Mongoose middleware - Hash password before saving
userSchema.pre('save', async function(next) {
  // Only hash if password is modified
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Instance method - Compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Don't return password in JSON
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
```

### models/Post.js

```javascript
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [5, 'Title must be at least 5 characters'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    minlength: [20, 'Content must be at least 20 characters']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Relationship to User model
    required: true
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  views: {
    type: Number,
    default: 0
  },
  publishedAt: Date
}, {
  timestamps: true
});

// Indexes
postSchema.index({ author: 1 });
postSchema.index({ status: 1 });
postSchema.index({ publishedAt: -1 });
postSchema.index({ tags: 1 });

// Set publishedAt when status changes to published
postSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

module.exports = mongoose.model('Post', postSchema);
```

### controllers/userController.js

```javascript
const User = require('../models/User');

// Create user
exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

// Get all users
exports.getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search } = req.query;

    // Build query
    const query = {};
    if (search) {
      query.$or = [
        { username: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') }
      ];
    }

    const users = await User.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-password')
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);

    res.json({
      users,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get single user
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    next(error);
  }
};

// Update user
exports.updateUser = async (req, res, next) => {
  try {
    // Don't allow password update through this endpoint
    delete req.body.password;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    next(error);
  }
};

// Delete user
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Also delete user's posts
    await Post.deleteMany({ author: req.params.id });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
```

### controllers/postController.js

```javascript
const Post = require('../models/Post');

// Create post
exports.createPost = async (req, res, next) => {
  try {
    const post = await Post.create({
      ...req.body,
      author: req.user.id  // From auth middleware
    });

    // Populate author info
    await post.populate('author', 'username email avatar');

    res.status(201).json({ post });
  } catch (error) {
    next(error);
  }
};

// Get all posts
exports.getPosts = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      author,
      tags,
      sort = '-createdAt'
    } = req.query;

    // Build query
    const query = {};
    if (status) query.status = status;
    if (author) query.author = author;
    if (tags) query.tags = { $in: tags.split(',') };

    const posts = await Post.find(query)
      .populate('author', 'username avatar')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort(sort);

    const total = await Post.countDocuments(query);

    res.json({
      posts,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get single post
exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username email avatar bio');

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Increment views
    post.views += 1;
    await post.save();

    res.json({ post });
  } catch (error) {
    next(error);
  }
};

// Update post
exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, author: req.user.id },  // Only author can update
      req.body,
      { new: true, runValidators: true }
    ).populate('author', 'username avatar');

    if (!post) {
      return res.status(404).json({ error: 'Post not found or unauthorized' });
    }

    res.json({ post });
  } catch (error) {
    next(error);
  }
};

// Delete post
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      author: req.user.id  // Only author can delete
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found or unauthorized' });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
```

### server.js

```javascript
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## 🧪 Testing

```bash
# Create user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john",
    "email": "john@example.com",
    "password": "Password123",
    "bio": "Hello World"
  }'

# Get all users
curl http://localhost:3000/api/users

# Get users with pagination
curl http://localhost:3000/api/users?page=1&limit=5

# Search users
curl http://localhost:3000/api/users?search=john

# Create post (need user ID)
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Post",
    "content": "This is the content of my first post",
    "author": "USER_ID_HERE",
    "tags": ["tech", "coding"],
    "status": "published"
  }'

# Get posts filtered by status
curl http://localhost:3000/api/posts?status=published

# Get posts by author
curl http://localhost:3000/api/posts?author=USER_ID

# Get posts with tags
curl http://localhost:3000/api/posts?tags=tech,coding
```

## 🎯 Bonus Challenges

1. **Full-text search** - Implement text search on post title/content
2. **Aggregation** - User stats (post count, total views)
3. **Transactions** - Multi-document transactions
4. **Virtual fields** - Add computed fields (postCount for User)
5. **Soft delete** - Mark as deleted instead of removing
6. **Database seeding** - Create seed data script
7. **Connection pooling** - Configure connection pool
8. **Schema versioning** - Handle schema changes

## 🎓 Learning Outcomes

- Connect Express to MongoDB
- Create Mongoose schemas with validation
- Implement CRUD operations
- Use Mongoose middleware (hooks)
- Create relationships between models
- Query, filter, sort, and paginate data
- Handle database errors
- Use indexes for performance
- Populate related documents

## 📖 Resources

- [Mongoose Documentation](https://mongoosejs.com/docs/guide.html)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

