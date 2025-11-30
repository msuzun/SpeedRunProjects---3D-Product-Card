import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import SneakerModel from './components/SneakerModel'
import { Provider } from 'react-redux'
import { store } from './store/store'

function App() {
  return (
    <Provider store={store}>
      <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
        <div className="relative w-full max-w-4xl h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

          {/* 3D Canvas Section */}
          <div className="w-full md:w-1/2 h-full bg-gray-50 relative">
            <Canvas
              shadows
              camera={{ position: [0, 0, 4], fov: 45 }}
              className="w-full h-full"
            >
              <Suspense fallback={null}>
                <SneakerModel />
                <OrbitControls enableZoom={false} enableRotate={false} />
              </Suspense>
            </Canvas>

            {/* Loading Overlay (optional, can be connected to Redux state) */}
            <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
              <span className="text-sm text-gray-400 font-medium tracking-wider">DRAG TO ROTATE</span>
            </div>
          </div>

          {/* Product Details Section (Placeholder) */}
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
            <div className="mb-4">
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">NEW ARRIVAL</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Nike Air Max</h1>
            <p className="text-gray-500 mb-6">
              Experience the ultimate comfort and style with our latest collection.
              Designed for performance and built for the streets.
            </p>

            <div className="flex items-center justify-between mb-8">
              <span className="text-3xl font-bold text-gray-900">$129.00</span>
              <div className="flex space-x-2">
                {/* Size selector placeholders */}
                {[7, 8, 9, 10, 11].map((size) => (
                  <button key={size} className="w-10 h-10 rounded-full border border-gray-300 hover:border-black flex items-center justify-center text-sm font-medium transition-colors">
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-transform active:scale-95">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Provider>
  )
}

export default App

