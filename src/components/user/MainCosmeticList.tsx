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
  const { data: cosmetic } = useCosmetics()

  // const [filter, setFilter] = useState('os')

  // const { data: cosmetic } = useQuery('mainCosmeticData', getCosmeticList, {
  //   select:
  //     filter === 'all'
  //       ? undefined
  //       : (data) => data.filter((v) => v.category === 'shadow'),
  // })

  // const highRatingList = getHighRatingCosList()
  // console.log('highRatingList', highRatingList)

  // 별점이 4개이상인 데이터
  const { data: higtStar } = useCosmeticHighStarData()

  return (
    <CosmeticContainer>
      <Flex justify={'space-between'}>
        <Top title="인기 상품" subTitle="스킨부터 크림까지 최저가" />
        <Flex align={'center'}>
          <FiPlus size={'25px'} css={rocaleBtn} />
        </Flex>
      </Flex>
      <ListContainer>
        {cosmetic?.map((cos, i) => {
          return <CosmeticBox cosmetic={cos} key={i} />
        })}
      </ListContainer>

      <Spacing size={10} />
      {/* <Top title="⭐️ 별점 4 이상 상품" subTitle="스킨부터 크림까지 최저가" />
      <ListContainer>
        {higtStar?.map((cos, i) => {
          return <CosmeticBox cosmetic={cos} key={i} />
        })}
      </ListContainer> */}
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
  &:hover {
    transition: all 0.2s linear;
    transform: scale(1.4);
  }
`
export default MainCosmeticList
