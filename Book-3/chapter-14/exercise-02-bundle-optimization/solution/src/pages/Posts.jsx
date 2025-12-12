// ✅ OPTIMIZED: Using date-fns instead of moment.js (20KB vs 300KB)
import { format, formatDistanceToNow } from 'date-fns';

const posts = [
  {
    id: 1,
    title: 'Getting Started with React',
    content: 'React is a JavaScript library for building user interfaces...',
    createdAt: new Date('2024-01-15')
  },
  {
    id: 2,
    title: 'Understanding State Management',
    content: 'State management is a crucial aspect of modern web applications...',
    createdAt: new Date('2024-01-10')
  },
  {
    id: 3,
    title: 'Performance Optimization Tips',
    content: 'Optimizing your application can significantly improve user experience...',
    createdAt: new Date('2024-01-05')
  }
];

function Posts() {
  return (
    <div className="container">
      <h1>
        Blog Posts
        <span className="badge">✅ date-fns: 20KB (was 300KB)</span>
      </h1>

      <div className="posts-list">
        {posts.map(post => (
          <div key={post.id} className="post">
            <h2>{post.title}</h2>
            <div className="meta">
              {/* ✅ OPTIMIZED: Using date-fns for date formatting */}
              Published: {format(post.createdAt, 'MMMM do yyyy')}
              ({formatDistanceToNow(post.createdAt, { addSuffix: true })})
            </div>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;

