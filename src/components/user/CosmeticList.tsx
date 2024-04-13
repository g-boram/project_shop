import styled from '@emotion/styled'
import useLike from '@/hooks/like/useLike'
import useCosmeticsCategory from '@/hooks/data/useCosmeticsCategory'
import CosmeticCategoryBox from '../cosmetic/CosmeticCategoryBox'
import { useEffect } from 'react'
import useSearchCosmetics from '@/hooks/data/useSearchCosmetics'

const CosmeticList = ({ category }: { category: string }) => {
  const { data: cosmetic } = useCosmeticsCategory(category)
  const { data: likes, mutate: like } = useLike()

  const searchData = useSearchCosmetics()

  return (
    <CosmeticContainer>
      <ListContainer>
        {searchData && searchData?.length >= 0
          ? searchData?.map((cos, i) => {
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
            })
          : cosmetic?.map((cos, i) => {
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
