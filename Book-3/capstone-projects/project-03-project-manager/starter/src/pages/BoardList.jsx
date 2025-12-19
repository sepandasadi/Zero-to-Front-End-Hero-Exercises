import { useBoardStore } from '../store/boardStore'

function BoardList() {
  const boards = useBoardStore((state) => state.boards)

  // TODO: Display all boards
  // TODO: Add create board button
  // TODO: Navigate to board on click

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Boards</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Board cards will go here */}
        <div className="text-center text-gray-500 py-12">
          No boards yet. Create your first board!
        </div>
      </div>
    </div>
  )
}

export default BoardList

