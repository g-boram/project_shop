import styled from '@emotion/styled'
import useLike from '@/hooks/like/useLike'
import useCosmeticsCategory from '@/hooks/data/useCosmeticsCategory'
import CosmeticCategoryBox from '../cosmetic/CosmeticCategoryBox'

const CosmeticList = ({ category }: { category: string }) => {
  const { data: cosmetic } = useCosmeticsCategory(category)
  const { data: likes, mutate: like } = useLike()
  console.log('likes', likes)

  return (
    <CosmeticContainer>
      <ListContainer>
        {cosmetic?.map((cos, i) => {
          return (
            <CosmeticCategoryBox
              key={i}
              isLike={Boolean(
                likes?.find((like) => like.cosmeticId === cos.id),
              )}
              onLike={like}
              cosmetic={cos}
            />
          )
        })}
      </ListContainer>
    </CosmeticContainer>
  )
}
const CosmeticContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
`
const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`

export default CosmeticList
