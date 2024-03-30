import useCosmetics from '@/hooks/data/useCosmetics'
import { useCosmeticHighStarData } from '@/hooks/data/useMainData'
import styled from '@emotion/styled'
import CosmeticBox from '../cosmetic/CosmeticBox'
import Flex from '../shared/Flex'
import Spacing from '../shared/Spacing'
import Top from '../shared/Top'
import { FiPlus } from 'react-icons/fi'
import { css } from '@emotion/react'

const MainCosmeticList = () => {
  // 별점이 4개이상인 데이터
  const { data: higtStar } = useCosmeticHighStarData()

  return (
    <CosmeticContainer>
      <Spacing size={10} />
      <Flex justify={'space-between'}>
        <Top
          title="⭐️ 별점 4 이상 상품"
          subTitle="직접 사용해본 고객님들의 확실한 별점!"
        />
        <Flex align={'center'}>
          <FiPlus size={'25px'} css={rocaleBtn} />
        </Flex>
      </Flex>
      <ListContainer>
        {higtStar?.map((cos, i) => {
          return <CosmeticBox cosmetic={cos} key={i} />
        })}
      </ListContainer>
      <Spacing size={10} />
    </CosmeticContainer>
  )
}
const CosmeticContainer = styled.div`
  padding: 20px;
`
const ListContainer = styled.div`
  display: flex;
  overflow: scroll;
  background-color: #eee;
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
