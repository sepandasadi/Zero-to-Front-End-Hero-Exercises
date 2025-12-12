import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// TODO: Implement Cloud Functions
// 1. onTaskCreated - Trigger when new task is created
// 2. onTaskDeleted - Cleanup when task is deleted
// 3. sendNotification - Callable function for notifications

export const placeholder = functions.https.onRequest((request, response) => {
  response.send("Implement your Cloud Functions here");
});

