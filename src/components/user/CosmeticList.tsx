import styled from '@emotion/styled'
import Flex from '../shared/Flex'
import Top from '../shared/Top'
import useCosmeticsCategory from '@/hooks/data/useCosmeticsCategory'
import CosmeticCategoryBox from '../cosmetic/CosmeticCategoryBox'
import { css } from '@emotion/react'

const CosmeticList = ({ category }: { category: string }) => {
  const { data: cosmetic } = useCosmeticsCategory(category)

  return (
    <CosmeticContainer>
      <Flex justify={'space-between'}>
        <Top title={category} />
      </Flex>
      <ListContainer>
        {cosmetic?.map((cos, i) => {
          return <CosmeticCategoryBox cosmetic={cos} key={i} />
        })}
      </ListContainer>
    </CosmeticContainer>
  )
}
const CosmeticContainer = styled.div`
  padding: 20px;
`
const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`

export default CosmeticList
