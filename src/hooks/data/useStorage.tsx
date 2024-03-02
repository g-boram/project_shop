import { newImg } from '@/models/managerMain'
import { storage } from '@/remote/firebase'
import { ref, uploadString, getDownloadURL } from 'firebase/storage'

// 이미지 저장소 Storage

// 이미지 저장 & 저장된 이미지 url 구하기
export const imgUploadAndUrl = async (current: newImg) => {
  const fileRef = ref(storage, `main/bannerImg/${current.name}`)
  const upload = await uploadString(fileRef, current.img, 'data_url')
  const url = await getDownloadURL(upload.ref)

  return url
}
