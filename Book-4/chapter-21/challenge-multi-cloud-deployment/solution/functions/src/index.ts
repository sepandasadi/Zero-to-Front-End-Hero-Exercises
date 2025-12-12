import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// Trigger when a new task is created
export const onTaskCreated = functions.firestore
  .document('tasks/{taskId}')
  .onCreate(async (snap, context) => {
    const task = snap.data();
    const taskId = context.params.taskId;

    console.log('New task created:', taskId, task.title);

    // Could send notification, update counters, etc.
    // Example: Update user's task count
    try {
      const userRef = admin.firestore().doc(`users/${task.userId}`);
      await userRef.set(
        {
          taskCount: admin.firestore.FieldValue.increment(1),
          lastTaskCreated: admin.firestore.FieldValue.serverTimestamp()
        },
        { merge: true }
      );
    } catch (error) {
      console.error('Error updating user stats:', error);
    }

    return null;
  });

// Trigger when a task is updated
export const onTaskUpdated = functions.firestore
  .document('tasks/{taskId}')
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();
    const taskId = context.params.taskId;

    console.log('Task updated:', taskId);

    // Check if status changed to 'done'
    if (before.status !== 'done' && after.status === 'done') {
      console.log('Task completed:', taskId);

      // Could send completion notification
      // Could update user's completed task count
      try {
        const userRef = admin.firestore().doc(`users/${after.userId}`);
        await userRef.set(
          {
            completedTaskCount: admin.firestore.FieldValue.increment(1)
          },
          { merge: true }
        );
      } catch (error) {
        console.error('Error updating completion stats:', error);
      }
    }

    return null;
  });

// Trigger when a task is deleted
export const onTaskDeleted = functions.firestore
  .document('tasks/{taskId}')
  .onDelete(async (snap, context) => {
    const task = snap.data();
    const taskId = context.params.taskId;

    console.log('Task deleted:', taskId);

    // Clean up associated files from Storage
    if (task.attachments && task.attachments.length > 0) {
      try {
        const bucket = admin.storage().bucket();
        const filePath = `tasks/${taskId}`;
        await bucket.deleteFiles({ prefix: filePath });
        console.log('Deleted associated files');
      } catch (error) {
        console.error('Error deleting files:', error);
      }
    }

    // Update user's task count
    try {
      const userRef = admin.firestore().doc(`users/${task.userId}`);
      await userRef.set(
        {
          taskCount: admin.firestore.FieldValue.increment(-1)
        },
        { merge: true }
      );
    } catch (error) {
      console.error('Error updating user stats:', error);
    }

    return null;
  });

// Callable function to send notification
export const sendNotification = functions.https.onCall(async (data, context) => {
  // Verify authentication
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be authenticated'
    );
  }

  const { taskId, message } = data;

  if (!taskId || !message) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'taskId and message are required'
    );
  }

  // In production, send actual notification (email, push, etc.)
  console.log(`Notification for task ${taskId}: ${message}`);

  return { success: true, message: 'Notification sent' };
});

// Scheduled function to clean up old completed tasks (runs daily)
export const cleanupOldTasks = functions.pubsub
  .schedule('every 24 hours')
  .onRun(async (context) => {
    const db = admin.firestore();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    try {
      const oldTasks = await db
        .collection('tasks')
        .where('status', '==', 'done')
        .where('updatedAt', '<', admin.firestore.Timestamp.fromDate(thirtyDaysAgo))
        .get();

      const batch = db.batch();
      let count = 0;

      oldTasks.forEach((doc) => {
        batch.delete(doc.ref);
        count++;
      });

      await batch.commit();
      console.log(`Deleted ${count} old completed tasks`);

      return { deleted: count };
    } catch (error) {
      console.error('Error cleaning up old tasks:', error);
      throw error;
    }
  });

