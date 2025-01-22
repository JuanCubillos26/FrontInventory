import AddProduct from './Components/AddProduct'
import InventoryAdd from './Components/InventoryAdd'
import ProductsList from './Components/ProductsList'

function App() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <div className="col-span-1">
        <AddProduct />
      </div>
      <div className="col-span-1">
        <ProductsList />
      </div>
      <div className="col-span-1">
        <InventoryAdd />
      </div>
    </div>
  )
}

export default App
