import { Cosmetic } from '@/models/cosmetic'
import styled from '@emotion/styled'
import Flex from '../shared/Flex'
import { Review } from './Review'

const MobileDetailCosmeticInfo = ({
  data,
  moveInfo,
}: {
  data: Cosmetic | null
  moveInfo: number
}) => {
  console.log('MobileDetailCosmeticInfo', data)

  const moveNumberPage = () => {
    if (moveInfo === 0) {
      return infoBox()
    }
    if (moveInfo === 1) {
      return detailBox()
    }
    if (moveInfo === 2) {
      return reviewBox()
    }
  }

  // 제품정보 이미지
  const infoBox = () => {
    return (
      <InfoContentBox>
        <ImgWrapper>
          {data?.contentUrl ? (
            <img src={data?.contentUrl} alt="contentImg" />
          ) : (
            <></>
          )}
        </ImgWrapper>
      </InfoContentBox>
    )
  }

  // 상세정보
  const detailBox = () => {
    return (
      <DetailInfoBox>
        <TextWrapper>
          <GridTitle>타입</GridTitle>
          <GridContent>{data?.type}</GridContent>
          <GridTitle>제품 향</GridTitle>
          <GridContent>{data?.scent}</GridContent>
          <GridTitle>제품 용량</GridTitle>
          <GridContent>{data?.volume}</GridContent>
          <GridTitle>잔여 수량</GridTitle>
          <GridContent>{data?.count} 개</GridContent>
        </TextWrapper>
      </DetailInfoBox>
    )
  }
  const reviewBox = () => {
    return (
      <>{data?.id !== undefined ? <Review cosmeticId={data.id} /> : <></>}</>
    )
  }

  return <>{moveNumberPage()}</>
}

const DetailInfoBox = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const TextWrapper = styled.div`
  display: grid;
  width: 90%;
  background-color: white;
  align-items: center;
  grid-auto-rows: 50px;
  grid-template-columns: 30% 70%;
  border: 1px solid #eee;
`

const GridTitle = styled.div`
  text-align: center;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`
const GridContent = styled.div`
  padding-left: 10px;
`

const InfoContentBox = styled.div`
  width: 100vw;
`
const ImgWrapper = styled.div`
  width: 100%;

  & img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`
export default MobileDetailCosmeticInfo
