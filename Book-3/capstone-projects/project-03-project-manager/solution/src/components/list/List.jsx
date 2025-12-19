import { useState } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import Card from '../card/Card'
import { useBoardStore } from '../../store/boardStore'
import { FaPlus, FaTimes, FaTrash } from 'react-icons/fa'

function List({ list }) {
  const [isAddingCard, setIsAddingCard] = useState(false)
  const [newCardTitle, setNewCardTitle] = useState('')
  const addCard = useBoardStore((state) => state.addCard)
  const deleteList = useBoardStore((state) => state.deleteList)

  const { setNodeRef } = useDroppable({
    id: list.id,
  })

  const handleAddCard = () => {
    if (newCardTitle.trim()) {
      addCard(list.id, { title: newCardTitle.trim() })
      setNewCardTitle('')
      setIsAddingCard(false)
    }
  }

  const handleDeleteList = () => {
    if (window.confirm(`Delete list "${list.title}"?`)) {
      deleteList(list.id)
    }
  }

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-100 rounded-lg p-3 min-w-[280px] max-w-[280px] flex flex-col max-h-full"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">{list.title}</h3>
        <button
          onClick={handleDeleteList}
          className="p-1 text-gray-500 hover:text-red-500 transition"
          aria-label="Delete list"
        >
          <FaTrash size={14} />
        </button>
      </div>

      <SortableContext
        items={list.cards.map(c => c.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2 flex-1 overflow-y-auto mb-2">
          {list.cards.map((card) => (
            <Card key={card.id} card={card} listId={list.id} />
          ))}
        </div>
      </SortableContext>

      {isAddingCard ? (
        <div className="mt-2">
          <textarea
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            placeholder="Enter card title..."
            className="w-full p-2 border rounded resize-none"
            rows={3}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleAddCard()
              } else if (e.key === 'Escape') {
                setIsAddingCard(false)
                setNewCardTitle('')
              }
            }}
          />
          <div className="flex items-center space-x-2 mt-2">
            <button
              onClick={handleAddCard}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add
            </button>
            <button
              onClick={() => {
                setIsAddingCard(false)
                setNewCardTitle('')
              }}
              className="p-1 text-gray-600 hover:text-gray-800"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAddingCard(true)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded p-2 transition"
        >
          <FaPlus size={14} />
          <span>Add a card</span>
        </button>
      )}
    </div>
  )
}

export default List

