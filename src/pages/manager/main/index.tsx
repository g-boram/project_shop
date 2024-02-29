import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'

import { storage, store } from '@/remote/firebase'
import { ref, uploadString, getDownloadURL, listAll } from 'firebase/storage'

import Button from '@/components/shared/Button'
import styled from '@emotion/styled'
import {
  doc,
  collection,
  updateDoc,
  DocumentData,
  getDocs,
} from 'firebase/firestore'
import { COLLECTIONS } from '@/constants'
import Flex from '@/components/shared/Flex'
import { css } from '@emotion/react'

export default function M_MainPage() {
  const [imgList, setImgList] = useState<DocumentData>() // 저장되어있는 모든 이미지
  const imgIndex = useRef(0)

  // *** 데이터베이스 이미지 가져오기
  useEffect(() => {
    getImgListAll()
  }, [])

  const getImgListAll = async () => {
    const docSnap = await getDocs(collection(store, `${COLLECTIONS.MAIN}`))

    const data = docSnap.docs.map((doc) => ({
      ...doc.data(),
      fileId: doc.id,
    }))
    setImgList(data)
  }

  // *** 이미지 박스 컴포넌트
  const ImageBox = ({ img, i }: any) => {
    const [currentImg, setCurrentImg] = useState<string>('') // 현재 선택한 이미지 미리보기
    const [uploadUrl, setUploadUrl] = useState<string>('') // 데이터베이스에 저장할 url
    const currentImgName = useRef('')

    // 선택한 이미지 url 생성시 데이터베이스에 저장 실행
    useEffect(() => {
      const upDateImg = async () => {
        const upDateRef = doc(store, `${COLLECTIONS.MAIN}`, img.fileId)
        await updateDoc(upDateRef, {
          ...img,
          url: uploadUrl,
        })
      }
      if (uploadUrl !== '') {
        upDateImg()
      }
    }, [uploadUrl])

    // *** 선택된 이미지 미리보기 생성 하기
    const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files

      if (!files) return
      const theFile = files[0]
      currentImgName.current = files[0].name

      const reader = new FileReader()
      reader.onloadend = (finishedEvent) => {
        // 업로드한 이미지 URL 저장
        const result = (finishedEvent.target as FileReader).result as string
        setCurrentImg(result)
      }
      if (!theFile) return
      reader.readAsDataURL(theFile)
    }

    // *** 이미지 데이터베이스에 업로드하기
    const imgUpload = async () => {
      const fileRef = ref(storage, `main/bannerImg/${currentImgName.current}`)
      const upload = await uploadString(fileRef, currentImg, 'data_url')
      const url = await getDownloadURL(upload.ref)
      setUploadUrl(url)
    }
    const resetImg = () => {
      setCurrentImg(img.url)
    }
    return (
      <div>
        {img.url && (
          <>
            <img
              src={img.fileId === imgIndex.current ? currentImg : img.url}
              alt="upload_img"
            />

            <Flex
              css={css`
                height: 50px;
                justify-content: space-between;
              `}
            >
              <label
                key={i}
                css={labelStyle}
                htmlFor={`input${img.id}`}
                onClick={() => (imgIndex.current = img.fileId)}
              >
                이미지 변경하기
              </label>
              {currentImg !== '' && currentImg !== img.url ? (
                <>
                  <Button onClick={resetImg}>되돌리기</Button>
                  <Button onClick={imgUpload}>이미지 업로드하기</Button>
                </>
              ) : null}
            </Flex>

            <input
              type="file"
              id={`input${img.id}`}
              key={img.id}
              onChange={handleUploadFile}
            />
          </>
        )}
      </div>
    )
  }
  return (
    <>
      <TopTitle>Manager Main Page</TopTitle>
      *** 저장된 이미지 ***
      <ImgListContianer>
        {imgList
          ? imgList.map((img: any, i: any) => {
              return <ImageBox img={img} i={i} key={`BoxComponent${i}`} />
            })
          : ''}
      </ImgListContianer>
    </>
  )
}

const TopTitle = styled.div`
  height: 50px;
  width: 100%;
  margin-bottom: 30px;
  background-color: pink;
`
const ImgListContianer = styled.div`
  display: flex;
  height: 400px;
  width: 100%;
  overflow: scroll;
  & > div {
    padding: 10px;
    background-color: pink;
  }
  & > div > img {
    width: 300px;
    height: 200px;
  }

  & > div > input {
    display: none;
  }
`
const labelStyle = css`
  cursor: pointer;
  text-aling: center;
  background-color: blue;
  color: white;
  padding: 6%;
  font-size: 14px;
  border-radius: 5px;
`
