# Setup Instructions

## Environment Variables

Create a `.env` file in the root directory:

```
JWT_SECRET=your-super-secret-key-change-in-production
PORT=3000
NODE_ENV=development
LOG_LEVEL=info
API_KEYS=secret-key-123,another-key-456
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

- Generate a strong random string for `JWT_SECRET` in production
- Add your API keys to the `API_KEYS` comma-separated list
- Never commit your `.env` file to version control
- The `.gitignore` file is already configured to exclude `.env` and `logs/`
- Logs will be created in the `logs/` directory

