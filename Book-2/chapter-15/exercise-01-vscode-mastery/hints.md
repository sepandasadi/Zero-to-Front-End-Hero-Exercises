# Exercise 1 Hints: VS Code Mastery

## General Tips

- **Muscle Memory**: The shortcuts will feel awkward at first. Force yourself to NOT use the mouse!
- **Practice Daily**: Spend 5 minutes each day just practicing shortcuts
- **Speed vs Accuracy**: Start slow and accurate, speed comes naturally

## Part-by-Part Hints

### Part 1: File Creation and Navigation

**Stuck creating files without mouse?**
- `Ctrl/Cmd + N` creates a new untitled file
- Type the filename when you save with `Ctrl/Cmd + S`
- Use `Ctrl/Cmd + P` then type filename to quickly open any file

**Can't remember which file you're in?**
- `Ctrl/Cmd + Tab` cycles through open files
- Hold `Ctrl/Cmd` and keep pressing `Tab` to see all open files

### Part 2: Multi-Cursor Editing

**Multi-cursor not working?**
- Make sure your cursor is ON the word you want to select
- `Ctrl/Cmd + D` selects the current word first, then each additional occurrence
- Use `Ctrl/Cmd + Shift + L` to select ALL occurrences at once
- Press `Esc` to exit multi-cursor mode

**Selected wrong occurrence?**
- `Ctrl/Cmd + U` undoes the last cursor selection
- `Esc` clears all cursors

### Part 3: Line Manipulation

**Line not moving where you expect?**
- `Alt + Up/Down` moves the ENTIRE line (your cursor can be anywhere on that line)
- Make sure you're not in the middle of selecting text

**Duplicate line shortcut not working?**
- Windows/Linux: `Shift + Alt + Down`
- macOS: `Shift + Option + Down`
- Cursor can be anywhere on the line

**Delete line instantly:**
- `Ctrl/Cmd + Shift + K` - No need to select the whole line first!

### Part 4: Advanced Selection

**Need to add cursor at specific locations?**
- `Alt/Option + Click` places a cursor wherever you click
- Useful when changes aren't in a pattern

**Selecting HTML tags:**
- Select opening tag text (like `p`)
- Use `Ctrl/Cmd + D` repeatedly to select each instance
- OR use Find and Replace (`Ctrl/Cmd + H`) for more control

**Pro tip for HTML:**
- Use Emmet to quickly restructure HTML
- Select tag content and use shortcuts to wrap/change

### Part 5: Search and Replace

**Find not finding what you want?**
- Click the `.*` icon in Find box to enable regex
- Click `Aa` to toggle case sensitivity
- Click `Ab` to match whole words only

**Replace with regex:**
- Find: `(\d+)` (finds any number)
- Replace: `<span>$1</span>` (wraps it in span)

**Find in all files:**
- `Ctrl/Cmd + Shift + F` searches your entire project
- Use carefully in large projects!

### Part 6: Speed Challenge

**Can't finish in 60 seconds?**
- Use Emmet abbreviations! Type `html:5` and press Tab
- For the nav structure, type: `nav.navbar>ul>li*3>a[href]` then Tab
- Link the CSS: `link:css` + Tab
- Link the JS: `script:src` + Tab

**Emmet shortcuts for this challenge:**
```
html:5                          → Full HTML5 boilerplate
nav.navbar>ul>li*3>a            → Nav with 3 list items with links
link:css                        → CSS link tag
script:src                      → Script tag with src
```

## Common Mistakes

1. **Using the mouse** - Catch yourself! Put your mouse away for this exercise
2. **Forgetting to save** - Get in the habit: `Ctrl/Cmd + S` after every change
3. **Not practicing enough** - These need to become muscle memory
4. **Selecting text before using shortcuts** - Many shortcuts work without selection

## Time-Saving Tips

**Learn these power shortcuts:**
- `Ctrl/Cmd + /` - Toggle comment (works on multiple lines)
- `Ctrl/Cmd + [` and `]` - Indent/outdent lines
- `Ctrl/Cmd + Enter` - Insert line below without moving cursor
- `Ctrl/Cmd + Shift + Enter` - Insert line above
- `Alt + Click` - Multiple cursors anywhere
- `Ctrl/Cmd + Shift + K` - Delete entire line

**Format code instantly:**
- Install Prettier extension
- `Shift + Alt/Option + F` - Format entire file

## Still Stuck?

### Issue: Shortcuts not working
- **Check**: Are you on macOS or Windows/Linux?
- **Check**: VS Code is in focus (not browser)
- **Check**: Extensions might override shortcuts

### Issue: Can't find a file
- Use fuzzy search with `Ctrl/Cmd + P`
- You don't need to type the full name
- Type parts of the name: `apjs` finds `app.js`

### Issue: Accidentally closed a file
- `Ctrl/Cmd + Shift + T` reopens last closed file

### Issue: Lost your cursor
- Press `Esc` to clear multi-cursors
- `Ctrl/Cmd + Home` goes to file start
- `Ctrl/Cmd + G` lets you jump to specific line number

## Practice Suggestions

**Daily Practice Routine (5 minutes):**
1. Create 5 files using only keyboard
2. Write a function and duplicate it 5 times
3. Rename a variable in 10 places using multi-cursor
4. Move lines around in different orders
5. Search and replace something

**Within a week**, these shortcuts will feel natural!

## Next Steps

Once comfortable:
- Learn snippets (create your own shortcuts)
- Explore Emmet more deeply
- Customize your own shortcuts
- Learn workspace shortcuts (`Ctrl/Cmd + K, Ctrl/Cmd + S` to see all)

---

**Remember**: Every expert was once a beginner who refused to give up! 🚀

