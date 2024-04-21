import { css } from '@emotion/react'
import { FadeLoader } from 'react-spinners'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { useMainBanner } from '@/hooks/data/useMainData'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

const MainBanner = () => {
  // 데이터베이스 이미지데이터 가져오기
  const { isLoading, data } = useMainBanner()
  const navigate = useNavigate()

  if (data == null || isLoading) {
    return (
      <LoadingBox>
        <FadeLoader color="#e6a4b4" />
      </LoadingBox>
    )
  }
  if (data) {
  }

  return (
    <MainBannerContainer>
      <Swiper
        css={containerStyles}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {data.map((img: any, idx) => (
          <SwiperSlide>
            <img
              src={img.url}
              alt={`${idx} 번째 배너이미지`}
              css={imageStyles}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <MainBadgeBox onClick={() => navigate('/event')}>
        <img
          src={`${process.env.PUBLIC_URL}/images/main/main_badge1.jpg`}
          alt=""
        />
      </MainBadgeBox>
    </MainBannerContainer>
  )
}
const MainBannerContainer = styled.div`
  display: flex;
`
const MainBadgeBox = styled.div`
  height: 400px;
  width: 200px;
  display: flex;
  align-items: center;
  background-color: white;
  cursor: pointer;

  & img {
    height: 380px;
    width: 100%;
    object-fit: cover;
    border-radius: 15px;
  }
  @media (max-width: 600px) {
    display: none;
  }
`
const LoadingBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;

  @media (max-width: 600px) {
    height: 200px;
  }
  @media (min-width: 600px) {
    height: 400px;
  }
`
const containerStyles = css`
  width: 100%;

  .swiper-button-next,
  .swiper-button-prev {
    color: black;
  }
  .swiper-pagination-bullet-active {
    background: black;
  }
  transition: 1s;
  @media (max-width: 600px) {
    height: 200px;
    transition: 1s;
  }
  @media (min-width: 600px) {
    height: 400px;
    transition: 1s;
  }
`
const imageStyles = css`
  width: 100%;
  height: 100%;
  object-fit: contain;
  @media (max-width: 600px) {
    height: 160px;
  }
`
export default MainBanner
