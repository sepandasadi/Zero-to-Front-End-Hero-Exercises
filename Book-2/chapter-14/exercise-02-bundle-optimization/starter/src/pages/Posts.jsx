// ❌ BAD: Importing entire moment.js library (300KB!)
import moment from 'moment';

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
        <span className="badge">Using moment.js 300KB</span>
      </h1>

      <div className="posts-list">
        {posts.map(post => (
          <div key={post.id} className="post">
            <h2>{post.title}</h2>
            <div className="meta">
              {/* ❌ BAD: Using heavy moment.js for simple date formatting */}
              Published: {moment(post.createdAt).format('MMMM Do YYYY')}
              ({moment(post.createdAt).fromNow()})
            </div>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;

