import { useEffect, useState } from 'react'
import { Product } from '../Types/types'

function InventoryAdd() {
  const [products, setProducts] = useState<Product[]>([])
  const [filterDate, setFilterDate] = useState<string>('')

  const API_URL = 'http://localhost:3000/'

  useEffect(() => {
    fetch(`${API_URL}products/active`)
      .then(response => response.json())
      .then(data => setProducts(data.data))
      .catch(error => console.error('Error fetching products:', error))
  }, [setProducts])

  const getColorForExpiration = (daysRemaining: number) => {
    if (daysRemaining <= 0) return 'bg-red-500 text-white'
    if (daysRemaining <= 3) return 'bg-orange-500 text-white'
    return 'bg-green-500 text-white'
  }

  const filterProductsByDate = (products: Product[], filterDate: string) => {
    if (!filterDate) return products
    return products.filter(product => {
      return product.inventory.some(inventoryItem =>
        inventoryItem.expiredAt.includes(filterDate)
      )
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return (
      date.getFullYear() +
      '-' +
      String(date.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(date.getDate()).padStart(2, '0')
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Productos Activos
      </h2>
      <div className="mb-4">
        <label htmlFor="filter-date" className="text-gray-600 mr-2">
          Filtrar por fecha de vencimiento:
        </label>
        <input
          id="filter-date"
          type="date"
          value={filterDate}
          onChange={e => setFilterDate(e.target.value)}
          className="border rounded-md p-2"
          min={new Date().toISOString().split('T')[0]}
        />
      </div>

      <ul className="space-y-4">
        {filterProductsByDate(products, filterDate).map(product => {
          return (
            <li key={product.id} className="p-4 bg-gray-100 rounded-md">
              <h3 className="font-semibold text-lg text-gray-800">
                {product.name}
              </h3>
              <p className="text-gray-600">Estado: {product.status}</p>
              <ul className="mt-4 space-y-2">
                {product.inventory.map(inventoryItem => {
                  const expirationDate = new Date(inventoryItem.expiredAt)
                  const daysRemaining = Math.ceil(
                    (expirationDate.getTime() - new Date().getTime()) /
                      (1000 * 3600 * 24)
                  )
                  const color = getColorForExpiration(daysRemaining)

                  return (
                    <li
                      key={inventoryItem.id}
                      className={`p-2 rounded-md ${color}`}
                    >
                      Fecha de vencimiento:{' '}
                      {formatDate(inventoryItem.expiredAt)} - Stock:{' '}
                      {inventoryItem.value}
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default InventoryAdd
