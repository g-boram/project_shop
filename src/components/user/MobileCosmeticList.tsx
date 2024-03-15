import styled from '@emotion/styled'
import Flex from '../shared/Flex'
import Top from '../shared/Top'
import useCosmeticsCategory from '@/hooks/data/useCosmeticsCategory'
import CosmeticCategoryBox from '../cosmetic/CosmeticCategoryBox'
import { css } from '@emotion/react'
import MobileCosmeticBox from '../cosmetic/MobileCosmeticBox'

const MobileCosmeticList = ({ category }: { category: string }) => {
  const { data: cosmetic } = useCosmeticsCategory(category)

  return (
    <CosmeticContainer>
      {/* <ListContainer> */}
      {cosmetic?.map((cos, i) => {
        return <MobileCosmeticBox cosmetic={cos} key={i} />
      })}
      {/* </ListContainer> */}
    </CosmeticContainer>
  )
}
const CosmeticContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
`

export default MobileCosmeticList
