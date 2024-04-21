import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import CosmeticList from '@/components/user/CosmeticList'
import MobileCosmeticList from '@/components/user/MobileCosmeticList'
import TopMoveBanner from '../../../assets/moveBanner/gif_squareBanner_1.gif'
import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Search from '@/components/shared/Search'
import useSearchCosmetics from '@/hooks/data/useSearchCosmetics'

import { GiLipstick } from 'react-icons/gi'
import { useSetRecoilState } from 'recoil'
import { cosmeticAtom } from '@/atom/cosmetic'

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

  const setCosmetic = useSetRecoilState(cosmeticAtom)

  const CATEGORY = [
    { name: '립스틱', value: 'lip' },
    { name: '스킨/앰플', value: 'skin' },
    { name: '향수', value: 'perfume' },
    { name: '마스카라', value: 'maskara' },
    { name: '마스크/팩', value: 'maskpack' },
    { name: '파운데이션', value: 'foundation' },
    { name: '바디', value: 'body' },
    { name: '아이섀도우', value: 'shadow' },
    { name: '로션/크림', value: 'cream' },
    { name: '선크림', value: 'sunCare' },
    { name: '미용도구', value: 'tools' },
  ]

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

  const isClick = css`
    background-color: #303030;
    color: white;
    font-weight: 'bold';
  `
  const MCategory = styled.div<{ value: string }>`
    background-color: white;
    height: 35px;
    width: 44%;
    margin-right: 5px;
    padding-left: 15px;
    margin-top: 5px;
    display: flex;
    align-items: center;
    border-radius: 15px;
    transition: 1s;
    border: 1px solid #eee;

    background-color: ${(props) =>
      props.value === category ? '#303030;' : 'white'};
    color: ${(props) => (props.value === category ? 'white' : '')};
    font-weight: ${(props) => (props.value === category ? 'bold' : '')};
  `
  return (
    <>
      {innerWidth > 600 ? (
        <CosmeticContainer>
          <CategoryNavBox>
            <NavEventBanner>
              <img src={TopMoveBanner} alt="" />
            </NavEventBanner>
            <Spacing size={30} />

            <SideBar>
              <div
                className="element1"
                onClick={() => {
                  setCosmetic(null)
                  setCategory('lip')
                }}
              >
                립스틱
              </div>
              <div
                className="element2"
                onClick={() => {
                  setCosmetic(null)
                  setCategory('skin')
                }}
              >
                스킨 / 앰플
              </div>
              <div
                className="element3"
                onClick={() => {
                  setCosmetic(null)
                  setCategory('perfume')
                }}
              >
                향수
              </div>
              <div
                className="element4"
                onClick={() => {
                  setCosmetic(null)
                  setCategory('maskara')
                }}
              >
                마스카라
              </div>
              <div
                className="element5"
                onClick={() => {
                  setCosmetic(null)
                  setCategory('maskpack')
                }}
              >
                마스크/팩
              </div>
              <div
                className="element6"
                onClick={() => {
                  setCosmetic(null)
                  setCategory('foundation')
                }}
              >
                파운데이션
              </div>
              <div
                className="element7"
                onClick={() => {
                  setCosmetic(null)
                  setCategory('body')
                }}
              >
                바디
              </div>
              <div
                className="element8"
                onClick={() => {
                  setCosmetic(null)
                  setCategory('shadow')
                }}
              >
                아이섀도우
              </div>
              <div
                className="element9"
                onClick={() => {
                  setCosmetic(null)
                  setCategory('cream')
                }}
              >
                로션/크림
              </div>
              <div
                className="element10"
                onClick={() => {
                  setCosmetic(null)
                  setCategory('sunCare')
                }}
              >
                선크림
              </div>
              <div
                className="element11"
                onClick={() => {
                  setCosmetic(null)
                  setCategory('tools')
                }}
              >
                미용도구
              </div>
              <div className="hovers"></div>
            </SideBar>
          </CategoryNavBox>
          <CosmeticListBox>
            <MoveMainBanner>
              <img
                src={`${process.env.PUBLIC_URL}/images/cosmetic/category_banner1_2.png`}
                alt=""
                css={opacityImg_1}
              />
              <img
                src={`${process.env.PUBLIC_URL}/images/cosmetic/category_banner1_3.png`}
                alt=""
                css={opacityImg_2}
              />
            </MoveMainBanner>
            <Search />
            <CosmeticList category={category} />
          </CosmeticListBox>
        </CosmeticContainer>
      ) : (
        <MobileCosmeticContainer>
          <MobileEventBannerBox>
            <img
              src={`${process.env.PUBLIC_URL}/images/cosmetic/category_banner1_2.png`}
              alt=""
              css={mOpacityImg_1}
            />
            <img
              src={`${process.env.PUBLIC_URL}/images/cosmetic/category_banner1_3.png`}
              alt=""
              css={mOpacityImg_2}
            />
          </MobileEventBannerBox>
          <MobileCategory>
            {CATEGORY.map((cate, idx) => (
              <MCategory
                key={idx}
                onClick={() => setCategory(cate.value)}
                value={cate.value}
              >
                <Spacing size={10} direction="horizontal" />
                {cate.name}
              </MCategory>
            ))}
          </MobileCategory>

          <MobileListBox>
            <Flex justify={'space-between'} css={mobileHeader}>
              {category}
            </Flex>
            <Search />
            <MobileCosmeticList category={category} />
          </MobileListBox>
        </MobileCosmeticContainer>
      )}
    </>
  )
}

const slideOpacity = keyframes`
to {
  opacity: 1;
} 
`

const opacityImg_1 = css`
  position: absolute;
  top: 30px;
  opacity: 0;
  animation: ${slideOpacity} 2s ease-in-out forwards;
`
const opacityImg_2 = css`
  position: absolute;
  right: 350px;

  opacity: 0;
  animation: ${slideOpacity} 2s ease-in-out forwards;
`
const mOpacityImg_1 = css`
  position: absolute;
  top: 10px;
  height: 45px;
  width: 100px;
  opacity: 0;
  animation: ${slideOpacity} 2s ease-in-out forwards;
`
const mOpacityImg_2 = css`
  position: absolute;
  right: 120px;
  top: 5px;
  height: 65px;
  width: 80px;
  opacity: 0;
  animation: ${slideOpacity} 2s ease-in-out forwards;
`

const SideBar = styled.div`
  * {
    box-sizing: border-box;
  }

  background-color: #303030;
  display: block;
  height: 100%;
  width: 100%;
  font-weight: bold;
  position: relative;
  border-radius: 15px;

  div {
    height: 40px;
    font-size: 18px;
    text-align: center;
    color: white;
    position: relative;
    z-index: 3;
    cursor: pointer;
    padding: 10px;
    display: flex;
    justify-content: flex-end;
  }

  .hovers {
    position: absolute;
    top: 0;
    width: 80%;
    height: 40px;
    background-color: #b95b5b;
    border-radius: 40px;
    border: 2px solid #b95b5b;
    z-index: 1;
    margin-left: 55px;
    transition: 0.5s;
  }

  .element1:hover ~ .hovers {
    background-color: #b95b5b;
    border: 2px solid #b95b5b;
    transform: translateY(0%);
  }
  .element2:hover ~ .hovers {
    background-color: #0ebeff;
    border: 2px solid #0ebeff;
    transform: translateY(100%);
  }
  .element3:hover ~ .hovers {
    background-color: #d87200;
    border: 2px solid #d87200;
    transform: translateY(200%);
  }
  .element4:hover ~ .hovers {
    background-color: #47cf73;
    border: 2px solid #47cf73;
    transform: translateY(300%);
  }
  .element5:hover ~ .hovers {
    background-color: #ae63e4;
    border: 2px solid #ae63e4;
    transform: translateY(400%);
  }
  .element6:hover ~ .hovers {
    background-color: #ff7493;
    border: 2px solid #ff7493;
    transform: translateY(500%);
  }
  .element7:hover ~ .hovers {
    background-color: #ffb900;
    border: 2px solid #ffb900;
    transform: translateY(600%);
  }
  .element8:hover ~ .hovers {
    background-color: #6478ff;
    border: 2px solid #6478ff;
    transform: translateY(700%);
  }
  .element9:hover ~ .hovers {
    background-color: #2e8b57;
    border: 2px solid #2e8b57;
    transform: translateY(800%);
  }
  .element10:hover ~ .hovers {
    background-color: #d7567f;
    border: 2px solid #d7567f;
    transform: translateY(900%);
  }
  .element11:hover ~ .hovers {
    background-color: #6482b9;
    border: 2px solid #6482b9;
    transform: translateY(1000%);
  }
`

const MobileCosmeticContainer = styled.div`
  min-height: 100vh;
  padding: 10px;
`
const MobileEventBannerBox = styled.div`
  background-color: white;
  height: 75px;
  width: 100%;
  position: relative;
  background-image: url(${`${process.env.PUBLIC_URL}/images/cosmetic/category_banner1.jpg`});
  background-size: cover;
`
const MobileCategory = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
`

const MobileListBox = styled.div`
  overflow: scroll;
  margin-top: 20px;
`

const mobileHeader = css`
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  border-bottom: 1px solid #303030;
`
const CosmeticContainer = styled.div`
  width: 1400px;
  padding-top: 10px;
  margin: 0 auto;
  display: flex;
`
const MoveMainBanner = styled.div`
  position: relative;
  background-color: #eee;
  height: 200px;
  width: 100%;
  background-image: url(${`${process.env.PUBLIC_URL}/images/cosmetic/category_banner1.jpg`});
`
const NavEventBanner = styled.div`
  background-color: white;
  margin-top: 10px;
  width: 100%;

  & img {
    height: 100%;
    width: 100%;
    object-fit: contain;
    border-radius: 15px;
  }
`
const CategoryNavBox = styled.div`
  height: auto;
  flex-basis: 250px;
`
const CosmeticListBox = styled.div`
  flex-basis: 1150px;
  background-color: white;
  padding: 10px;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

export default CosmeticPage
