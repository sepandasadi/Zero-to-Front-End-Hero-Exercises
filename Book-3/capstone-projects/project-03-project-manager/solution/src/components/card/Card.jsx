import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { FaClock, FaCheckSquare } from 'react-icons/fa'
import { format, isPast } from 'date-fns'
import { useState } from 'react'
import CardModal from './CardModal'

function Card({ card, listId }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const completedTasks = card.checklist?.filter(item => item.completed).length || 0
  const totalTasks = card.checklist?.length || 0
  const hasChecklist = totalTasks > 0

  const isDue = card.dueDate && isPast(new Date(card.dueDate))

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={() => setIsModalOpen(true)}
        className="bg-white rounded-lg shadow-sm p-3 cursor-pointer hover:shadow-md transition"
      >
        {card.labels && card.labels.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {card.labels.map((label) => (
              <span
                key={label.id}
                className={`px-2 py-1 rounded text-xs font-semibold bg-${label.color}-100 text-${label.color}-700`}
              >
                {label.name}
              </span>
            ))}
          </div>
        )}

        <h4 className="font-medium text-gray-800 mb-2">{card.title}</h4>

        <div className="flex items-center space-x-3 text-xs text-gray-600">
          {card.dueDate && (
            <div className={`flex items-center space-x-1 ${isDue ? 'text-red-600' : ''}`}>
              <FaClock />
              <span>{format(new Date(card.dueDate), 'MMM d')}</span>
            </div>
          )}

          {hasChecklist && (
            <div className="flex items-center space-x-1">
              <FaCheckSquare />
              <span>{completedTasks}/{totalTasks}</span>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <CardModal
          card={card}
          listId={listId}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  )
}

export default Card

