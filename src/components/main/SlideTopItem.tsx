import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade' // 필요한 스타일 추가

import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import styled from '@emotion/styled'
import CosmeticBox from '../cosmetic/CosmeticBox'
import { useEffect, useState } from 'react'
import Skeleton from '../shared/Skeleton'
import MainMobileCosmeticBox from '../cosmetic/MainMobileCosmeticBox'

export default function SlideTopItem({ data }: { data: any }) {
  const [innerWidth, setInnerWidth] = useState(0)

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
  console.log('inner', innerWidth)
  return (
    <>
      {data ? (
        <>
          {innerWidth > 700 ? (
            <SlideContainer>
              <div>
                <Swiper
                  className="sample-slider"
                  modules={[Autoplay]}
                  spaceBetween={20}
                  slidesPerView={4} // 화면에 보여질 슬라이드 수
                  loop={true} // 무한 루프 활성화
                  autoplay={{
                    delay: 0,
                    pauseOnMouseEnter: false, // added
                    disableOnInteraction: false,
                  }}
                  speed={6000} //add
                  pagination={{ clickable: false }}
                  allowTouchMove={false}
                >
                  {data?.map((item: any, index: number) => {
                    return (
                      <SwiperSlide key={index}>
                        <CosmeticBox cosmetic={item} key={index} />
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
              </div>
            </SlideContainer>
          ) : (
            <SlideContainer>
              <div>
                <Swiper
                  className="sample-slider"
                  modules={[Autoplay]}
                  spaceBetween={20}
                  slidesPerView={3} // 화면에 보여질 슬라이드 수
                  loop={true} // 무한 루프 활성화
                  autoplay={{
                    delay: 0,
                    pauseOnMouseEnter: false, // added
                    disableOnInteraction: false,
                  }}
                  speed={6000} //add
                  pagination={{ clickable: false }}
                  allowTouchMove={false}
                >
                  {data?.map((item: any, index: number) => {
                    return (
                      <SwiperSlide key={index}>
                        <MainMobileCosmeticBox cosmetic={item} key={index} />
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
              </div>
            </SlideContainer>
          )}
        </>
      ) : (
        <>
          {innerWidth > 700 ? (
            <SlideContainer>
              <Skeleton width={950} height={350} />
            </SlideContainer>
          ) : (
            <SlideContainer>
              <Skeleton width={500} height={300} />
            </SlideContainer>
          )}
        </>
      )}
    </>
  )
}

const SlideContainer = styled.div`
  height: 350px;
  width: 950px;
  background-color: fff;

  .sample-slider .swiper-wrapper {
    transition-timing-function: linear;
  }

  @media (max-width: 600px) {
    width: 100vw;
    height: 300px;
  }
`
