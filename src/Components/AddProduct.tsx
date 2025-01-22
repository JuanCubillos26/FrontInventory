import { useState } from 'react'

const API_URL = 'http://localhost:3000/'

function AddProduct() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState<string>('')
  const handleAddProduct = () => {
    if (!name || !description) {
      setError('Ambos campos (nombre y descripción) son obligatorios.')
      return
    }
    if (description.length <= 3) {
      setError('La descripción debe tener más de 3 caracteres.')
      return
    }
    setError('')

    fetch(`${API_URL}products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        description: description,
      }),
    })
      .then(() => {
        setName('')
        setDescription('')
      })
      .catch(error => {
        console.error('Error al agregar el producto:', error)
      })
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Agregar Producto
      </h2>
      <form onSubmit={handleAddProduct}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">
            Descripción
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Agregar Producto
        </button>
      </form>
    </div>
  )
}

export default AddProduct
