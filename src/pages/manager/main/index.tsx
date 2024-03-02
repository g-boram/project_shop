import Flex from '@/components/shared/Flex'
import Button from '@/components/shared/Button'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

import { ChangeEvent, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { newImg } from '@/models/managerMain'

import {
  deleteMainBanner,
  getMainEventBanner,
  upDateNewImg,
} from '@/hooks/data/useStore'
import { imgUploadAndUrl } from '@/hooks/data/useStorage'

import useUser from '@/hooks/auth/useUser'

export default function M_MainPage() {
  // @TODO --------------------------------------------
  // 1. 모달창 만들어서 getImgUrl -> newUpload합치기
  // 2. 데이터 로딩
  // 3. 기능 확인 알림창 ex) 삭제 하시겠습니까?

  const user = useUser()
  const [currentImg, setCurrentImg] = useState<newImg>()
  const [newImgUrl, setNewImgUrl] = useState<string>()

  const newData = {
    name: 'mainEventBanner',
    fileName: currentImg ? currentImg.name : '',
    uploadAt: new Date(),
    url: newImgUrl ? newImgUrl : '',
    upload_ManagerId: user?.uid,
    upload_ManagerName: user?.displayName,
  }
  // 데이터베이스 이미지데이터 가져오기
  const { isLoading, isError, data, refetch } = useQuery(
    'mainBannerList',
    getMainEventBanner,
  )

  // 선택된 이미지 미리보기 생성 하기
  const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (!files) return
    const theFile = files[0]
    const currentImgName = files[0].name

    const reader = new FileReader()
    reader.onloadend = (finishedEvent) => {
      // 업로드한 이미지 URL 저장
      const result = (finishedEvent.target as FileReader).result as string
      setCurrentImg({
        name: currentImgName,
        img: result,
      })
    }
    if (!theFile) return
    reader.readAsDataURL(theFile)
  }

  // 선택된 이미지 url 얻기
  const getImgUrl = async () => {
    if (!currentImg) return
    const getUrl = await imgUploadAndUrl(currentImg)
    setNewImgUrl(getUrl)
  }

  // 새로운 이미지 올리기
  const mutationUploadBanner = useMutation({
    mutationFn: () => upDateNewImg(newData),
    onSuccess: () => {
      console.log(`Update New Banner Success`)
      setCurrentImg({
        name: '',
        img: '',
      })
      refetch()
    },
    onError: (error) => {
      console.log(`Update New Banner Error ${error}`)
    },
  })
  const newUpload = () => {
    mutationUploadBanner.mutate()
  }

  // 이미지 박스 컴포넌트
  const BannerImgBox = ({ img, i }: any) => {
    // 데이터베이스 문서 삭제하기
    const mutationDeleteBanner = useMutation({
      mutationFn: () => deleteMainBanner(img.fileId),
      onSuccess: () => {
        console.log(`Delete Banner Success`)
        refetch()
      },
      onError: (error) => {
        console.log(`Delete Banner Error ${error}`)
      },
    })
    const deleteFn = () => {
      mutationDeleteBanner.mutate()
    }

    return (
      <div>
        <ImgWrapper>
          {img.url ? <img src={img.url} alt="upload_img" /> : null}
        </ImgWrapper>
        <Flex justify="center">
          <Button color="pink" size="medium" onClick={deleteFn}>
            삭제하기
          </Button>
        </Flex>
      </div>
    )
  }
  console.log('data', data)
  return (
    <>
      <TopTitle>Manager Main Page</TopTitle>
      <ImgListContianer>
        {data
          ? data.map((img: any, i: any) => {
              return <BannerImgBox img={img} i={i} key={`mainBanner${i}`} />
            })
          : ''}
      </ImgListContianer>
      <NewImgContianer>
        <NewImgWrapper>
          {currentImg?.img !== '' ? (
            <img src={currentImg?.img} alt="newImg" />
          ) : (
            ''
          )}
        </NewImgWrapper>
        <NewImgBtnWrapper>
          buttons
          <Flex>
            <label key="newImg" css={labelStyle} htmlFor={`new`}>
              이미지 선택하기
            </label>
            <Button onClick={getImgUrl}>이미지 스토리지저장</Button>
            <Button onClick={newUpload}>이미지 문서에 업로드하기</Button>
          </Flex>
          <Flex>{currentImg?.name}</Flex>
          <input
            key="newImg"
            type="file"
            id={`new`}
            onChange={handleUploadFile}
          />
        </NewImgBtnWrapper>
      </NewImgContianer>
    </>
  )
}

const TopTitle = styled.div`
  height: 50px;
  width: 100%;
  margin-bottom: 30px;
  background-color: pink;
`
// 기존 배너이미지 영역
const ImgListContianer = styled.div`
  display: flex;
  height: 400px;
  width: 100%;
  overflow: scroll;

  & > div {
    padding: 10px;
    background-color: pink;
  }
`
const ImgWrapper = styled.div`
  width: 500px;
  height: 300px;
  background-color: grey;
  margin-bottom: 10px;

  & img {
    width: 100%;
    height: 300px;
    object-fit: contain;
  }
`
// 업로드할 이미지 영역
const NewImgContianer = styled.div`
  width: 100%;
  height: 400px;
  margin-top: 10px;
  padding: 10px;
  background-color: yellow;
  display: flex;
`

const NewImgWrapper = styled.div`
  width: 500px;
  height: 300px;
  background-color: grey;
  & img {
    width: 100%;
    height: 300px;
    object-fit: contain;
  }
`
const NewImgBtnWrapper = styled.div`
  width: 100%;
  height: auto;
  background-color: green;
  & input {
    display: none;
  }
`

const labelStyle = css`
  cursor: pointer;
  background-color: blue;
  color: white;
  padding: 5%;
  font-size: 14px;
  border-radius: 5px;
`
