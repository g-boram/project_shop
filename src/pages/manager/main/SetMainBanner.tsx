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
import HeadTitle from '@/components/shared/HeadTitle'
import { FadeLoader } from 'react-spinners'
import ManagerPageLayout from '@/components/shared/Layout/ManagerPageLayout'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import { useMainBanner } from '@/hooks/data/useMainData'

export default function SetMainBanner() {
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
  // 데이터베이스 이미지데이터 가져오기
  const { isLoading, isError, error, data, refetch } = useMainBanner()

  if (isError) {
    console.log('data Error', error)
  }

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
          {isLoading ? (
            <FadeLoader color="#f0d9da" />
          ) : (
            <img src={img.url} alt="upload_img" />
          )}
        </ImgWrapper>
        <Flex justify="center">
          <Button color="error" size="medium" onClick={deleteFn}>
            삭제하기
          </Button>
        </Flex>
      </div>
    )
  }

  return (
    <ManagerPageLayout>
      <HeadTitle title={'Main Banner'} />
      <ImgListContianer>
        {data
          ? data.map((img: any, i: any) => {
              return <BannerImgBox img={img} i={i} key={`mainBanner${i}`} />
            })
          : ''}
      </ImgListContianer>
      <NewImgContianer>
        <NewImgWrapper>
          {currentImg?.img !== '' ? <img src={currentImg?.img} alt="" /> : null}
        </NewImgWrapper>
        <NewImgBtnWrapper>
          <Flex>
            <div css={currentName}>
              {currentImg?.name !== '' ? currentImg?.name : ''}
            </div>
            <label key="newImg" css={labelStyle} htmlFor={`new`}>
              이미지 선택
            </label>
            <Button onClick={getImgUrl}>이미지 스토리지저장</Button>
          </Flex>
          <Spacing size={10} />
          <Flex>
            <Button full size="medium" onClick={newUpload}>
              Upload
            </Button>
          </Flex>
          <input
            key="newImg"
            type="file"
            id={`new`}
            onChange={handleUploadFile}
          />
          <NewImgDescBox>
            <Text
              typography="t7"
              display="block"
              style={{ marginTop: 10, marginBottom: 6 }}
            >
              * 이미지 업로드 양식 1
            </Text>
            <Text
              typography="t7"
              display="block"
              style={{ marginTop: 10, marginBottom: 6 }}
            >
              * 이미지 업로드 양식 2
            </Text>
            <Text
              typography="t7"
              display="block"
              style={{ marginTop: 10, marginBottom: 6 }}
            >
              * 이미지 업로드 양식 3
            </Text>
          </NewImgDescBox>
        </NewImgBtnWrapper>
      </NewImgContianer>
    </ManagerPageLayout>
  )
}

// 기존 배너이미지 영역
const ImgListContianer = styled.div`
  display: flex;
  height: 380px;
  width: 100%;
  overflow: scroll;
  background-color: #f0d9da;

  & > div {
    padding: 5px;
  }
`
const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 450px;
  height: 300px;
  background-color: #fefefe;
  margin-bottom: 10px;

  & img {
    width: 100%;
    height: 300px;
    object-fit: contain;
  }
`
// 업로드할 이미지 영역
const NewImgContianer = styled.div`
  height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0d9da;
  padding: 10px;
  display: flex;
`

const NewImgWrapper = styled.div`
  width: 450px;
  height: 300px;
  margin-right: 10px;
  background-color: #fefefe;
  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`
const NewImgBtnWrapper = styled.div`
  height: auto;
  & input {
    display: none;
  }
`
const NewImgDescBox = styled.div`
  background-color: white;
  height: 180px;
  margin-top: 20px;
  padding: 10px;
`

const labelStyle = css`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  font-size: 13px;
  width: 120px;
  margin-left: 10px;
  background-color: blue;
  color: white;
  border-radius: 5px;
  font-weight: bold;
`
const currentName = css`
  height: 35px;
  padding: 4px;
  width: 300px;
  border-radius: 5px;
  display: flex;
  padding: 0px 10px;
  align-items: center;
  background-color: white;
`
