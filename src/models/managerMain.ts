export interface newImg {
  name: string
  img: string
}
export interface mainEventBanner {
  name: string
  fileName: string
  uploadAt?: Date
  url: string
  upload_ManagerId?: string
  upload_ManagerName?: string
}

export interface mainCategoryIcon {
  name?: string
  order?: number
  url?: string
}

export interface Icon {
  id: string
  url: string
  name: string
  order: number
}
