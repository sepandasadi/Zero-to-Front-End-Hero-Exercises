import { useState } from 'react';
import DOMPurify from 'dompurify';
import { isValidURL } from '../utils/urlValidator';

// ✅ SECURE COMPONENT - All XSS vulnerabilities fixed!

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

    // ✅ SECURE: Validate and sanitize before adding
    const sanitizedComment = {
      id: Date.now(),
      author: newComment.author.trim(),
      text: DOMPurify.sanitize(newComment.text), // Sanitize HTML
      website: isValidURL(newComment.website) ? newComment.website : '' // Validate URL
    };

    setComments([...comments, sanitizedComment]);
    setNewComment({ author: '', text: '', website: '' });
  };

  return (
    <div className="comment-system">
      <h2>Comments ({comments.length})</h2>

      <div className="security-info">
        <h2>🔒 Security Features Active:</h2>
        <ul>
          <li>✅ DOMPurify sanitization for HTML content</li>
          <li>✅ URL validation (only http/https allowed)</li>
          <li>✅ Content Security Policy configured</li>
          <li>✅ All user input sanitized</li>
        </ul>
      </div>

      {comments.map(comment => (
        <div key={comment.id} className="comment">
          {/* ✅ SECURE: Author is text-only */}
          <h3>{comment.author}</h3>

          {/* ✅ SECURE: HTML is sanitized with DOMPurify */}
          <div
            className="comment-text"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(comment.text, {
                ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'br'],
                ALLOWED_ATTR: []
              })
            }}
          />

          {/* ✅ SECURE: URL is validated before rendering */}
          {comment.website && isValidURL(comment.website) && (
            <a
              href={comment.website}
              target="_blank"
              rel="noopener noreferrer"
            >
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
            maxLength={100}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="text">Comment (safe HTML allowed):</label>
          <textarea
            id="text"
            value={newComment.text}
            onChange={(e) => setNewComment({
              ...newComment,
              text: e.target.value
            })}
            placeholder="You can use: <p>, <b>, <i>, <em>, <strong>"
            maxLength={1000}
            required
          />
          <small style={{ color: '#666', fontSize: '12px' }}>
            HTML will be sanitized. Allowed tags: p, b, i, em, strong, br
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="website">Website (optional):</label>
          <input
            id="website"
            type="url"
            value={newComment.website}
            onChange={(e) => setNewComment({
              ...newComment,
              website: e.target.value
            })}
            placeholder="https://your-website.com"
          />
          <small style={{ color: '#666', fontSize: '12px' }}>
            Only http:// and https:// URLs are allowed
          </small>
        </div>

        <button type="submit">Post Comment</button>
      </form>
    </div>
  );
}

export default CommentList;

