import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create users
  const hashedPassword = await bcrypt.hash('password123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@blog.com' },
    update: {},
    create: {
      email: 'admin@blog.com',
      username: 'admin',
      password: hashedPassword,
      name: 'Admin User',
      bio: 'Platform administrator',
      role: 'ADMIN',
      emailVerified: true
    }
  })

  const john = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      email: 'john@example.com',
      username: 'johndoe',
      password: hashedPassword,
      name: 'John Doe',
      bio: 'Full-stack developer passionate about web technologies',
      emailVerified: true
    }
  })

  const jane = await prisma.user.upsert({
    where: { email: 'jane@example.com' },
    update: {},
    create: {
      email: 'jane@example.com',
      username: 'janesmith',
      password: hashedPassword,
      name: 'Jane Smith',
      bio: 'UI/UX designer and frontend enthusiast',
      emailVerified: true
    }
  })

  console.log('✅ Users created')

  // Create categories
  const webDev = await prisma.category.upsert({
    where: { slug: 'web-development' },
    update: {},
    create: {
      name: 'Web Development',
      slug: 'web-development'
    }
  })

  const javascript = await prisma.category.upsert({
    where: { slug: 'javascript' },
    update: {},
    create: {
      name: 'JavaScript',
      slug: 'javascript'
    }
  })

  const design = await prisma.category.upsert({
    where: { slug: 'design' },
    update: {},
    create: {
      name: 'Design',
      slug: 'design'
    }
  })

  console.log('✅ Categories created')

  // Create tags
  const reactTag = await prisma.tag.upsert({
    where: { slug: 'react' },
    update: {},
    create: {
      name: 'React',
      slug: 'react'
    }
  })

  const nodeTag = await prisma.tag.upsert({
    where: { slug: 'nodejs' },
    update: {},
    create: {
      name: 'Node.js',
      slug: 'nodejs'
    }
  })

  const tutorialTag = await prisma.tag.upsert({
    where: { slug: 'tutorial' },
    update: {},
    create: {
      name: 'Tutorial',
      slug: 'tutorial'
    }
  })

  console.log('✅ Tags created')

  // Create posts
  const post1 = await prisma.post.create({
    data: {
      title: 'Getting Started with React 18',
      slug: 'getting-started-with-react-18',
      content: `# Getting Started with React 18

React 18 introduces several new features and improvements that make building React applications even better. In this comprehensive guide, we'll explore what's new and how to get started.

## What's New in React 18?

### Automatic Batching
React 18 introduces automatic batching for all updates, not just those inside React event handlers. This means better performance out of the box.

### Concurrent Features
The new concurrent renderer allows React to work on multiple tasks at once and prioritize important updates.

### Suspense Improvements
Suspense on the server is now fully supported, enabling better code splitting and lazy loading patterns.

## Installing React 18

\`\`\`bash
npm install react@18 react-dom@18
\`\`\`

## Your First React 18 App

\`\`\`jsx
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
\`\`\`

## Conclusion

React 18 is a significant update that brings improved performance and developer experience. Start using it in your projects today!`,
      excerpt: 'Learn about the new features in React 18 and how to get started with automatic batching, concurrent features, and improved Suspense.',
      published: true,
      publishedAt: new Date(),
      readingTime: 5,
      authorId: john.id,
      categories: {
        connect: [{ id: webDev.id }, { id: javascript.id }]
      },
      tags: {
        connect: [{ id: reactTag.id }, { id: tutorialTag.id }]
      }
    }
  })

  const post2 = await prisma.post.create({
    data: {
      title: 'Building RESTful APIs with Node.js and Express',
      slug: 'building-restful-apis-nodejs-express',
      content: `# Building RESTful APIs with Node.js and Express

Learn how to build scalable and maintainable RESTful APIs using Node.js and Express framework.

## Why Node.js for APIs?

Node.js is perfect for building APIs because:
- Non-blocking I/O
- JavaScript everywhere
- Huge ecosystem (npm)
- Great performance

## Setting Up Your Project

\`\`\`bash
mkdir my-api
cd my-api
npm init -y
npm install express
\`\`\`

## Creating Your First Endpoint

\`\`\`javascript
const express = require('express');
const app = express();

app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
\`\`\`

## Best Practices

1. Use proper HTTP status codes
2. Implement error handling
3. Add input validation
4. Use environment variables
5. Implement authentication

## Conclusion

Building APIs with Node.js and Express is straightforward and powerful. Follow these patterns for maintainable code.`,
      excerpt: 'A comprehensive guide to building RESTful APIs using Node.js and Express. Learn best practices and common patterns.',
      published: true,
      publishedAt: new Date(Date.now() - 86400000), // 1 day ago
      readingTime: 8,
      authorId: john.id,
      categories: {
        connect: [{ id: webDev.id }, { id: javascript.id }]
      },
      tags: {
        connect: [{ id: nodeTag.id }, { id: tutorialTag.id }]
      }
    }
  })

  const post3 = await prisma.post.create({
    data: {
      title: 'Modern UI Design Principles',
      slug: 'modern-ui-design-principles',
      content: `# Modern UI Design Principles

Great UI design is more than just making things look pretty. It's about creating intuitive, accessible, and delightful user experiences.

## Key Principles

### 1. Consistency
Maintain consistent patterns throughout your application. Users should never have to learn new patterns for the same actions.

### 2. Visual Hierarchy
Guide users' attention to the most important elements first using size, color, and placement.

### 3. Feedback
Always provide feedback for user actions. Loading states, success messages, and error handling are crucial.

### 4. Accessibility
Design for everyone. Use proper contrast ratios, keyboard navigation, and screen reader support.

### 5. Simplicity
Less is more. Remove unnecessary elements and focus on what matters.

## Practical Tips

- Use whitespace effectively
- Limit your color palette
- Choose readable typography
- Optimize for mobile first
- Test with real users

## Conclusion

Following these principles will help you create interfaces that users love to use.`,
      excerpt: 'Discover the fundamental principles of modern UI design and how to apply them in your projects for better user experiences.',
      published: true,
      publishedAt: new Date(Date.now() - 172800000), // 2 days ago
      readingTime: 6,
      authorId: jane.id,
      categories: {
        connect: [{ id: design.id }]
      },
      tags: {
        connect: []
      }
    }
  })

  console.log('✅ Posts created')

  // Create comments
  await prisma.comment.create({
    data: {
      content: 'Great article! React 18 concurrent features are game-changing.',
      postId: post1.id,
      authorId: jane.id
    }
  })

  const comment1 = await prisma.comment.create({
    data: {
      content: 'Thanks for this tutorial. Very helpful!',
      postId: post2.id,
      authorId: jane.id
    }
  })

  await prisma.comment.create({
    data: {
      content: 'Glad you found it helpful! Let me know if you have any questions.',
      postId: post2.id,
      authorId: john.id,
      parentId: comment1.id
    }
  })

  console.log('✅ Comments created')

  // Create likes
  await prisma.like.create({
    data: {
      postId: post1.id,
      userId: jane.id
    }
  })

  await prisma.like.create({
    data: {
      postId: post2.id,
      userId: jane.id
    }
  })

  await prisma.like.create({
    data: {
      postId: post3.id,
      userId: john.id
    }
  })

  console.log('✅ Likes created')

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

