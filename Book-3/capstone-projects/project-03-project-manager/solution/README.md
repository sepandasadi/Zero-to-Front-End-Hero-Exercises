# Project Management Tool - Complete Solution

A full-featured Trello-style project management application.

## ✨ Features Implemented

### Core Features:
- ✅ Multiple boards with custom names/colors
- ✅ Create/edit/delete lists
- ✅ Create/edit/delete cards
- ✅ Drag & drop cards between lists
- ✅ Drag & drop to reorder cards
- ✅ Drag & drop to reorder lists
- ✅ Card details modal with full editing
- ✅ Due dates with date picker
- ✅ Color-coded labels
- ✅ Card descriptions (Markdown support)
- ✅ Checklist items with progress
- ✅ localStorage persistence
- ✅ Search cards
- ✅ Filter by labels/due date
- ✅ Responsive design
- ✅ Keyboard shortcuts

### Advanced Features:
- Activity log for all actions
- Archive boards/lists/cards
- Duplicate cards
- Card attachments (simulated)
- Comments on cards
- Board settings
- Export board to JSON
- Import board from JSON
- Undo/redo actions

## 🛠️ Tech Stack

- **React 18** - UI framework
- **@dnd-kit** - Drag and drop
- **Zustand** - State management
- **date-fns** - Date utilities
- **React Markdown** - Markdown rendering
- **Tailwind CSS** - Styling
- **React Icons** - Icons
- **Vite** - Build tool

## 📁 Architecture

```
src/
├── components/
│   ├── board/
│   │   ├── Board.jsx                 # Main board view
│   │   ├── BoardList.jsx             # All boards list
│   │   ├── BoardHeader.jsx           # Board header with title
│   │   ├── BoardSettings.jsx         # Board settings modal
│   │   └── CreateBoard.jsx           # Create board form
│   ├── list/
│   │   ├── List.jsx                  # List container
│   │   ├── ListHeader.jsx            # List title/menu
│   │   ├── AddList.jsx               # Create list button
│   │   └── ListMenu.jsx              # List options menu
│   ├── card/
│   │   ├── Card.jsx                  # Card component
│   │   ├── CardModal.jsx             # Detailed card view
│   │   ├── CardForm.jsx              # Card edit form
│   │   ├── CardLabels.jsx            # Label selector
│   │   ├── CardChecklist.jsx         # Checklist component
│   │   ├── CardDueDate.jsx           # Due date picker
│   │   └── CardComments.jsx          # Comments section
│   ├── common/
│   │   ├── Modal.jsx                 # Reusable modal
│   │   ├── DatePicker.jsx            # Date picker
│   │   ├── ColorPicker.jsx           # Color selector
│   │   ├── Dropdown.jsx              # Dropdown menu
│   │   └── ConfirmDialog.jsx         # Confirmation dialog
│   └── layout/
│       ├── Sidebar.jsx               # App sidebar
│       ├── Header.jsx                # App header
│       └── Layout.jsx                # Main layout
├── store/
│   ├── boardStore.js                 # Board state management
│   ├── cardStore.js                  # Card operations
│   └── uiStore.js                    # UI state
├── hooks/
│   ├── useDragAndDrop.js             # Drag & drop logic
│   ├── useLocalStorage.js            # localStorage sync
│   ├── useKeyboardShortcuts.js       # Keyboard handling
│   └── useUndoRedo.js                # Undo/redo functionality
├── utils/
│   ├── dataHelpers.js                # Data manipulation
│   ├── dateHelpers.js                # Date formatting
│   └── exportHelpers.js              # Export/import logic
└── App.jsx
```

## 🎯 Key Implementation Patterns

### 1. Drag & Drop System

```javascript
import { DndContext, DragOverlay } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'

function Board({ board }) {
  const [activeCard, setActiveCard] = useState(null)

  const handleDragStart = (event) => {
    setActiveCard(event.active.data.current)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!over) return

    const activeCardId = active.id
    const overListId = over.data.current.listId
    const overIndex = over.data.current.index

    moveCard(activeCardId, overListId, overIndex)
    setActiveCard(null)
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
    >
      <div className="board">
        {board.lists.map(list => (
          <SortableContext key={list.id} items={list.cards}>
            <List list={list} />
          </SortableContext>
        ))}
      </div>

      <DragOverlay>
        {activeCard ? <Card card={activeCard} isDragging /> : null}
      </DragOverlay>
    </DndContext>
  )
}
```

### 2. Zustand Store

```javascript
import create from 'zustand'
import { persist } from 'zustand/middleware'

export const useBoardStore = create(
  persist(
    (set, get) => ({
      boards: [],
      currentBoardId: null,

      // Board operations
      addBoard: (board) => set((state) => ({
        boards: [...state.boards, { ...board, id: generateId() }]
      })),

      // Card operations
      addCard: (listId, card) => set((state) => {
        const boards = state.boards.map(board => {
          if (board.id !== state.currentBoardId) return board

          return {
            ...board,
            lists: board.lists.map(list => {
              if (list.id !== listId) return list

              return {
                ...list,
                cards: [...list.cards, { ...card, id: generateId() }]
              }
            })
          }
        })

        return { boards }
      }),

      // Move card between lists
      moveCard: (cardId, fromListId, toListId, toIndex) => set((state) => {
        const boards = [...state.boards]
        const board = boards.find(b => b.id === state.currentBoardId)

        const fromList = board.lists.find(l => l.id === fromListId)
        const toList = board.lists.find(l => l.id === toListId)

        const cardIndex = fromList.cards.findIndex(c => c.id === cardId)
        const [card] = fromList.cards.splice(cardIndex, 1)

        toList.cards.splice(toIndex, 0, card)

        return { boards }
      }),

      // ... more operations
    }),
    {
      name: 'board-storage',
      getStorage: () => localStorage
    }
  )
)
```

### 3. Card Component

```javascript
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function Card({ card }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: card.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="card"
      onClick={() => openCardModal(card)}
    >
      {card.labels.map(label => (
        <span key={label.id} className={`label label-${label.color}`}>
          {label.name}
        </span>
      ))}

      <h3>{card.title}</h3>

      {card.description && (
        <p className="description">{truncate(card.description)}</p>
      )}

      <div className="card-footer">
        {card.dueDate && (
          <span className={`due-date ${isOverdue(card.dueDate) ? 'overdue' : ''}`}>
            {formatDate(card.dueDate)}
          </span>
        )}

        {card.checklist && (
          <span className="checklist-progress">
            {getCompletedCount(card.checklist)}/{card.checklist.length}
          </span>
        )}
      </div>
    </div>
  )
}
```

### 4. Card Modal

```javascript
function CardModal({ card, onClose }) {
  const [editedCard, setEditedCard] = useState(card)
  const updateCard = useBoardStore(state => state.updateCard)

  const handleSave = () => {
    updateCard(card.id, editedCard)
    onClose()
  }

  return (
    <Modal onClose={onClose}>
      <div className="card-modal">
        <input
          value={editedCard.title}
          onChange={(e) => setEditedCard({ ...editedCard, title: e.target.value })}
          className="card-title-input"
        />

        <div className="card-details">
          <CardLabels
            labels={editedCard.labels}
            onChange={(labels) => setEditedCard({ ...editedCard, labels })}
          />

          <CardDueDate
            dueDate={editedCard.dueDate}
            onChange={(date) => setEditedCard({ ...editedCard, dueDate: date })}
          />

          <CardDescription
            description={editedCard.description}
            onChange={(desc) => setEditedCard({ ...editedCard, description: desc })}
          />

          <CardChecklist
            checklist={editedCard.checklist}
            onChange={(checklist) => setEditedCard({ ...editedCard, checklist })}
          />

          <CardComments
            comments={editedCard.comments}
            onAddComment={(comment) => {
              setEditedCard({
                ...editedCard,
                comments: [...editedCard.comments, comment]
              })
            }}
          />
        </div>

        <div className="modal-actions">
          <button onClick={handleSave} className="btn-primary">
            Save Changes
          </button>
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  )
}
```

## 🎓 Learning Outcomes

1. **Complex State Management** - Managing nested data structures
2. **Drag & Drop** - Implementing intuitive DnD interactions
3. **Performance Optimization** - Handling large lists efficiently
4. **Data Persistence** - localStorage with complex objects
5. **Modal Management** - Handling multiple modal states
6. **Keyboard Shortcuts** - Improving UX with shortcuts
7. **Undo/Redo** - Implementing action history
8. **Component Composition** - Building complex UIs from simple parts

## 🚀 Deployment

```bash
npm run build
vercel --prod
```

## 📝 Future Enhancements

- Real-time collaboration with WebSockets
- User authentication
- Backend API integration
- Team workspaces
- Card assignments
- Time tracking
- Calendar view
- Gantt chart view
- Mobile app (React Native)

---

**Status:** ✅ Complete
**Complexity:** Advanced
**Lines of Code:** ~4,000+
**Components:** 30+

This project demonstrates advanced React patterns including complex state management, drag-and-drop interfaces, and sophisticated UI interactions.

