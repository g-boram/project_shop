export interface OrderProps {
  userID: string | undefined
  orderID?: string | undefined
  userEmail: string | undefined
  orderDate: string | undefined
  orderTime?: string | null
  orderAmount?: string | undefined
  orderStatus?: string | undefined
  orderItem?: {
    brand: string | undefined
    buyItem: string[]
    category: string | undefined
    desc: string | undefined
    id: string | undefined
    imageURL?: string | undefined
    name: string | undefined
    price: string | undefined
    salePercent: string | undefined
    totalSale: string | number | undefined
  }
  shippingAdd?: {
    city: string
    line: string
    name: string
    postalCode: string
  }
  billingAdd?: {
    city: string
    line: string
    name: string
    postalCode: string
  }
  createdAt?: string | undefined
}
