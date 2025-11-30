# Exercise 5: Build a Developer Setup Script

**Difficulty**: Intermediate
**Time**: 45-60 minutes

## 🎯 Goal

Create a reusable project initialization script that automates the boring parts of starting new projects. Real developers automate repetitive tasks!

## 📋 Requirements

1. Terminal/command prompt
2. Basic shell scripting knowledge (we'll teach you!)
3. Git installed
4. Text editor

## 🔨 Tasks

### Part 1: Understanding the Problem

**Every time you start a new project, you do this:**

```bash
mkdir my-project
cd my-project
mkdir css js images
touch index.html
touch css/styles.css
touch js/app.js
touch README.md
touch .gitignore
# ... add content to .gitignore
# ... add boilerplate to index.html
git init
git add .
git commit -m "Initial commit"
```

**That's 10+ manual steps, repeated for EVERY new project!**

**Your goal:** Automate this into a single command!

### Part 2: Create the Script (Mac/Linux)

**Create `setup-project.sh`:**

```bash
#!/bin/bash

# Check if project name was provided
if [ -z "$1" ]; then
  echo "❌ Error: Please provide a project name"
  echo "Usage: ./setup-project.sh my-project-name"
  exit 1
fi

PROJECT_NAME=$1

# Create project directory
echo "📁 Creating project directory: $PROJECT_NAME"
mkdir $PROJECT_NAME
cd $PROJECT_NAME

# Create folder structure
echo "📂 Creating folder structure..."
mkdir -p src/css
mkdir -p src/js
mkdir -p src/images
mkdir -p docs

# Create files
echo "📄 Creating files..."
touch README.md
touch .gitignore
touch src/index.html
touch src/css/styles.css
touch src/js/app.js

# Add content to .gitignore
echo "🚫 Creating .gitignore..."
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build files
dist/
build/
*.log

# OS files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Editor files
.vscode/
.idea/
*.swp
*.swo
*~

# Testing
coverage/
.nyc_output/
EOF

# Add boilerplate HTML
echo "📝 Creating HTML boilerplate..."
cat > src/index.html << EOF
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="$PROJECT_NAME - A web project">
  <meta name="author" content="Your Name">
  <title>$PROJECT_NAME</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <header>
    <h1>$PROJECT_NAME</h1>
    <nav>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section id="home">
      <h2>Welcome to $PROJECT_NAME</h2>
      <p>Start building something amazing!</p>
    </section>
  </main>

  <footer>
    <p>&copy; 2024 $PROJECT_NAME. All rights reserved.</p>
  </footer>

  <script src="js/app.js"></script>
</body>
</html>
EOF

# Add starter CSS
echo "🎨 Creating CSS starter..."
cat > src/css/styles.css << 'EOF'
/* Reset and base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Header styles */
header {
  background: #333;
  color: white;
  padding: 2rem;
  margin: -20px -20px 20px -20px;
}

header h1 {
  margin-bottom: 1rem;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 2rem;
}

nav a {
  color: white;
  text-decoration: none;
}

nav a:hover {
  text-decoration: underline;
}

/* Main content */
main {
  padding: 2rem 0;
}

section {
  margin-bottom: 2rem;
}

h2 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

/* Footer */
footer {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #ddd;
  text-align: center;
  color: #666;
}
EOF

# Add starter JavaScript
echo "⚡ Creating JavaScript starter..."
cat > src/js/app.js << 'EOF'
console.log('Project initialized successfully!');

// DOM ready check
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');

  // Your code here
  init();
});

function init() {
  // Initialize your application
  console.log('App initialized');
}
EOF

# Create README
echo "📖 Creating README..."
cat > README.md << EOF
# $PROJECT_NAME

## Description

A web development project.

## Project Structure

\`\`\`
$PROJECT_NAME/
├── src/
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── app.js
│   └── images/
├── docs/
├── .gitignore
└── README.md
\`\`\`

## Getting Started

1. Open \`src/index.html\` in your browser
2. Or use Live Server in VS Code
3. Start coding!

## Features

- Clean HTML5 structure
- Responsive CSS
- Modern JavaScript
- Git ready

## To Do

- [ ] Add your features here
- [ ] Customize styles
- [ ] Build something amazing!

## Author

Your Name

## License

MIT
EOF

# Initialize Git
echo "🌿 Initializing Git repository..."
git init -q
git add .
git commit -q -m "Initial commit: Project setup"

# Success message
echo ""
echo "✅ Project '$PROJECT_NAME' created successfully!"
echo ""
echo "📍 Location: $(pwd)"
echo ""
echo "🚀 Next steps:"
echo "   cd $PROJECT_NAME"
echo "   code ."
echo "   # Start coding!"
echo ""
echo "📂 Structure:"
tree -L 2 2>/dev/null || find . -maxdepth 2 -not -path '*/\.*' | sort

echo ""
echo "Happy coding! 🎉"
```

**Make it executable:**

```bash
chmod +x setup-project.sh
```

### Part 3: Create the Script (Windows)

**Create `setup-project.bat`:**

```batch
@echo off
setlocal enabledelayedexpansion

REM Check if project name was provided
if "%~1"=="" (
  echo ❌ Error: Please provide a project name
  echo Usage: setup-project.bat my-project-name
  exit /b 1
)

set PROJECT_NAME=%~1

REM Create project directory
echo 📁 Creating project directory: %PROJECT_NAME%
mkdir "%PROJECT_NAME%"
cd "%PROJECT_NAME%"

REM Create folder structure
echo 📂 Creating folder structure...
mkdir src\css
mkdir src\js
mkdir src\images
mkdir docs

REM Create .gitignore
echo 🚫 Creating .gitignore...
(
echo # Dependencies
echo node_modules/
echo.
echo # Environment
echo .env
echo .env.local
echo.
echo # Build
echo dist/
echo build/
echo.
echo # OS
echo .DS_Store
echo Thumbs.db
echo.
echo # Editors
echo .vscode/
echo .idea/
) > .gitignore

REM Create HTML file
echo 📝 Creating HTML boilerplate...
(
echo ^<!DOCTYPE html^>
echo ^<html lang="en"^>
echo ^<head^>
echo   ^<meta charset="UTF-8"^>
echo   ^<meta name="viewport" content="width=device-width, initial-scale=1.0"^>
echo   ^<title^>%PROJECT_NAME%^</title^>
echo   ^<link rel="stylesheet" href="css/styles.css"^>
echo ^</head^>
echo ^<body^>
echo   ^<h1^>%PROJECT_NAME%^</h1^>
echo   ^<script src="js/app.js"^>^</script^>
echo ^</body^>
echo ^</html^>
) > src\index.html

REM Create CSS file
echo 🎨 Creating CSS starter...
(
echo * {
echo   margin: 0;
echo   padding: 0;
echo   box-sizing: border-box;
echo }
echo.
echo body {
echo   font-family: Arial, sans-serif;
echo   padding: 20px;
echo }
) > src\css\styles.css

REM Create JS file
echo ⚡ Creating JavaScript starter...
(
echo console.log^('Project initialized!'^);
echo.
echo document.addEventListener^('DOMContentLoaded', ^(^) =^> {
echo   console.log^('DOM loaded'^);
echo }^);
) > src\js\app.js

REM Create README
echo 📖 Creating README...
(
echo # %PROJECT_NAME%
echo.
echo A web development project.
echo.
echo ## Getting Started
echo.
echo 1. Open `src/index.html` in browser
echo 2. Start coding!
) > README.md

REM Initialize Git
echo 🌿 Initializing Git repository...
git init
git add .
git commit -m "Initial commit: Project setup"

echo.
echo ✅ Project '%PROJECT_NAME%' created successfully!
echo.
echo 🚀 Next steps:
echo    cd %PROJECT_NAME%
echo    code .
echo.
echo Happy coding! 🎉
```

### Part 4: Test Your Script

**Mac/Linux:**
```bash
./setup-project.sh test-project
```

**Windows:**
```batch
setup-project.bat test-project
```

**Verify created:**
- [ ] Project folder exists
- [ ] All subfolders created (src/css, src/js, src/images, docs)
- [ ] index.html has boilerplate
- [ ] styles.css has starter styles
- [ ] app.js has starter code
- [ ] .gitignore has proper ignores
- [ ] README.md exists
- [ ] Git repository initialized
- [ ] Initial commit exists (`git log` to check)

### Part 5: Customize Your Script

**Add these enhancements:**

1. **Add license file option:**

```bash
# Add after README creation
echo "📜 Adding MIT License..."
cat > LICENSE << 'EOF'
MIT License

Copyright (c) 2024

Permission is hereby granted, free of charge, to any person obtaining a copy...
EOF
```

2. **Add package.json (for npm projects):**

```bash
# Add option for npm projects
echo "📦 Creating package.json..."
npm init -y
```

3. **Add option to open in VS Code automatically:**

```bash
# At the end
if command -v code &> /dev/null; then
  echo "🎨 Opening in VS Code..."
  code .
fi
```

4. **Add option for different project types:**

```bash
# At beginning, ask for project type
echo "Select project type:"
echo "1) Static HTML/CSS/JS"
echo "2) React"
echo "3) Node.js"
read -p "Choice: " choice
```

## ✅ Success Criteria

- [ ] Script successfully creates project structure
- [ ] All files contain proper boilerplate
- [ ] Git repository initialized with first commit
- [ ] Script is reusable for any project name
- [ ] Error handling for missing project name
- [ ] Success message displays
- [ ] Can create multiple projects with one script

## 🎓 What You Learned

- Bash/Batch scripting basics
- Automating repetitive tasks
- Creating file structures programmatically
- Heredocs for multi-line content
- Git automation
- Professional project setup
- Time-saving workflows

## 💡 Pro Tips

**Make it globally accessible (Mac/Linux):**

```bash
# Move to PATH location
sudo mv setup-project.sh /usr/local/bin/setup-project
sudo chmod +x /usr/local/bin/setup-project

# Now use from anywhere!
setup-project my-new-project
```

**Create different templates:**
- `setup-react.sh` for React projects
- `setup-node.sh` for Node.js projects
- `setup-static.sh` for static sites

**Add to .zshrc or .bashrc for aliases:**

```bash
alias newproject="/path/to/setup-project.sh"
```

## 📚 Challenge Enhancements

**Level up your script:**

1. **Interactive mode** - Ask questions:
   - Project name?
   - Include testing? (Y/N)
   - Framework? (React/Vue/None)
   - License type? (MIT/GPL/None)

2. **Template system** - Support multiple templates

3. **GitHub integration** - Automatically create GitHub repo

4. **Dependency installation** - Auto-install common packages

5. **Pre-commit hooks** - Set up linting, formatting

**Example interactive script:**

```bash
read -p "Project name: " PROJECT_NAME
read -p "Description: " DESC
read -p "Author: " AUTHOR
read -p "Include TypeScript? (y/n): " TS
read -p "Include testing? (y/n): " TEST
```

---

**Congratulations! You've automated a tedious process and saved yourself hours of future work!** ⚡

