import { useParams } from 'react-router-dom'
import { useBoardStore } from '../store/boardStore'

function Board() {
  const { boardId } = useParams()
  const board = useBoardStore((state) =>
    state.boards.find(b => b.id === boardId)
  )

  if (!board) {
    return <div className="p-8">Board not found</div>
  }

  // TODO: Implement drag and drop
  // TODO: Display all lists
  // TODO: Display all cards
  // TODO: Add new list button

  return (
    <div className="h-screen bg-blue-50 p-4">
      <h2 className="text-2xl font-bold mb-4">{board.title}</h2>

      <div className="flex space-x-4 overflow-x-auto pb-4">
        {/* Lists will go here */}
        <div className="text-gray-500">
          No lists yet. Add your first list!
        </div>
      </div>
    </div>
  )
}

export default Board

