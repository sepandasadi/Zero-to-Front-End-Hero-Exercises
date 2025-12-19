function TypingIndicator({ users }) {
  if (!users || users.length === 0) return null

  return (
    <div className="flex items-center gap-2 text-gray-500 text-sm">
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
      <span>
        {users.length === 1
          ? `Someone is typing...`
          : `${users.length} people are typing...`}
      </span>
    </div>
  )
}

export default TypingIndicator

