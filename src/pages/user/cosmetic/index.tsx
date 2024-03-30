import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import CosmeticList from '@/components/user/CosmeticList'
import MobileCosmeticList from '@/components/user/MobileCosmeticList'
import TopMoveBanner from '../../../assets/moveBanner/gif_squareBanner_1.gif'
import styled from '@emotion/styled'
import { CATEGORY } from '@/constants/cosmetic'
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Search from '@/components/shared/Search'
import useSearchCosmetics from '@/hooks/data/useSearchCosmetics'

// 카테고리 category
// 선물 - gift
// 세일 - sale
// 타임세일 - timesale
// 베이스 - base
// 스킨/앰플 - skin
// 미용도구 - tools
// 향수 - perfume
// 마스카라 - maskara
// 마스크/팩 - maskpack
// 파운데이션 - foundation
// 바디 - body
// 아이섀도우 - eyeshadow
// 로션/크림 - cream
// 선크림 - suncream
// 카테고리 - category

const CosmeticPage = () => {
  const params = useParams()
  const [innerWidth, setInnerWidth] = useState(0)
  const [category, setCategory] = useState<string>('shadow')

  useEffect(() => {
    if (params?.category) {
      setCategory(params?.category)
    }
  }, [params?.category])

  const handleResize = () => {
    setInnerWidth(window.innerWidth)
  }

  useEffect(() => {
    if (innerWidth === 0) {
      window.addEventListener('resize', handleResize)

      setInnerWidth(window.innerWidth)
      window.removeEventListener('resize', handleResize)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      {innerWidth > 600 ? (
        <CosmeticContainer>
          <CategoryNavBox>
            <NavEventBanner>
              <img src={TopMoveBanner} alt="" />
            </NavEventBanner>
            <Spacing size={30} />
            {CATEGORY.map((cate, idx) => (
              <>
                <Button
                  key={idx}
                  color="pink"
                  size="large"
                  full
                  onClick={() => setCategory(cate.value)}
                >
                  {cate.name}
                </Button>
                <Spacing size={5} />
              </>
            ))}
          </CategoryNavBox>
          <CosmeticListBox>
            <MoveMainBanner>MoveMainBanner</MoveMainBanner>
            <Search />
            <CosmeticList category={category} />
          </CosmeticListBox>
        </CosmeticContainer>
      ) : (
        <MobileCosmeticContainer>
          <MobileEventBannerBox>EentBanner</MobileEventBannerBox>
          <MobileCategory>
            {CATEGORY.map((cate, idx) => (
              <MCategory key={idx} onClick={() => setCategory(cate.value)}>
                {cate.name}
              </MCategory>
            ))}
          </MobileCategory>
          <MobileListBox>
            <Flex justify={'space-between'} css={mobileHeader}>
              {category}
            </Flex>
            <MobileCosmeticList category={category} />
          </MobileListBox>
        </MobileCosmeticContainer>
      )}
    </>
  )
}

const MobileCosmeticContainer = styled.div`
  background-color: pink;x
  height: auto;
  padding: 10px;
`
const MobileEventBannerBox = styled.div`
  background-color: grey;
  width: 100%;
  height: 80px;
`
const MobileCategory = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const MCategory = styled.div`
  background-color: white;
  height: 30px;
  width: 50%;
  margin-top: 10px;
`
const MobileListBox = styled.div`
  background-color: white;
  padding: 10px;
  overflow: scroll;
  margin-top: 20px;
`

const mobileHeader = css`
  height: 50px;
  background-color: yellow;
  font-size: 16px;
  font-weight: bold;
`
const CosmeticContainer = styled.div`
  width: 1400px;
  padding-top: 10px;
  margin: 0 auto;
  display: flex;
`
const MoveMainBanner = styled.div`
  background-color: grey;
  height: 250px;
  width: 100%;
`
const NavEventBanner = styled.div`
  background-color: white;
  height: 250px;
  width: 100%;

  & img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`
const CategoryNavBox = styled.div`
  height: auto;
  flex-basis: 200px;
`
const CosmeticListBox = styled.div`
  flex-basis: 1150px;
  background-color: white;
  padding: 5px;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

export default CosmeticPage
