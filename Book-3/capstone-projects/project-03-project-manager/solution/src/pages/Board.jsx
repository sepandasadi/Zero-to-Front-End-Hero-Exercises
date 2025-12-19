import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { DndContext, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useBoardStore } from '../store/boardStore'
import List from '../components/list/List'
import Card from '../components/card/Card'
import { FaPlus, FaTimes, FaArrowLeft } from 'react-icons/fa'

function Board() {
  const { boardId } = useParams()
  const navigate = useNavigate()
  const [isAddingList, setIsAddingList] = useState(false)
  const [newListTitle, setNewListTitle] = useState('')
  const [activeCard, setActiveCard] = useState(null)

  const board = useBoardStore((state) =>
    state.boards.find(b => b.id === boardId)
  )
  const addList = useBoardStore((state) => state.addList)
  const moveCard = useBoardStore((state) => state.moveCard)
  const setCurrentBoard = useBoardStore((state) => state.setCurrentBoard)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  useEffect(() => {
    if (boardId) {
      setCurrentBoard(boardId)
    }
  }, [boardId, setCurrentBoard])

  if (!board) {
    return (
      <div className="p-8 text-center">
        <p className="text-xl mb-4">Board not found</p>
        <button
          onClick={() => navigate('/')}
          className="text-blue-600 hover:underline"
        >
          Go back to boards
        </button>
      </div>
    )
  }

  const handleAddList = () => {
    if (newListTitle.trim()) {
      addList(boardId, { title: newListTitle.trim() })
      setNewListTitle('')
      setIsAddingList(false)
    }
  }

  const handleDragStart = (event) => {
    const { active } = event
    const card = board.lists
      .flatMap(list => list.cards)
      .find(c => c.id === active.id)
    setActiveCard(card)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    setActiveCard(null)

    if (!over) return

    const activeCardId = active.id
    const overId = over.id

    // Find source list
    let sourceListId = null
    for (const list of board.lists) {
      if (list.cards.some(c => c.id === activeCardId)) {
        sourceListId = list.id
        break
      }
    }

    // Determine destination list
    let destListId = overId
    let destIndex = 0

    // Check if dropped on a list
    const destList = board.lists.find(l => l.id === overId)
    if (destList) {
      destIndex = destList.cards.length
    } else {
      // Dropped on a card, find its list and index
      for (const list of board.lists) {
        const cardIndex = list.cards.findIndex(c => c.id === overId)
        if (cardIndex !== -1) {
          destListId = list.id
          destIndex = cardIndex
          break
        }
      }
    }

    if (sourceListId && destListId) {
      moveCard(activeCardId, sourceListId, destListId, destIndex)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="h-screen bg-blue-50 flex flex-col">
        {/* Board Header */}
        <div className="p-4 bg-white bg-opacity-90 shadow-sm">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-gray-100 rounded transition"
            >
              <FaArrowLeft />
            </button>
            <h2 className="text-2xl font-bold" style={{ color: board.color }}>
              {board.title}
            </h2>
          </div>
        </div>

        {/* Lists Container */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden p-4">
          <div className="flex space-x-4 h-full">
            {board.lists.map((list) => (
              <List key={list.id} list={list} />
            ))}

            {/* Add List */}
            {isAddingList ? (
              <div className="bg-gray-100 rounded-lg p-3 min-w-[280px] max-w-[280px]">
                <input
                  type="text"
                  value={newListTitle}
                  onChange={(e) => setNewListTitle(e.target.value)}
                  placeholder="Enter list title..."
                  className="w-full p-2 border rounded mb-2"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddList()
                    if (e.key === 'Escape') {
                      setIsAddingList(false)
                      setNewListTitle('')
                    }
                  }}
                />
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleAddList}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => {
                      setIsAddingList(false)
                      setNewListTitle('')
                    }}
                    className="p-1 text-gray-600 hover:text-gray-800"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsAddingList(true)}
                className="bg-white bg-opacity-80 hover:bg-opacity-100 rounded-lg p-3 min-w-[280px] flex items-center space-x-2 text-gray-700 transition"
              >
                <FaPlus />
                <span>Add a list</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <DragOverlay>
        {activeCard ? (
          <div className="bg-white rounded-lg shadow-lg p-3 opacity-90 rotate-3">
            <h4 className="font-medium">{activeCard.title}</h4>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

export default Board

