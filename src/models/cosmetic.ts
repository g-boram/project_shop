export interface Cosmetic {
  id?: string | undefined
  name: string | undefined
  brand_name: string
  price: number | string
  salePercent: number | string
  desc: string
  comment: string
  color?: string[]
  type: string
  volume: string
  scent: string
  rating: number
  like?: number
  url?: string
  count: number | string
  reviews?: string[]
  totalSale: number | string
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

export interface CosmeticImg {
  name: string
  fileName: string
  uploadAt?: Date
  url: string
}
