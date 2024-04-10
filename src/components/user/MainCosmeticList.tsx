import {
  useCosmeticHighStarData,
  useNewCosmetic,
} from '@/hooks/data/useMainData'
import styled from '@emotion/styled'
import CosmeticBox from '../cosmetic/CosmeticBox'
import Flex from '../shared/Flex'
import Spacing from '../shared/Spacing'
import { FiPlus } from 'react-icons/fi'
import { css, keyframes } from '@emotion/react'
import SlideTopItem from '../main/SlideTopItem'
import Text from '../shared/Text'
import Skeleton from '../shared/Skeleton'

const MainCosmeticList = () => {
  // 별점이 4개이상인 데이터
  const { data: highStar } = useCosmeticHighStarData()
  const { data: newItems, isLoading } = useNewCosmetic()

  return (
    <>
      {isLoading ? (
        <Skeleton width={'100%'} height={500} />
      ) : (
        <CosmeticContainer>
          <Flex justify={'space-between'} css={topTitleStyle}>
            <Flex direction="column">
              <Text bold={true} typography="t5">
                🛍️ N.E.W 신상 상품
              </Text>
              <Spacing size={10} />
              <Text typography="t8">
                방금 들어온 따끈후끈 신상 제품을 소개합니다!
              </Text>
            </Flex>
            <Flex align={'center'}>
              <FiPlus size={'25px'} css={rocaleBtn} />
            </Flex>
          </Flex>
          <SlideWrapper>
            <img
              src={`${process.env.PUBLIC_URL}/images/main/newItems.gif`}
              alt=""
              css={mainImg}
            />
            <SlideTopItem data={newItems} />
          </SlideWrapper>
          <Spacing size={10} />
        </CosmeticContainer>
      )}
    </>
  )
}

const slideOpacity = keyframes`
to {
  opacity: 1;
} 
`
const topTitleStyle = css`
  padding: 20px;
  margin: 10px 0;
`
const mainImg = css`
  width: 350px;
  height: 350px;
  margin-right: 30px;
  opacity: 0;
  animation: ${slideOpacity} 1s ease-in-out forwards;

  @media (max-width: 600px) {
    display: none;
  }
`

const SlideWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  height: 350px;

  & > img {
    border-radius: 10px;
  }

  @media (max-width: 600px) {
    height: 280px;
  }
  @media (min-width: 600px) {
    align-items: flex-end;
    justify-content: center;
  }
`
const CosmeticContainer = styled.div`
  padding: 20px 0;

  @media (max-width: 600px) {
    padding: 0px;
  }
`

const rocaleBtn = css`
  cursor: pointer;
  margin-right: 20px;
  &:hover {
    transition: all 0.2s linear;
    transform: scale(1.4);
  }
`
export default MainCosmeticList
