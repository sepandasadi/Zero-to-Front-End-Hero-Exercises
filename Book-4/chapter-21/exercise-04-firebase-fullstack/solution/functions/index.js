const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// Trigger when a new post is created
exports.onPostCreated = functions.firestore
  .document('posts/{postId}')
  .onCreate(async (snap, context) => {
    const post = snap.data();
    const postId = context.params.postId;

    console.log('New post created:', postId, post.title);

    // Add any post-creation logic here
    // e.g., send notifications, update counters, etc.

    return null;
  });

// Trigger when a post is deleted
exports.onPostDeleted = functions.firestore
  .document('posts/{postId}')
  .onDelete(async (snap, context) => {
    const post = snap.data();
    const postId = context.params.postId;

    console.log('Post deleted:', postId);

    // Clean up associated files from Storage
    if (post.imageUrl) {
      try {
        const bucket = admin.storage().bucket();
        const filePath = `posts/${postId}`;
        await bucket.deleteFiles({ prefix: filePath });
        console.log('Deleted associated files');
      } catch (error) {
        console.error('Error deleting files:', error);
      }
    }

    return null;
  });

// Callable function to sanitize post content
exports.sanitizePost = functions.https.onCall(async (data, context) => {
  // Verify authentication
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be authenticated'
    );
  }

  const { content } = data;

  // Simple sanitization (in production, use a proper library)
  const sanitized = content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');

  return { sanitized };
});

// Scheduled function to clean up old posts
exports.cleanupOldPosts = functions.pubsub
  .schedule('every 24 hours')
  .onRun(async (context) => {
    const db = admin.firestore();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const oldPosts = await db
      .collection('posts')
      .where('createdAt', '<', thirtyDaysAgo)
      .where('published', '==', false)
      .get();

    const batch = db.batch();
    oldPosts.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log(`Deleted ${oldPosts.size} old unpublished posts`);

    return null;
  });

