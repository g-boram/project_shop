import { newImg } from '@/models/managerMain'
import { storage } from '@/remote/firebase'
import { ref, uploadString, getDownloadURL, listAll } from 'firebase/storage'

// 이미지 저장소 Storage

// 메인배너 이미지 저장 & 저장된 이미지 url 구하기
export const imgUploadAndUrl = async (current: newImg) => {
  const fileRef = ref(storage, `main/bannerImg/${current.name}`)
  const upload = await uploadString(fileRef, current.img, 'data_url')
  const url = await getDownloadURL(upload.ref)

  return url
}
// 화장품 이미지 저장 & 저장된 이미지 url 구하기
export const cosmeticImgUploadAndUrl = async (current: newImg) => {
  const fileRef = ref(storage, `main/cosmetic/${current.name}`)
  const upload = await uploadString(fileRef, current.img, 'data_url')
  const url = await getDownloadURL(upload.ref)

  return url
}

// 메인 아이콘
export const getMainIconsUrl = async () => {
  const fileRef = ref(storage, `main/categoryIcons`)
  const result = await listAll(fileRef)
  const urls = await Promise.all(
    result.items.map(async (item) => {
      const url = await getDownloadURL(item)
      return url
    }),
  )

  return urls
}
