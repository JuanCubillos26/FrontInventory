export interface Product {
  id: number
  name: string
  description: string
  status: string
  stock: number
  inventory: {
    id: number
    type: string
    value: number
    expiredAt: string
  }[]
}

export interface Product {
  id: number
  name: string
  description: string
  stock: number
  status: string
}

export interface Inventory {
  productId: number
  value: number
  expiredAt: string
}
