# Exercise 2: File and Folder Management

## 🎯 Objective
Practice creating, organizing, moving, and deleting files and folders using only the command line.

## 📝 Instructions

Create this folder structure using ONLY terminal commands:

```
practice-project/
├── src/
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── images/
│   └── logo.png (empty file)
├── docs/
│   └── README.md
└── tests/
```

## Tasks

1. **Create** the main folder `practice-project`
2. **Create** all subfolders
3. **Create** all files listed above
4. **Copy** `README.md` to the root of `practice-project`
5. **Move** `logo.png` from `images/` to `src/`
6. **Rename** `script.js` to `app.js`
7. **Delete** the `tests/` folder
8. **List** the final structure

## 💡 Commands Reference

**macOS/Linux:**
```bash
mkdir folder-name          # Create folder
mkdir -p path/to/folder    # Create nested folders
touch filename             # Create empty file
cp source destination      # Copy
mv source destination      # Move or rename
rm filename                # Delete file
rm -r folder-name          # Delete folder
ls -R                      # List all recursively
```

**Windows:**
```cmd
mkdir folder-name          # Create folder
type nul > filename        # Create empty file
copy source destination    # Copy
move source destination    # Move or rename
del filename               # Delete file
rmdir /s folder-name       # Delete folder
tree /f                    # Show tree structure
```

## ✅ Success Criteria
- [ ] Created entire folder structure from command line
- [ ] All files created successfully
- [ ] Completed copy, move, and rename operations
- [ ] Deleted folder successfully
- [ ] Can navigate the structure easily

---

**Time**: ~25 minutes

