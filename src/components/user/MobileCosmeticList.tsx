import styled from '@emotion/styled'
import useCosmeticsCategory from '@/hooks/data/useCosmeticsCategory'
import MobileCosmeticBox from '../cosmetic/MobileCosmeticBox'
import useLike from '@/hooks/like/useLike'

const MobileCosmeticList = ({ category }: { category: string }) => {
  const { data: cosmetic } = useCosmeticsCategory(category)
  const { data: likes, mutate: like } = useLike()

  return (
    <CosmeticContainer>
      {cosmetic?.map((cos, i) => {
        return (
          <MobileCosmeticBox
            cosmetic={cos}
            key={i}
            isLike={Boolean(likes?.find((like) => like.cosmeticId === cos.id))}
            onLike={like}
          />
        )
      })}
    </CosmeticContainer>
  )
}
const CosmeticContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
`

export default MobileCosmeticList
