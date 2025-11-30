# Exercise 5 Hints: Build a Developer Setup Script

## Getting Started

**Which shell are you using?**
```bash
echo $SHELL
# /bin/bash → Bash script (.sh)
# /bin/zsh → Zsh (macOS default)
# PowerShell → Windows (.ps1)
```

**Basic script structure:**
```bash
#!/bin/bash
# Shebang - tells system which interpreter to use

# Your commands here
echo "Hello, World!"
```

**Make script executable:**
```bash
chmod +x setup.sh    # Make executable
./setup.sh           # Run it
```

## Writing Your First Script

### Simple Example

```bash
#!/bin/bash

# Print message
echo "Starting project setup..."

# Create directories
mkdir -p src css js images

# Create files
touch index.html
touch css/styles.css
touch js/app.js

echo "✓ Setup complete!"
```

### Making It Better

**Add error handling:**
```bash
#!/bin/bash

# Exit on error
set -e

# Function to create dir
create_dir() {
  if [ ! -d "$1" ]; then
    mkdir -p "$1"
    echo "✓ Created directory: $1"
  else
    echo "ℹ Directory already exists: $1"
  fi
}

create_dir "src"
create_dir "css"
```

## Common Script Components

### Variables

```bash
# Define variables
PROJECT_NAME="my-project"
AUTHOR="Your Name"

# Use variables
echo "Creating $PROJECT_NAME..."
mkdir "$PROJECT_NAME"
```

### Functions

```bash
# Define function
create_file() {
  local filename=$1
  local content=$2

  echo "$content" > "$filename"
  echo "✓ Created: $filename"
}

# Call function
create_file "index.html" "<!DOCTYPE html>"
```

### Conditionals

```bash
# If statement
if [ -f "package.json" ]; then
  echo "package.json exists"
else
  echo "Creating package.json..."
  npm init -y
fi

# Check if command exists
if command -v node &> /dev/null; then
  echo "Node.js is installed"
else
  echo "Please install Node.js"
  exit 1
fi
```

### Loops

```bash
# For loop
for dir in src css js images; do
  mkdir -p "$dir"
  echo "Created $dir"
done

# While loop
while true; do
  read -p "Continue? (y/n) " yn
  case $yn in
    [Yy]* ) break;;
    [Nn]* ) exit;;
    * ) echo "Please answer yes or no.";;
  esac
done
```

## Project Setup Script Ideas

### Basic HTML Project

```bash
#!/bin/bash

PROJECT_NAME=$1

if [ -z "$PROJECT_NAME" ]; then
  echo "Usage: ./setup.sh project-name"
  exit 1
fi

# Create project directory
mkdir "$PROJECT_NAME"
cd "$PROJECT_NAME"

# Create structure
mkdir -p css js images

# Create HTML
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Project</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <h1>Hello, World!</h1>
  <script src="js/app.js"></script>
</body>
</html>
EOF

# Create CSS
cat > css/styles.css << 'EOF'
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  padding: 20px;
}
EOF

# Create JS
cat > js/app.js << 'EOF'
console.log('Hello from app.js!');
EOF

echo "✓ Project '$PROJECT_NAME' created!"
```

### Node.js Project

```bash
#!/bin/bash

# Initialize npm
npm init -y

# Install dependencies
npm install express

# Create server
cat > server.js << 'EOF'
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
EOF

# Add start script to package.json
npm pkg set scripts.start="node server.js"

echo "✓ Node.js project ready!"
echo "Run 'npm start' to begin"
```

### React Project (with Vite)

```bash
#!/bin/bash

PROJECT_NAME=$1

# Create Vite project
npm create vite@latest "$PROJECT_NAME" -- --template react

cd "$PROJECT_NAME"

# Install dependencies
npm install

# Create additional structure
mkdir src/components src/utils src/styles

echo "✓ React project '$PROJECT_NAME' created!"
echo "Run 'cd $PROJECT_NAME && npm run dev' to start"
```

## Common Tasks to Automate

### Git Initialization

```bash
# Initialize git
git init

# Create .gitignore
cat > .gitignore << 'EOF'
node_modules/
.env
.DS_Store
dist/
build/
*.log
EOF

# Initial commit
git add .
git commit -m "Initial commit"

echo "✓ Git initialized"
```

### Create README

```bash
cat > README.md << EOF
# $PROJECT_NAME

## Description
Your project description here

## Installation
\`\`\`bash
npm install
\`\`\`

## Usage
\`\`\`bash
npm start
\`\`\`

## Author
$AUTHOR
EOF

echo "✓ README created"
```

### Install Common Tools

```bash
# Install dev dependencies
npm install --save-dev \
  prettier \
  eslint \
  nodemon

# Create .prettierrc
cat > .prettierrc << 'EOF'
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2
}
EOF

echo "✓ Dev tools installed"
```

## User Input

### Ask for project name

```bash
read -p "Enter project name: " PROJECT_NAME

if [ -z "$PROJECT_NAME" ]; then
  echo "Error: Project name required"
  exit 1
fi

echo "Creating $PROJECT_NAME..."
```

### Ask yes/no questions

```bash
read -p "Install dependencies? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  npm install
fi
```

### Menu selection

```bash
echo "Select project type:"
echo "1) Basic HTML"
echo "2) Node.js"
echo "3) React"
read -p "Choice: " choice

case $choice in
  1) create_html_project ;;
  2) create_node_project ;;
  3) create_react_project ;;
  *) echo "Invalid choice" ;;
esac
```

## Error Handling

### Check if command exists

```bash
if ! command -v node &> /dev/null; then
  echo "Error: Node.js is not installed"
  echo "Please install Node.js from nodejs.org"
  exit 1
fi
```

### Check if directory exists

```bash
if [ -d "$PROJECT_NAME" ]; then
  echo "Error: Directory '$PROJECT_NAME' already exists"
  exit 1
fi
```

### Cleanup on error

```bash
# Set trap to cleanup on error
trap 'rm -rf "$PROJECT_NAME"; echo "Setup failed, cleaned up"' ERR

set -e  # Exit on any error

# Your setup commands...
```

## Making Scripts User-Friendly

### Add colors

```bash
# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}✓ Success${NC}"
echo -e "${RED}✗ Error${NC}"
echo -e "${YELLOW}⚠ Warning${NC}"
```

### Progress indicators

```bash
spinner() {
  local pid=$1
  local delay=0.1
  local spinstr='|/-\'

  while [ "$(ps a | awk '{print $1}' | grep $pid)" ]; do
    local temp=${spinstr#?}
    printf " [%c]  " "$spinstr"
    local spinstr=$temp${spinstr%"$temp"}
    sleep $delay
    printf "\b\b\b\b\b\b"
  done
  printf "    \b\b\b\b"
}

# Usage
npm install > /dev/null 2>&1 &
spinner $!
echo "✓ Dependencies installed"
```

### Help text

```bash
show_help() {
  cat << EOF
Usage: ./setup.sh [OPTIONS] project-name

Create a new project with common structure and files.

OPTIONS:
  -h, --help       Show this help message
  -t, --type       Project type (html, node, react)
  -a, --author     Author name

EXAMPLES:
  ./setup.sh my-project
  ./setup.sh -t react -a "John Doe" my-app
EOF
}

# Check for help flag
if [ "$1" == "-h" ] || [ "$1" == "--help" ]; then
  show_help
  exit 0
fi
```

## Testing Your Script

### Test with dry run

```bash
# Add -d flag for dry run
DRY_RUN=false

if [ "$1" == "-d" ]; then
  DRY_RUN=true
  shift
fi

create_dir() {
  if [ "$DRY_RUN" == "true" ]; then
    echo "Would create: $1"
  else
    mkdir -p "$1"
  fi
}
```

### Add verbose mode

```bash
VERBOSE=false

if [ "$1" == "-v" ]; then
  VERBOSE=true
  shift
fi

log() {
  if [ "$VERBOSE" == "true" ]; then
    echo "[DEBUG] $1"
  fi
}

log "Starting setup process..."
```

## Common Mistakes

1. **Forgetting shebang** - `#!/bin/bash` at top
2. **Not making executable** - `chmod +x script.sh`
3. **No error handling** - Add `set -e`
4. **Hardcoded paths** - Use variables
5. **No user feedback** - Add echo statements
6. **Not testing** - Test before using!

## Script Template

```bash
#!/bin/bash

#===========================================
# Project Setup Script
# Description: Creates project structure
# Author: Your Name
# Usage: ./setup.sh project-name
#===========================================

set -e  # Exit on error

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# Functions
success() {
  echo -e "${GREEN}✓${NC} $1"
}

error() {
  echo -e "${RED}✗${NC} $1"
  exit 1
}

# Check arguments
if [ -z "$1" ]; then
  error "Usage: ./setup.sh project-name"
fi

PROJECT_NAME=$1

# Main logic
echo "Creating project: $PROJECT_NAME"

# Create directories
mkdir -p "$PROJECT_NAME"/{src,css,js}
success "Created directories"

# Create files
touch "$PROJECT_NAME"/index.html
success "Created files"

# Done
echo
success "Project '$PROJECT_NAME' ready!"
```

---

**Remember**: Start simple, then add features. Test often! 🚀

