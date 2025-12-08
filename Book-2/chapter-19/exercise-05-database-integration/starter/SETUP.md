# Setup Instructions

## Prerequisites

1. Install MongoDB locally or set up MongoDB Atlas account
   - **Local**: Follow instructions at https://www.mongodb.com/docs/manual/installation/
   - **Atlas**: Create free cluster at https://www.mongodb.com/cloud/atlas

## Environment Variables

Create a `.env` file in the root directory:

```
MONGODB_URI=mongodb://localhost:27017/blog-db
PORT=3000
NODE_ENV=development
```

For MongoDB Atlas, use your connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog-db
```

## Installation

```bash
npm install
```

## Run

```bash
npm run dev
```

## Important Notes

- Make sure MongoDB is running if using local installation
- Never commit your `.env` file to version control
- The `.gitignore` file is already configured to exclude `.env`

