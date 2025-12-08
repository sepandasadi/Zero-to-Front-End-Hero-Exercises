# Setup Instructions

## Environment Variables

Create a `.env` file in the root directory with the following:

```
JWT_SECRET=your-super-secret-key-change-in-production
PORT=3000
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

- Change `JWT_SECRET` to a strong random string in production
- Never commit your `.env` file to version control
- The `.gitignore` file is already configured to exclude `.env`

