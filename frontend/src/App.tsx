import { Provider } from 'react-redux'
import { store } from './store/store'
import ProductCard from './components/ProductCard'

function App() {
  // Hardcoded ID for demo purposes
  const DEMO_PRODUCT_ID = "12345678-1234-1234-1234-123456789012";

  return (
    <Provider store={store}>
      <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <ProductCard productId={DEMO_PRODUCT_ID} />
      </div>
    </Provider>
  )
}

export default App
