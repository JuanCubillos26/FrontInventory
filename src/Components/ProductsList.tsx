import { useEffect, useState } from 'react'
import { Inventory, Product } from '../Types/types'

function ProductsList() {
  const [products, setProducts] = useState<Product[]>([])
  const [inventory, setInventory] = useState<Inventory>({
    productId: 0,
    value: 0,
    expiredAt: '',
  })

  const API_URL = 'http://localhost:3000/'

  useEffect(() => {
    fetch(`${API_URL}products`)
      .then(response => response.json())
      .then(data => setProducts(data.data))
  }, [])

  const addToInventory = (e: React.FormEvent) => {
    e.preventDefault()

    const selectedProduct = products.find(p => p.id === inventory.productId)

    if (!selectedProduct) {
      return
    }

    if (selectedProduct.stock > 0 || inventory.value >= 0) {
      fetch(`${API_URL}inventory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inventory),
      })
        .then(() => {
          setProducts(product =>
            product.map(product =>
              product.id === inventory.productId
                ? { ...product, stock: product.stock + inventory.value }
                : product
            )
          )
          setInventory({
            productId: 0,
            value: 0,
            expiredAt: '',
          })
        })
        .catch(error => console.error('Error updating inventory:', error))
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Seleccione el producto creado
      </h3>
      <form onSubmit={addToInventory} className="space-y-4">
        <div>
          <label className="block text-gray-700">Producto:</label>
          <select
            value={inventory.productId}
            onChange={e =>
              setInventory({
                ...inventory,
                productId: parseInt(e.target.value, 10),
              })
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="0">Seleccione el producto creado</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Fecha de vencimiento:</label>
          <input
            type="date"
            value={inventory.expiredAt}
            min={new Date().toISOString().split('T')[0]}
            onChange={e =>
              setInventory({
                ...inventory,
                expiredAt: e.target.value,
              })
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700">Cantidad:</label>
          <input
            type="number"
            value={inventory.value}
            onChange={e =>
              setInventory({
                ...inventory,
                value: parseInt(e.target.value, 10),
              })
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Agregue o Elimine el producto al Inventario
        </button>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Gestión de Inventario
        </h2>
        <div className="mb-6">
          <ul className="space-y-4">
            {products.map(product => (
              <li key={product.id} className="p-4 bg-gray-100 rounded-md">
                <strong className="text-lg">{product.name}</strong>
                <p>Stock: {product.stock}</p>
              </li>
            ))}
          </ul>
        </div>
      </form>
    </div>
  )
}

export default ProductsList
