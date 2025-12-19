import { useState } from 'react'
import { FaTimes, FaTrash } from 'react-icons/fa'
import { useBoardStore } from '../../store/boardStore'
import ReactMarkdown from 'react-markdown'

function CardModal({ card, listId, onClose }) {
  const [editedCard, setEditedCard] = useState({ ...card })
  const updateCard = useBoardStore((state) => state.updateCard)
  const deleteCard = useBoardStore((state) => state.deleteCard)

  const handleSave = () => {
    updateCard(card.id, editedCard)
    onClose()
  }

  const handleDelete = () => {
    if (window.confirm('Delete this card?')) {
      deleteCard(card.id)
      onClose()
    }
  }

  const toggleChecklistItem = (itemId) => {
    const updatedChecklist = editedCard.checklist.map(item =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    )
    setEditedCard({ ...editedCard, checklist: updatedChecklist })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <input
              type="text"
              value={editedCard.title}
              onChange={(e) => setEditedCard({ ...editedCard, title: e.target.value })}
              className="text-2xl font-bold flex-1 border-b-2 border-transparent hover:border-gray-300 focus:border-blue-500 outline-none px-2 py-1"
            />
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Description</h3>
            <textarea
              value={editedCard.description || ''}
              onChange={(e) => setEditedCard({ ...editedCard, description: e.target.value })}
              placeholder="Add a more detailed description..."
              className="w-full border rounded p-3 min-h-[120px] resize-vertical"
            />
            {editedCard.description && (
              <div className="mt-2 p-3 bg-gray-50 rounded prose prose-sm max-w-none">
                <ReactMarkdown>{editedCard.description}</ReactMarkdown>
              </div>
            )}
          </div>

          {/* Due Date */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Due Date</h3>
            <input
              type="date"
              value={editedCard.dueDate ? new Date(editedCard.dueDate).toISOString().split('T')[0] : ''}
              onChange={(e) => setEditedCard({
                ...editedCard,
                dueDate: e.target.value ? new Date(e.target.value).toISOString() : null
              })}
              className="border rounded px-3 py-2"
            />
          </div>

          {/* Checklist */}
          {editedCard.checklist && editedCard.checklist.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Checklist</h3>
              <div className="space-y-2">
                {editedCard.checklist.map((item) => (
                  <label key={item.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleChecklistItem(item.id)}
                      className="w-4 h-4"
                    />
                    <span className={item.completed ? 'line-through text-gray-500' : ''}>
                      {item.text}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-6 border-t">
            <button
              onClick={handleDelete}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded transition"
            >
              <FaTrash />
              <span>Delete Card</span>
            </button>

            <div className="flex space-x-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardModal

