import {
  useCosmeticHighStarData,
  useHotCosmetic,
  useNewCosmetic,
} from '@/hooks/data/useMainData'
import styled from '@emotion/styled'
import CosmeticBox from '../cosmetic/CosmeticBox'
import Flex from '../shared/Flex'
import Spacing from '../shared/Spacing'
import Text from '../shared/Text'

import { css } from '@emotion/react'

const SpecialCosmeticList = () => {
  // 별점이 4개이상인 데이터
  const { data: highStar } = useCosmeticHighStarData()
  const { data: HotItems } = useHotCosmetic()
  console.log('HotItems', HotItems)
  return (
    <Wrapper>
      <CosmeticContainer>
        {/* 타이틀 영역 */}
        <Flex justify={'space-between'} css={topTitleStyle}>
          <Flex direction="column">
            <Text bold={true} typography="t5">
              별점 4 이상 상품 ⭐️⭐️⭐️⭐️⭐️
            </Text>
            <Spacing size={10} />
            <Text typography="t8">직접 사용해본 고객님들의 확실한 별점!</Text>
          </Flex>
        </Flex>
        {/* 리스트 영역 */}
        <ListContainer>
          {/* @TODO : 이미지 찾아서 넣기 */}
          {/* <img
            src={`${process.env.PUBLIC_URL}/images/main/mainSlide4.png`}
            alt=""
            css={mainImg}
          /> */}
          {highStar?.map((cos, i) => {
            return <CosmeticBox cosmetic={cos} key={i} />
          })}
        </ListContainer>
        {/* <Spacing size={20} /> */}
      </CosmeticContainer>

      <CosmeticContainer>
        {/* 타이틀 영역 */}
        <Flex justify={'space-between'} css={topTitleStyle}>
          <Flex direction="column">
            <Text bold={true} typography="t5">
              핫딜 상품 🔥
            </Text>
            <Spacing size={10} />
            <Text typography="t8">서두르세요! 시간이 얼마남지 않았어요!</Text>
          </Flex>
        </Flex>
        {/* 리스트 영역 */}
        <ListContainer>
          {/* @TODO : 이미지 찾아서 넣기 */}
          {/* <img
          src={`${process.env.PUBLIC_URL}/images/main/mainSlide4.png`}
          alt=""
          css={mainImg}
        /> */}
          {HotItems?.map((cos, i) => {
            return <CosmeticBox cosmetic={cos} key={i} />
          })}
        </ListContainer>
        {/* <Spacing size={20} /> */}
      </CosmeticContainer>
    </Wrapper>
  )
}

const ListContainer = styled.div`
  display: flex;
  align-items: flex-start;
  overflow: scroll;
  height: auto;
  padding-bottom: 20px;

  @media (min-width: 600px) {
    align-items: flex-end;
    justify-content: flex-start;
  }
`
const Wrapper = styled.div`
  margin: 20px 0;

  @media (max-width: 600px) {
    max-width: 420px;
    padding: 0 10px;
  }
`
const CosmeticContainer = styled.div`
  margin-top: 30px;
`

const topTitleStyle = css`
  padding: 20px;
  margin: 10px 0;
`
const mainImg = css`
  width: 350px;
  height: 350px;
  margin-right: 30px;

  @media (max-width: 600px) {
    display: none;
  }
`
export default SpecialCosmeticList
