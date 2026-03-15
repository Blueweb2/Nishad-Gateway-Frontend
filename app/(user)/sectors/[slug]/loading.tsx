'use client'

const loading = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex gap-2">
        <div className="w-3 h-3 bg-gray-600 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-gray-600 rounded-full animate-bounce [animation-delay:.2s]"></div>
        <div className="w-3 h-3 bg-gray-600 rounded-full animate-bounce [animation-delay:.4s]"></div>
      </div>
    </div>
  )
}

export default loading;