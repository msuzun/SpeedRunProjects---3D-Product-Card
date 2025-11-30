import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          3D Product Card
        </h1>
        <p className="text-gray-600 mb-8">
          Frontend setup complete! Ready for 3D integration.
        </p>
        <button
          onClick={() => setCount((count) => count + 1)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Count is {count}
        </button>
      </div>
    </div>
  )
}

export default App

