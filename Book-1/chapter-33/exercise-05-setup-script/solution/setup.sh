#!/bin/bash

#===========================================
# Project Setup Script - SOLUTION
# Description: Automates web project setup
# Author: Your Name
# Usage: ./setup.sh project-name
#===========================================

# Exit on any error
set -e

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

#===========================================
# Helper Functions
#===========================================

success() {
  echo -e "${GREEN}✓${NC} $1"
}

error() {
  echo -e "${RED}✗${NC} $1"
  exit 1
}

warning() {
  echo -e "${YELLOW}⚠${NC} $1"
}

#===========================================
# Validation
#===========================================

# Check if project name provided
if [ -z "$1" ]; then
  error "Usage: ./setup.sh project-name"
fi

PROJECT_NAME=$1
AUTHOR="Your Name"  # Change this to your name

# Check if directory already exists
if [ -d "$PROJECT_NAME" ]; then
  error "Directory '$PROJECT_NAME' already exists"
fi

# Check if git is installed
if ! command -v git &> /dev/null; then
  warning "Git is not installed. Skipping git initialization."
  HAS_GIT=false
else
  HAS_GIT=true
fi

#===========================================
# Project Creation
#===========================================

echo ""
echo "🚀 Creating project: $PROJECT_NAME"
echo ""

# Create project directory
mkdir "$PROJECT_NAME"
cd "$PROJECT_NAME"
success "Created project directory"

# Create subdirectories
mkdir -p src css js images
success "Created subdirectories (src, css, js, images)"

#===========================================
# Create HTML File
#===========================================

cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="A web development project">
  <title>My Project</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <header>
    <h1>Welcome to My Project</h1>
  </header>

  <main>
    <section class="container">
      <h2>Getting Started</h2>
      <p>Edit index.html to begin building your project!</p>
    </section>
  </main>

  <footer>
    <p>&copy; 2024 My Project</p>
  </footer>

  <script src="js/app.js"></script>
</body>
</html>
EOF

success "Created index.html"

#===========================================
# Create CSS File
#===========================================

cat > css/styles.css << 'EOF'
/* ===========================================
   CSS Reset and Base Styles
   =========================================== */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f4f4f4;
}

/* ===========================================
   Layout
   =========================================== */

header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 2rem 1rem;
}

header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

main {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.container {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: 2rem;
}

/* ===========================================
   Responsive Design
   =========================================== */

@media (max-width: 768px) {
  header h1 {
    font-size: 2rem;
  }

  .container {
    padding: 1rem;
  }
}
EOF

success "Created css/styles.css"

#===========================================
# Create JavaScript File
#===========================================

cat > js/app.js << 'EOF'
// ===========================================
// Main JavaScript File
// ===========================================

console.log('🚀 Project loaded successfully!');

// Add your JavaScript code here

// Example: Add interactivity
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');

  // Your code here
});
EOF

success "Created js/app.js"

#===========================================
# Git Initialization
#===========================================

if [ "$HAS_GIT" = true ]; then
  git init > /dev/null 2>&1
  success "Initialized Git repository"

  # Create .gitignore
  cat > .gitignore << 'EOF'
# Dependencies
node_modules/
vendor/

# Environment files
.env
.env.local
.env.*.local

# Build output
dist/
build/
*.log

# OS files
.DS_Store
Thumbs.db
*.swp
*.swo

# IDE files
.vscode/
.idea/
*.sublime-project
*.sublime-workspace

# Temporary files
*.tmp
*~
EOF

  success "Created .gitignore"
fi

#===========================================
# Create README
#===========================================

cat > README.md << EOF
# $PROJECT_NAME

A web development project created with automated setup script.

## 📁 Project Structure

\`\`\`
$PROJECT_NAME/
├── index.html       # Main HTML file
├── css/
│   └── styles.css   # Stylesheet
├── js/
│   └── app.js       # JavaScript
├── images/          # Image assets
└── README.md        # This file
\`\`\`

## 🚀 Getting Started

1. Open \`index.html\` in your browser
2. Start editing files to build your project
3. Add images to the \`images/\` folder

## 📝 Development

- HTML: Edit \`index.html\`
- CSS: Edit \`css/styles.css\`
- JavaScript: Edit \`js/app.js\`

## 🎨 Features

- Responsive design
- Modern CSS reset
- Clean file structure
- Git initialized

## 👤 Author

$AUTHOR

## 📅 Created

$(date +"%Y-%m-%d")

## 📄 License

This project is open source and available under the MIT License.
EOF

success "Created README.md"

#===========================================
# Initial Git Commit
#===========================================

if [ "$HAS_GIT" = true ]; then
  git add . > /dev/null 2>&1
  git commit -m "Initial commit: Project structure created

- Added HTML5 boilerplate
- Added CSS with reset and base styles
- Added JavaScript entry point
- Created README with project info
- Initialized Git repository" > /dev/null 2>&1

  success "Made initial Git commit"
fi

#===========================================
# Success Summary
#===========================================

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✨ Project '$PROJECT_NAME' created successfully!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📂 Location: $(pwd)"
echo ""
echo "🎯 Next steps:"
echo "   1. cd $PROJECT_NAME"
echo "   2. open index.html"
echo "   3. Start coding!"
echo ""

if [ "$HAS_GIT" = true ]; then
  echo "📊 Git:"
  echo "   • Repository initialized"
  echo "   • Initial commit made"
  echo "   • Ready to connect to GitHub"
  echo ""
fi

echo "💡 Tips:"
echo "   • Edit files in your favorite editor"
echo "   • Use Live Server for auto-reload"
echo "   • Commit often with meaningful messages"
echo ""

# Optional: Open in browser
if command -v open &> /dev/null; then
  read -p "📖 Open index.html in browser? (y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    open index.html
    echo "✓ Opened in default browser"
  fi
fi

exit 0

