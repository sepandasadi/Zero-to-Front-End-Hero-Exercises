# Project Management Tool - Starter Template

Build a Trello-style project management application with drag-and-drop functionality.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

## 🎯 Project Goals

Create a kanban-style board with:
1. **Boards** - Multiple project boards
2. **Lists** - Customizable columns (To Do, In Progress, Done)
3. **Cards** - Draggable task cards
4. **Drag & Drop** - Move cards between lists
5. **CRUD Operations** - Create, update, delete boards/lists/cards
6. **Data Persistence** - Save to localStorage
7. **Search & Filter** - Find cards quickly
8. **Labels & Tags** - Organize cards

## 📦 Key Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "@dnd-kit/core": "^6.0.8",
    "@dnd-kit/sortable": "^7.0.2",
    "zustand": "^4.4.7",
    "date-fns": "^3.0.0"
  }
}
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── board/
│   │   ├── Board.vue
│   │   ├── BoardList.jsx
│   │   └── BoardHeader.jsx
│   ├── list/
│   │   ├── List.jsx
│   │   ├── ListHeader.jsx
│   │   └── AddList.jsx
│   ├── card/
│   │   ├── Card.jsx
│   │   ├── CardModal.jsx
│   │   └── CardForm.jsx
│   └── common/
│       ├── DragOverlay.jsx
│       └── Modal.jsx
├── store/
│   └── boardStore.js
├── hooks/
│   ├── useDragAndDrop.js
│   └── useLocalStorage.js
└── utils/
    └── dataHelpers.js
```

## ✨ Features to Implement

### Must Have:
- [ ] Create/edit/delete boards
- [ ] Create/edit/delete lists
- [ ] Create/edit/delete cards
- [ ] Drag cards between lists
- [ ] Reorder cards within a list
- [ ] localStorage persistence
- [ ] Card details modal
- [ ] Due dates
- [ ] Labels/tags

### Nice to Have:
- [ ] Drag lists to reorder
- [ ] Card descriptions
- [ ] Checklist items
- [ ] File attachments
- [ ] Comments
- [ ] Activity log
- [ ] Keyboard shortcuts
- [ ] Export board data

## 💡 Implementation Guide

### Drag & Drop with @dnd-kit:

```javascript
import { DndContext, closestCorners } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

function Board() {
  const handleDragEnd = (event) => {
    const { active, over } = event
    // Handle card movement
  }

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={cards} strategy={verticalListSortingStrategy}>
        {/* Your lists and cards */}
      </SortableContext>
    </DndContext>
  )
}
```

### Zustand Store:

```javascript
import create from 'zustand'

export const useBoardStore = create((set) => ({
  boards: [],
  addCard: (listId, card) => set((state) => ({
    // Add card logic
  })),
  moveCard: (cardId, fromListId, toListId) => set((state) => ({
    // Move card logic
  }))
}))
```

## 📚 Resources

- [@dnd-kit Documentation](https://docs.dndkit.com/)
- [Zustand Guide](https://github.com/pmndrs/zustand)
- Check solution folder for complete examples

## ✅ Success Criteria

- All CRUD operations work
- Drag and drop is smooth
- Data persists on reload
- Responsive design
- No bugs or console errors

Good luck building your project manager! 🚀

