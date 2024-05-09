export interface Cosmetic {
  id?: string
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
  subUrl?: subImgInterface[]
  contentUrl?: string
  count: number | string
  reviews?: string[]
  totalSale: number | string
  category: string
  hashTags: string[]
  events?: {
    name: string
    promoEndTime?: string
    tagThemeStyle: {
      backgroundColor: string
      fontColor: string
    }
  }
}
export interface subImgInterface {
  name: string
  url: string
}
export interface contentImgInterface {
  img: string
  url: string
}
export interface CosmeticImg {
  name: string
  fileName: string
  uploadAt?: Date
  url: string
}
export interface Review {
  id: string
  text: string
  userId: string
  cosmeticId: string
  createdAt: Date
}
