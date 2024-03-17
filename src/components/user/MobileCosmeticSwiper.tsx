import { css } from '@emotion/react'
import { FadeLoader } from 'react-spinners'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { useMainBanner } from '@/hooks/data/useMainData'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import styled from '@emotion/styled'
import { subImgInterface } from '@/models/cosmetic'

const MobileCosmeticSwiper = ({
  mainImg,
  subImg,
}: {
  mainImg: string
  subImg: subImgInterface[]
}) => {
  if (mainImg == null && subImg == null) {
    return (
      <LoadingBox>
        <FadeLoader color="#e6a4b4" />
      </LoadingBox>
    )
  }

  return (
    <Swiper
      css={containerStyles}
      spaceBetween={30}
      centeredSlides={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
    >
      <SwiperSlide>
        {mainImg ? (
          <ImageWrapper>
            <img src={mainImg} alt={'Main Img'} />
          </ImageWrapper>
        ) : (
          <LoadingBox>
            <FadeLoader color="#e6a4b4" />
          </LoadingBox>
        )}
      </SwiperSlide>
      {subImg ? (
        subImg.map((img: any, idx) => (
          <SwiperSlide>
            <ImageWrapper>
              <img src={img.url} alt={`${idx} 번째 이미지`} />
            </ImageWrapper>
          </SwiperSlide>
        ))
      ) : (
        <LoadingBox>
          <FadeLoader color="#e6a4b4" />
        </LoadingBox>
      )}
    </Swiper>
  )
}
const LoadingBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
  height: 400px;
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
`
const ImageWrapper = styled.div`
  width: 100%;
  height: 400px;
  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`
export default MobileCosmeticSwiper
