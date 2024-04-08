import 'swiper/css'
import 'swiper/css/effect-cards'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { EffectCards } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { keyframes } from '@emotion/react'

const BeautyYoutube = () => {
  return (
    <>
      <YoutubeContainer>
        <CardContainer>
          <Swiper effect={'cards'} grabCursor={true} modules={[EffectCards]}>
            <SwiperSlide>
              <Link to={'https://www.youtube.com/'} target={'_blank'}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/main/YouTube_Img1.jpg`}
                  alt=""
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to={'https://www.youtube.com/'} target={'_blank'}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/main/YouTube_Img2.jpg`}
                  alt=""
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to={'https://www.youtube.com/'} target={'_blank'}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/main/YouTube_Img3.jpg`}
                  alt=""
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to={'https://www.youtube.com/'} target={'_blank'}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/main/YouTube_Img4.jpg`}
                  alt=""
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to={'https://www.youtube.com/'} target={'_blank'}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/main/YouTube_Img5.jpg`}
                  alt=""
                />
              </Link>
            </SwiperSlide>
          </Swiper>
        </CardContainer>
        <ImgWrapper>
          <img
            src={`${process.env.PUBLIC_URL}/images/main/YouTube_Banner.gif`}
            alt=""
          />
        </ImgWrapper>
      </YoutubeContainer>
    </>
  )
}

const pulsate = keyframes`
  50% {
    box-shadow:
      0 0 20px #fff,
      20px 0 80px #f0f,
      -20px 0 80px #0ff,
      inset 0 0 50px #fff,
      inset -50px 0 80px #f0f,
      inset 50px 0 80px #0ff,
      inset -50px 0 300px #f0f,
      inset 50px 0 300px #0ff;
`

const ImgWrapper = styled.div`
  width: 700px;
  height 400px:
  
  box-shadow:
  0 0 20px #fff,
  -20px 0 80px #f0f,
  20px 0 80px #0ff,
  inset 0 0 50px #fff,
  inset 50px 0 80px #f0f,
  inset -50px 0 80px #0ff,
  inset 50px 0 300px #f0f,
  inset -50px 0 300px #0ff;
  animation: ${pulsate} 6s linear infinite;

  & img {
    width: 100%;
    height 100%:
    object-fit: contain;
  }


  @media (max-width: 600px) {
    width: 350px;

    & > img {
      height: 200px;
      width: 350px;
    }
  }

`
const CardContainer = styled.div`
  @media (min-width: 600px) {
    width: 500px;
  }
  @media (max-width: 600px) {
    margin-bottom: 100px;
  }

  .swiper {
    width: 300px;
    height: 300px;
    padding: 10px;

    @media (max-width: 600px) {
      width: 250px;
      height: 250px;
    }
  }

  .swiper-slide {
    display: flex;
    padding: 10px;
    align-items: center;
    justify-content: center;
    border-radius: 18px;
    font-size: 22px;
    font-weight: bold;
    color: #fff;

    & img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 10px;
    }
  }

  .swiper-slide:nth-child(1n) {
    background-color: #f8b4b0;
  }

  .swiper-slide:nth-child(2n) {
    background-color: #c67f87;
  }

  .swiper-slide:nth-child(3n) {
    background-color: #8b5662;
  }

  .swiper-slide:nth-child(4n) {
    background-color: #633944;
  }

  .swiper-slide:nth-child(5n) {
    background-color: #482933;
  }
`

const YoutubeContainer = styled.div`
  height: 450px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #181818;

  @media (max-width: 600px) {
    flex-direction: column;
    height: auto;
    padding-bottom: 30px;
  }
`
export default BeautyYoutube
