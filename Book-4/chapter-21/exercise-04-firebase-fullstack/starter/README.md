# Exercise 4 Starter: Firebase Full-Stack App

## 🎯 Your Task

Build a complete full-stack application using Firebase services: Firestore, Authentication, Storage, and Cloud Functions.

## 📋 Setup Instructions

1. **Create Firebase Project**
   - Go to https://console.firebase.google.com
   - Create new project
   - Enable Firestore, Authentication, Storage

2. **Install Firebase Tools**
```bash
npm install -g firebase-tools
firebase login
firebase init
```

3. **Install Dependencies**
```bash
npm install
```

## ✅ What You Need to Do

1. **Set Up Firebase Config**
   - Add Firebase configuration to frontend
   - Initialize Firebase services

2. **Implement Authentication**
   - Email/password sign up
   - User login/logout
   - Protected routes

3. **Build Firestore Integration**
   - Create/Read/Update/Delete posts
   - Real-time updates
   - Security rules

4. **Add File Upload**
   - Image upload to Firebase Storage
   - Display uploaded images
   - Storage security rules

5. **Deploy Cloud Functions**
   - Create server-side functions
   - Deploy to Firebase

## 📁 Files to Complete

- `src/config/firebase.js` - Firebase configuration
- `src/contexts/AuthContext.jsx` - Authentication context
- `src/hooks/usePosts.js` - Firestore hooks
- `functions/index.js` - Cloud Functions
- `firestore.rules` - Security rules
- `storage.rules` - Storage rules

## 💡 Tips

- Use Firebase Emulator for local development
- Implement proper security rules
- Handle loading and error states
- Add real-time listeners for data sync
- Optimize Storage uploads with compression

## 🎓 Learning Goals

- Firebase Authentication integration
- Real-time database with Firestore
- File storage with Cloud Storage
- Serverless functions
- Security rules implementation

Good luck! 🚀

