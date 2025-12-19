import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'

export const useBoardStore = create(
  persist(
    (set, get) => ({
      boards: [],
      currentBoardId: null,

      // Board operations
      addBoard: (board) => set((state) => ({
        boards: [
          ...state.boards,
          {
            id: uuidv4(),
            title: board.title || 'New Board',
            color: board.color || '#3b82f6',
            lists: [],
            createdAt: new Date().toISOString(),
            ...board
          }
        ]
      })),

      updateBoard: (boardId, updates) => set((state) => ({
        boards: state.boards.map(board =>
          board.id === boardId ? { ...board, ...updates } : board
        )
      })),

      deleteBoard: (boardId) => set((state) => ({
        boards: state.boards.filter(board => board.id !== boardId),
        currentBoardId: state.currentBoardId === boardId ? null : state.currentBoardId
      })),

      // List operations
      addList: (boardId, list) => set((state) => ({
        boards: state.boards.map(board =>
          board.id === boardId
            ? {
                ...board,
                lists: [
                  ...board.lists,
                  {
                    id: uuidv4(),
                    title: list.title || 'New List',
                    cards: [],
                    ...list
                  }
                ]
              }
            : board
        )
      })),

      updateList: (listId, updates) => set((state) => ({
        boards: state.boards.map(board => ({
          ...board,
          lists: board.lists.map(list =>
            list.id === listId ? { ...list, ...updates } : list
          )
        }))
      })),

      deleteList: (listId) => set((state) => ({
        boards: state.boards.map(board => ({
          ...board,
          lists: board.lists.filter(list => list.id !== listId)
        }))
      })),

      moveList: (boardId, fromIndex, toIndex) => set((state) => ({
        boards: state.boards.map(board => {
          if (board.id !== boardId) return board

          const lists = [...board.lists]
          const [movedList] = lists.splice(fromIndex, 1)
          lists.splice(toIndex, 0, movedList)

          return { ...board, lists }
        })
      })),

      // Card operations
      addCard: (listId, card) => set((state) => ({
        boards: state.boards.map(board => ({
          ...board,
          lists: board.lists.map(list =>
            list.id === listId
              ? {
                  ...list,
                  cards: [
                    ...list.cards,
                    {
                      id: uuidv4(),
                      title: card.title || 'New Card',
                      description: '',
                      labels: [],
                      dueDate: null,
                      checklist: [],
                      comments: [],
                      createdAt: new Date().toISOString(),
                      ...card
                    }
                  ]
                }
              : list
          )
        }))
      })),

      updateCard: (cardId, updates) => set((state) => ({
        boards: state.boards.map(board => ({
          ...board,
          lists: board.lists.map(list => ({
            ...list,
            cards: list.cards.map(card =>
              card.id === cardId ? { ...card, ...updates } : card
            )
          }))
        }))
      })),

      deleteCard: (cardId) => set((state) => ({
        boards: state.boards.map(board => ({
          ...board,
          lists: board.lists.map(list => ({
            ...list,
            cards: list.cards.filter(card => card.id !== cardId)
          }))
        }))
      })),

      moveCard: (cardId, fromListId, toListId, toIndex) => set((state) => {
        const boards = JSON.parse(JSON.stringify(state.boards))
        let movedCard = null

        // Find and remove card from source list
        for (const board of boards) {
          for (const list of board.lists) {
            if (list.id === fromListId) {
              const cardIndex = list.cards.findIndex(c => c.id === cardId)
              if (cardIndex !== -1) {
                ;[movedCard] = list.cards.splice(cardIndex, 1)
                break
              }
            }
          }
          if (movedCard) break
        }

        // Add card to destination list
        if (movedCard) {
          for (const board of boards) {
            for (const list of board.lists) {
              if (list.id === toListId) {
                list.cards.splice(toIndex, 0, movedCard)
                break
              }
            }
          }
        }

        return { boards }
      }),

      // Helpers
      setCurrentBoard: (boardId) => set({ currentBoardId: boardId }),

      getCurrentBoard: () => {
        const state = get()
        return state.boards.find(b => b.id === state.currentBoardId)
      },

      // Initialize with sample board
      initializeSampleBoard: () => {
        const sampleBoardId = uuidv4()
        const todoListId = uuidv4()
        const inProgressListId = uuidv4()
        const doneListId = uuidv4()

        set({
          boards: [{
            id: sampleBoardId,
            title: 'Sample Project',
            color: '#3b82f6',
            lists: [
              {
                id: todoListId,
                title: 'To Do',
                cards: [
                  {
                    id: uuidv4(),
                    title: 'Welcome to TaskBoard!',
                    description: 'This is a sample card. Click to edit or drag to move.',
                    labels: [{ id: 1, name: 'Info', color: 'blue' }],
                    dueDate: null,
                    checklist: [],
                    comments: []
                  },
                  {
                    id: uuidv4(),
                    title: 'Create your first card',
                    description: '',
                    labels: [{ id: 2, name: 'Task', color: 'green' }],
                    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                    checklist: [
                      { id: 1, text: 'Click "Add a card"', completed: false },
                      { id: 2, text: 'Enter card title', completed: false },
                      { id: 3, text: 'Add details', completed: false }
                    ],
                    comments: []
                  }
                ]
              },
              {
                id: inProgressListId,
                title: 'In Progress',
                cards: [
                  {
                    id: uuidv4(),
                    title: 'Drag cards between lists',
                    description: 'Try dragging this card to another list!',
                    labels: [{ id: 3, name: 'Feature', color: 'purple' }],
                    dueDate: null,
                    checklist: [],
                    comments: []
                  }
                ]
              },
              {
                id: doneListId,
                title: 'Done',
                cards: []
              }
            ],
            createdAt: new Date().toISOString()
          }],
          currentBoardId: sampleBoardId
        })
      }
    }),
    {
      name: 'board-storage',
    }
  )
)

