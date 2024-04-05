import { useLipEventCosmetic } from '@/hooks/data/useMainData'
import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import SlideBannerData from './SlideBannerData'

const SlideBanner = () => {
  const [position, setPosition] = useState<number>(0)

  function onScroll() {
    setPosition(window.scrollY)
  }
  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // 웹 사이즈
  const renderBanner = () => {
    if (position > 50) {
      return (
        <>
          <img
            src={`${process.env.PUBLIC_URL}/images/main/mainSlide1.png`}
            alt=""
            css={banner1}
          />
          <img
            src={`${process.env.PUBLIC_URL}/images/main/mainSlide2.png`}
            alt=""
            css={banner2}
          />
          <img
            src={`${process.env.PUBLIC_URL}/images/main/mainSlide3.png`}
            alt=""
            css={banner3}
          />
          <img
            src={`${process.env.PUBLIC_URL}/images/main/mainSlide4.png`}
            alt=""
            css={banner4}
          />
          <img
            src={`${process.env.PUBLIC_URL}/images/main/mainSlide6.png`}
            alt=""
            css={banner6}
          />
        </>
      )
    }
  }
  // 모바일 사이즈
  const renderMobileBanner = () => {
    if (position > 50) {
      return (
        <>
          <img
            src={`${process.env.PUBLIC_URL}/images/main/mainSlide1.png`}
            alt=""
            css={m_banner1}
          />
          <img
            src={`${process.env.PUBLIC_URL}/images/main/mainSlide4.png`}
            alt=""
            css={m_banner4}
          />
          <img
            src={`${process.env.PUBLIC_URL}/images/main/mainSlide6.png`}
            alt=""
            css={m_banner6}
          />
        </>
      )
    }
  }

  return (
    <>
      {/* 웹 사이즈 */}
      <SlideBannerContainer>
        <img
          src={`${process.env.PUBLIC_URL}/images/main/mainSlideBg.jpg`}
          alt=""
          css={bannerBg}
        />
        {renderBanner()}
        <img
          src={`${process.env.PUBLIC_URL}/images/main/mainSlide5.png`}
          alt=""
          css={banner5}
        />
      </SlideBannerContainer>
      {/* 모바일 사이즈 */}
      <MobileSlideBanner>
        <img
          src={`${process.env.PUBLIC_URL}/images/main/mainSlideBg.jpg`}
          alt=""
          css={m_bannerBg}
        />
        {renderMobileBanner()}
        <img
          src={`${process.env.PUBLIC_URL}/images/main/mainSlide3.png`}
          alt=""
          css={m_banner3}
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/main/mainSlide5.png`}
          alt=""
          css={m_banner5}
        />
      </MobileSlideBanner>
      <SlideBannerData />
    </>
  )
}

const slideRightBox = keyframes`
to {
  transform: translateX(0);
} 
`
const slideOpacity = keyframes`
to {
  opacity: 1;
} 
`
// 모바일 사이즈
const MobileSlideBanner = styled.div`
  display: none;
  position: relative;
  height: 230px;
  width: 100%;
  background-color: #ffedf0;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    display: block;
  }
`
// 배경
const m_bannerBg = css`
  position: absolute;
  opacity: 0.5;
  width: 100%;
  height: 230px;
`
// NEW ARRIVAL
const m_banner1 = css`
  position: absolute;
  right: 0px;
  height: 90px;
  width: 200px;
  top: 30px;
  transform: translateX(50px);
  animation: ${slideRightBox} 1s ease-in-out forwards;
`
// 글씨
const m_banner3 = css`
  position: absolute;
  width: 150px;
  right: 10px;
  bottom: 30px;
`
// 아래 장미
const m_banner4 = css`
  position: absolute;
  width: 100px;
  left: 150px;
  bottom: 0px;
  opacity: 0;
  animation: ${slideOpacity} 2s ease-in-out forwards;
`
// 위 장미
const m_banner5 = css`
  position: absolute;
  width: 100px;
  right: 150px;
  top: -60px;
  z-index: 2;
`
// 메인 립스틱
const m_banner6 = css`
  position: absolute;
  width: 200px;
  left: -10px;
  transform: translateX(-200px);
  animation: ${slideRightBox} 1s ease-in-out forwards;
`

// 웹 사이즈
const SlideBannerContainer = styled.div`
  position: relative;
  height: 400px;
  width: 100%;
  background-color: white;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    display: none;
  }
`
// 배경
const bannerBg = css`
  position: absolute;
  opacity: 0.5;
  left: 20px;
  width: 600px;
  height: 400px;
`
// NEW ARRIVAL
const banner1 = css`
  position: absolute;
  left: 400px;
  height: 200px;
  width: 500px;
  transform: translateX(-400px);
  animation: ${slideRightBox} 1s ease-in-out forwards;
`
// 여러개 립스틱
const banner2 = css`
  position: absolute;
  width: 350px;
  height: 380px;
  right: 0;
  bottom: 0;
  transform: translateX(100px);
  animation: ${slideRightBox} 1s ease-in-out forwards;
`
// 글씨
const banner3 = css`
  position: absolute;
  width: 300px;
  right: 300px;
  bottom: 0;
`
// 아래 장미
const banner4 = css`
  position: absolute;
  width: 200px;
  left: 400px;
  bottom: -60px;
  opacity: 0;
  animation: ${slideOpacity} 2s ease-in-out forwards;
`
// 위 장미
const banner5 = css`
  position: absolute;
  width: 200px;
  right: 280px;
  top: -60px;
  z-index: 2;
`
// 메인 립스틱
const banner6 = css`
  position: absolute;
  width: 400px;
  transform: translateX(-200px);
  animation: ${slideRightBox} 1s ease-in-out forwards;
`
export default SlideBanner
