import { Link } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import { useBoardStore } from '../../store/boardStore'

function BoardCard({ board }) {
  const deleteBoard = useBoardStore((state) => state.deleteBoard)

  const handleDelete = (e) => {
    e.preventDefault()
    if (window.confirm(`Delete "${board.title}"?`)) {
      deleteBoard(board.id)
    }
  }

  const listCount = board.lists?.length || 0
  const cardCount = board.lists?.reduce((sum, list) => sum + (list.cards?.length || 0), 0) || 0

  return (
    <Link
      to={`/board/${board.id}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-xl transition p-6 relative group"
      style={{ borderTop: `4px solid ${board.color}` }}
    >
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 p-2 text-red-500 opacity-0 group-hover:opacity-100 transition hover:bg-red-50 rounded"
        aria-label="Delete board"
      >
        <FaTrash />
      </button>

      <h3 className="text-xl font-bold mb-2">{board.title}</h3>

      <div className="text-sm text-gray-600 space-y-1">
        <p>{listCount} {listCount === 1 ? 'list' : 'lists'}</p>
        <p>{cardCount} {cardCount === 1 ? 'card' : 'cards'}</p>
      </div>
    </Link>
  )
}

export default BoardCard

