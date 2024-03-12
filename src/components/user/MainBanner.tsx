import { css } from '@emotion/react'
import { FadeLoader } from 'react-spinners'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { useMainBanner } from '@/hooks/data/useMainData'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import styled from '@emotion/styled'

const MainBanner = () => {
  // 데이터베이스 이미지데이터 가져오기
  const { isLoading, isError, error, data } = useMainBanner()

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
          <img src={img.url} alt={`${idx} 번째 배너이미지`} css={imageStyles} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
const LoadingBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5eee6;

  @media (max-width: 600px) {
    height: 250px;
  }
  @media (min-width: 600px) {
    height: 400px;
  }
`
const containerStyles = css`
  .swiper-button-next,
  .swiper-button-prev {
    color: pink;
  }
  .swiper-pagination-bullet-active {
    background: pink;
  }
  transition: 1s;
  @media (max-width: 600px) {
    height: 250px;
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
  object-fit: cover;
`
export default MainBanner
