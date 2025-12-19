import { useState, useEffect } from 'react'
import { useBoardStore } from '../store/boardStore'
import BoardCard from '../components/board/BoardCard'
import { FaPlus, FaTimes } from 'react-icons/fa'

function BoardList() {
  const boards = useBoardStore((state) => state.boards)
  const addBoard = useBoardStore((state) => state.addBoard)
  const initializeSampleBoard = useBoardStore((state) => state.initializeSampleBoard)
  const [isCreating, setIsCreating] = useState(false)
  const [newBoardTitle, setNewBoardTitle] = useState('')
  const [newBoardColor, setNewBoardColor] = useState('#3b82f6')

  useEffect(() => {
    // Initialize with sample board if no boards exist
    if (boards.length === 0) {
      initializeSampleBoard()
    }
  }, [boards.length, initializeSampleBoard])

  const handleCreateBoard = () => {
    if (newBoardTitle.trim()) {
      addBoard({
        title: newBoardTitle.trim(),
        color: newBoardColor
      })
      setNewBoardTitle('')
      setNewBoardColor('#3b82f6')
      setIsCreating(false)
    }
  }

  const colorOptions = [
    '#3b82f6', // blue
    '#10b981', // green
    '#f59e0b', // yellow
    '#ef4444', // red
    '#8b5cf6', // purple
    '#ec4899', // pink
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Boards</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map((board) => (
          <BoardCard key={board.id} board={board} />
        ))}

        {/* Create Board Card */}
        {isCreating ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Create Board</h3>
              <button
                onClick={() => {
                  setIsCreating(false)
                  setNewBoardTitle('')
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>

            <input
              type="text"
              value={newBoardTitle}
              onChange={(e) => setNewBoardTitle(e.target.value)}
              placeholder="Board title..."
              className="w-full border rounded p-2 mb-3"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCreateBoard()
                if (e.key === 'Escape') setIsCreating(false)
              }}
            />

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Color</label>
              <div className="flex space-x-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    onClick={() => setNewBoardColor(color)}
                    className={`w-8 h-8 rounded ${
                      newBoardColor === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={handleCreateBoard}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Create Board
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsCreating(true)}
            className="bg-gray-100 hover:bg-gray-200 rounded-lg p-6 flex flex-col items-center justify-center text-gray-600 transition min-h-[150px]"
          >
            <FaPlus size={32} className="mb-2" />
            <span className="font-semibold">Create new board</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default BoardList

