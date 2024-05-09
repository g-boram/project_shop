import { Cosmetic } from '@/models/cosmetic'
import styled from '@emotion/styled'
import { Review } from './Review'

const DetailCosmeticInfo = ({
  data,
  moveInfo,
}: {
  data: Cosmetic | null
  moveInfo: number
}) => {
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
  const detailBox = () => {
    return (
      <DetailInfoBox>
        <TextWrapper>
          <GridTitle>상품명</GridTitle>
          <GridContent>{data?.name}</GridContent>
          <GridTitle>브랜드 이름</GridTitle>
          <GridContent>{data?.brand_name}</GridContent>
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
  grid-template-columns: 15% 35% 15% 35%;
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
  width: 100%;
`
const ImgWrapper = styled.div`
  width: 100%;

  & img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`
export default DetailCosmeticInfo
