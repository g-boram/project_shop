import Flex from '@/components/shared/Flex'
import Button from '@/components/shared/Button'
import styled from '@emotion/styled'
import useUser from '@/hooks/auth/useUser'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import ManagerHead from '@/components/shared/ManagerHead'
import ManagerPageLayout from '@/components/shared/Layout/ManagerPageLayout'
import { css } from '@emotion/react'
import { ChangeEvent, useState } from 'react'
import { useMutation } from 'react-query'
import { newImg } from '@/models/managerMain'
import { deleteMainBanner, upDateNewImg } from '@/hooks/data/useStore'
import { imgUploadAndUrl } from '@/hooks/data/useStorage'
import { FadeLoader } from 'react-spinners'
import { useMainBanner } from '@/hooks/data/useMainData'
import { useAlertContext } from '@/contexts/AlertContext'

export default function SetMainBanner() {
  const user = useUser()
  const { open } = useAlertContext()
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

    if (files !== null) {
      const theFile = files[0]
      const currentImgName = files[0]?.name

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
  }

  // 선택된 이미지 url 얻기
  const getImgUrl = async () => {
    if (!currentImg) return
    const getUrl = await imgUploadAndUrl(currentImg)
    setNewImgUrl(getUrl)
    open({
      title: '배너 이미지를 등록 하시겠습니까?',
      isCancle: true,
      onCancleClick: () => {},
      onButtonClick: () => {
        newUpload()
      },
    })
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
          <Button
            color="error"
            size="medium"
            onClick={() =>
              open({
                title: '이미지를 삭제 하시겠습니까?',
                isCancle: true,
                onCancleClick: () => {},
                onButtonClick: () => {
                  deleteFn()
                },
              })
            }
          >
            삭제하기
          </Button>
        </Flex>
      </div>
    )
  }

  return (
    <>
      <ManagerHead
        title={'Main Banner Setting'}
        desc={'메인 페이지 이벤트 배너 영역 이미지 추가 및 삭제'}
      />
      <ManagerPageLayout>
        <SettingContainer>
          <ImgListContianer>
            {data
              ? data.map((img: any, i: any) => {
                  return <BannerImgBox img={img} i={i} key={`mainBanner${i}`} />
                })
              : ''}
          </ImgListContianer>
          <NewImgContianer>
            <NewImgWrapper>
              {currentImg?.img !== null ? (
                <img src={currentImg?.img} alt="" />
              ) : (
                <></>
              )}
            </NewImgWrapper>
            <NewImgBtnWrapper>
              <Flex>
                <div css={currentName}>
                  {currentImg?.name !== '' ? currentImg?.name : ''}
                </div>
                <label key="newImg" css={labelStyle} htmlFor={`new`}>
                  이미지 선택
                </label>
              </Flex>
              <Spacing size={10} />
              <Flex>
                <Button full color="pink" size="large" onClick={getImgUrl}>
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
                  typography="t6"
                  display="block"
                  style={{ marginTop: 10, marginBottom: 6 }}
                >
                  * 업로드 가능한 이미지 사이즈는 000 x 000 입니다.
                </Text>
                <Text
                  typography="t6"
                  display="block"
                  style={{ marginTop: 10, marginBottom: 6 }}
                >
                  * 삭제 이미지 복구 필요시 담당자에게 문의해 주세요
                </Text>
                <Text
                  typography="t6"
                  display="block"
                  style={{ marginTop: 10, marginBottom: 6 }}
                >
                  * 배너 이미지는 5개 입니다. 추가 등록 희망시 담당자 회의 후
                  진행해 주세요
                </Text>
                <Text
                  typography="t6"
                  display="block"
                  style={{ marginTop: 10, marginBottom: 6 }}
                >
                  * 배너 이미지는 실시간 적용됩니다. 승인된 이미지만
                  진행해주세요
                </Text>
              </NewImgDescBox>
            </NewImgBtnWrapper>
          </NewImgContianer>
        </SettingContainer>
      </ManagerPageLayout>
    </>
  )
}

const SettingContainer = styled.div`
  overflow: scroll;
  padding: 20px;
  height: 800px;
`

// 기존 배너이미지 영역
const ImgListContianer = styled.div`
  display: flex;
  height: 400px;
  overflow: scroll;
`

const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 450px;
  height: 300px;
  padding: 10px;
  margin-bottom: 10px;

  & img {
    width: 100%;
    height: 300px;
    object-fit: contain;
  }
`
// 업로드할 이미지 영역
const NewImgContianer = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  display: flex;
`

const NewImgWrapper = styled.div`
  width: 450px;
  height: 300px;
  margin-right: 10px;
  background-color: #f8f8f8;

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
  box-shadow: 0px 0px 10px -2px #ffbdd2;
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
  background-color: #c0a3e3;
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
  border: 1px solid #bcbcbc;
`
