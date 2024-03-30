import addDelimiter from '@/utils/addDelimiter'
import styled from '@emotion/styled'
import Flex from '../shared/Flex'
import Spacing from '../shared/Spacing'
import Text from '../shared/Text'
import { useLipEventCosmetic } from '@/hooks/data/useMainData'
import { Cosmetic } from '@/models/cosmetic'
import { css } from '@emotion/react'
import { FaStar } from 'react-icons/fa'
import Skeleton from '../shared/Skeleton'

const SlideBannerData = () => {
  const { data, isLoading } = useLipEventCosmetic()
  const loadingArr = [1, 2, 3, 4, 5, 6]

  return (
    <>
      {isLoading ? (
        <CosmeticContainer>
          {loadingArr.map(() => (
            <Wrapper>
              <Skeleton width={170} height={180} />
            </Wrapper>
          ))}
        </CosmeticContainer>
      ) : (
        <CosmeticContainer>
          {data?.map((cosmetic, idx) => (
            <Wrapper>
              <ImgWrapper>
                {cosmetic.url ? (
                  <img src={cosmetic.url} alt={cosmetic.name} />
                ) : null}
              </ImgWrapper>

              <Flex direction="column" css={nameStyle}>
                <Text typography="t8">{cosmetic.brand_name}</Text>
                <Spacing size={5} />
                <Text typography="t7" bold>
                  {cosmetic.name}
                </Text>
              </Flex>
              <Flex justify={'flex-end'}>
                <FaStar fill="#ffdb00" />
                <Spacing size={5} direction={'horizontal'} />
                <Text typography="t7" bold>
                  {cosmetic.rating}
                </Text>
              </Flex>
              <Spacing size={10} />
              <Flex justify={'space-between'}>
                <Text typography="t6" css={salePerStyle}>
                  {addDelimiter(cosmetic.salePercent) + '%'}
                </Text>
                <Spacing size={40} direction={'horizontal'} />
                <Text typography="t9" css={saleTextStyle}>
                  {addDelimiter(cosmetic.price)}
                </Text>
                <Spacing size={3} direction={'horizontal'} />
                <Text typography="t6" bold>
                  {addDelimiter(
                    Number(cosmetic.price) - Number(cosmetic.totalSale),
                  )}
                </Text>
              </Flex>
            </Wrapper>
          ))}
        </CosmeticContainer>
      )}
    </>
  )
}
const CosmeticContainer = styled.div`
  display: flex;
  height: 330px;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  background-color: #fcf0f3;
  border-radius: 15px;

  @media (min-width: 600px) {
    width: 100%;
  }
  @media (max-width: 600px) {
    overflow: scroll;
    height: 230px;
    padding: 10px;
    margin: 0 10px;
  }
`
const Wrapper = styled.div`
  width: 170px;
  height: 280px;
  padding: 10px;
  margin-top: 20px;
  margin-right: 10px;
  background-color: white;

  @media (max-width: 600px) {
    width: 100px;
    height: 200px;
    margin-top: 0;
  }
`
const ImgWrapper = styled.div`
  height: 180px;
  width: 100%;
  position: relative;
  background-color: #eee;

  @media (max-width: 600px) {
    height: 110px;
  }

  & img {
    height: auto;
    width: 100%;
    object-fit: contain;
  }
`
const nameStyle = css`
  height: 35px;
  overflow: hidden;
  margin-top: 20px;

  @media (max-width: 600px) {
    margin-top: 10px;
  }
`
const salePerStyle = css`
  color: red;
`
const saleTextStyle = css`
  text-decoration-line: line-through;
`
export default SlideBannerData
