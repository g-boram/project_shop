import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'

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
  console.log('position', position)
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
            src={`${process.env.PUBLIC_URL}/images/main/mainSlide6.png`}
            alt=""
            css={banner6}
          />
        </>
      )
    }
  }

  // const CategoryBtn = styled.div<{ cate: string }>`
  //   width: 80px;
  //   height: 20px;
  //   font-weight: bold;
  //   margin-right: 5px;
  //   text-align: center;
  //   font-size: 18px;
  //   cursor: pointer;
  //   color: ${(props) => (props.cate === category ? '#f4aeba;' : 'grey')};

  //   &: hover {
  //     transition: 0.5s;
  //     color: pink;
  //   }
  // `
  return (
    <>
      <SlideBannerContainer>
        <img
          src={`${process.env.PUBLIC_URL}/images/main/mainSlideBg.jpg`}
          alt=""
          css={bannerBg}
        />
        {renderBanner()}
        <img
          src={`${process.env.PUBLIC_URL}/images/main/mainSlide4.png`}
          alt=""
          css={banner4}
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/main/mainSlide5.png`}
          alt=""
          css={banner5}
        />
      </SlideBannerContainer>
      <MobileSlideBanner></MobileSlideBanner>
    </>
  )
}

const slideRightBox = keyframes`
to {
  transform: translateX(0);
} 
`
const MobileSlideBanner = styled.div``
const SlideBannerContainer = styled.div`
  position: relative;
  height: 400px;
  width: 100%;
  background-color: white;
  margin-bottom: 50px;

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
`
// 위 장미
const banner5 = css`
  position: absolute;
  width: 200px;
  right: 280px;
  top: -60px;
`
// 메인 립스틱
const banner6 = css`
  position: absolute;
  width: 400px;
`
export default SlideBanner
