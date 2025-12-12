import { useState } from 'react';

// ❌ VULNERABLE COMPONENT - Multiple XSS issues!

function CommentList() {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Alice',
      text: '<p>Great article! Check out my <b>portfolio</b>.</p>',
      website: 'https://alice.dev'
    },
    {
      id: 2,
      author: 'Bob',
      text: '<p>Thanks for sharing this <i>helpful</i> content!</p>',
      website: 'https://bob.com'
    }
  ]);

  const [newComment, setNewComment] = useState({
    author: '',
    text: '',
    website: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // ❌ NO VALIDATION OR SANITIZATION!
    setComments([
      ...comments,
      {
        id: Date.now(),
        ...newComment
      }
    ]);

    setNewComment({ author: '', text: '', website: '' });
  };

  return (
    <div className="comment-system">
      <h2>Comments ({comments.length})</h2>

      <div className="vulnerability-list">
        <h2>🐛 Vulnerabilities in This Code:</h2>
        <ul>
          <li>❌ <code>dangerouslySetInnerHTML</code> without sanitization</li>
          <li>❌ Unvalidated URLs in href attributes</li>
          <li>❌ No Content Security Policy</li>
          <li>❌ No input validation</li>
        </ul>
      </div>

      {comments.map(comment => (
        <div key={comment.id} className="comment">
          <h3>{comment.author}</h3>

          {/* ❌ VULNERABILITY #1: dangerouslySetInnerHTML without sanitization */}
          <div
            className="comment-text"
            dangerouslySetInnerHTML={{ __html: comment.text }}
          />

          {/* ❌ VULNERABILITY #2: Unvalidated URL */}
          {comment.website && (
            <a href={comment.website} target="_blank" rel="noopener noreferrer">
              Visit Website
            </a>
          )}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <h3>Add Comment</h3>

        <div className="form-group">
          <label htmlFor="author">Your Name:</label>
          <input
            id="author"
            type="text"
            value={newComment.author}
            onChange={(e) => setNewComment({
              ...newComment,
              author: e.target.value
            })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="text">Comment (HTML allowed):</label>
          <textarea
            id="text"
            value={newComment.text}
            onChange={(e) => setNewComment({
              ...newComment,
              text: e.target.value
            })}
            placeholder="You can use HTML tags like <b>, <i>, <p>, etc."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="website">Website (optional):</label>
          <input
            id="website"
            type="text"
            value={newComment.website}
            onChange={(e) => setNewComment({
              ...newComment,
              website: e.target.value
            })}
            placeholder="https://your-website.com"
          />
        </div>

        <button type="submit">Post Comment</button>
      </form>
    </div>
  );
}

export default CommentList;

