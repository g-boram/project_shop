export interface Cosmetic {
  id?: string
  name: string
  brand_name: string
  price: number
  salePercent: number
  desc: string
  comment: string
  promoEndTime: string
  color: string[]
  type: string
  volume: string
  scent: string
  rating: number
  like: number
  count: number
  reviews: string[]
  totalSale: number
  category: string
  events?: {
    name: string
    promoEndTime?: string
    tagThemeStyle: {
      backgroundColor: string
      fontColor: string
    }
  }
}
