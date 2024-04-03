import HeadTitle from '@/components/shared/HeadTitle'
import styled from '@emotion/styled'
import Text from '@/components/shared/Text'
import Flex from '@/components/shared/Flex'
import Button from '@/components/shared/Button'
import Spacing from '@/components/shared/Spacing'

import { EffectCoverflow, Pagination } from 'swiper/modules'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

const EventPage = () => {
  const [changeEvent, setChangeEvent] = useState(0)

  const renderEvent = () => {
    if (changeEvent === 1) {
      return (
        <img
          src={`${process.env.PUBLIC_URL}/images/event/slideEvent1_1.jpg`}
          alt=""
        />
      )
    }
    if (changeEvent === 2) {
      return (
        <img
          src={`${process.env.PUBLIC_URL}/images/event/slideEvent2_1.jpg`}
          alt=""
        />
      )
    }
    if (changeEvent === 3) {
      return (
        <img
          src={`${process.env.PUBLIC_URL}/images/event/slideEvent3_1.jpg`}
          alt=""
        />
      )
    }
    if (changeEvent === 4) {
      return (
        <img
          src={`${process.env.PUBLIC_URL}/images/event/slideEvent4_1.jpg`}
          alt=""
        />
      )
    }
    if (changeEvent === 5) {
      return (
        <img
          src={`${process.env.PUBLIC_URL}/images/event/slideEvent5_1.jpg`}
          alt=""
        />
      )
    }
    if (changeEvent === 6) {
      return (
        <img
          src={`${process.env.PUBLIC_URL}/images/event/slideEvent6_1.jpg`}
          alt=""
        />
      )
    }
  }
  return (
    <EventPageContainer>
      <HeadTitle title="Event Page" desc="진행중인 이벤트 확인하기" />
      {/* <ChangeBtnLine></ChangeBtnLine> */}
      <EventListBox>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <SlideBox>
              <img
                src={`${process.env.PUBLIC_URL}/images/event/slideEvent1.jpg`}
                alt=""
              />
              <SlideDescBox>
                <Flex direction="column" align={'center'} justify={'center'}>
                  <Spacing size={20} />
                  <Text typography="t4">이벤트 이름</Text>
                  <Spacing size={5} />
                  <Text typography="t6">이벤트 설명</Text>
                  <Spacing size={20} />
                  <Button
                    color="grey"
                    size="large"
                    onClick={() => setChangeEvent(1)}
                  >
                    자세히 보기
                  </Button>
                </Flex>
              </SlideDescBox>
            </SlideBox>
          </SwiperSlide>
          <SwiperSlide>
            <SlideBox>
              <img
                src={`${process.env.PUBLIC_URL}/images/event/slideEvent2.jpg`}
                alt=""
              />
              <SlideDescBox>
                <Flex direction="column" align={'center'} justify={'center'}>
                  <Spacing size={20} />
                  <Text typography="t4">이벤트 이름</Text>
                  <Spacing size={5} />
                  <Text typography="t6">이벤트 설명</Text>
                  <Spacing size={20} />
                  <Button
                    color="grey"
                    size="large"
                    onClick={() => setChangeEvent(2)}
                  >
                    자세히 보기
                  </Button>
                </Flex>
              </SlideDescBox>
            </SlideBox>
          </SwiperSlide>
          <SwiperSlide>
            <SlideBox>
              <img
                src={`${process.env.PUBLIC_URL}/images/event/slideEvent3.jpg`}
                alt=""
              />
              <SlideDescBox>
                <Flex direction="column" align={'center'} justify={'center'}>
                  <Spacing size={20} />
                  <Text typography="t4">이벤트 이름</Text>
                  <Spacing size={5} />
                  <Text typography="t6">이벤트 설명</Text>
                  <Spacing size={20} />
                  <Button
                    color="grey"
                    size="large"
                    onClick={() => setChangeEvent(3)}
                  >
                    자세히 보기
                  </Button>
                </Flex>
              </SlideDescBox>
            </SlideBox>
          </SwiperSlide>
          <SwiperSlide>
            <SlideBox>
              <img
                src={`${process.env.PUBLIC_URL}/images/event/slideEvent4.jpg`}
                alt=""
              />
              <SlideDescBox>
                <Flex direction="column" align={'center'} justify={'center'}>
                  <Spacing size={20} />
                  <Text typography="t4">이벤트 이름</Text>
                  <Spacing size={5} />
                  <Text typography="t6">이벤트 설명</Text>
                  <Spacing size={20} />
                  <Button
                    color="grey"
                    size="large"
                    onClick={() => setChangeEvent(4)}
                  >
                    자세히 보기
                  </Button>
                </Flex>
              </SlideDescBox>
            </SlideBox>
          </SwiperSlide>
          <SwiperSlide>
            <SlideBox>
              <img
                src={`${process.env.PUBLIC_URL}/images/event/slideEvent5.jpg`}
                alt=""
              />
              <SlideDescBox>
                <Flex direction="column" align={'center'} justify={'center'}>
                  <Spacing size={20} />
                  <Text typography="t4">이벤트 이름</Text>
                  <Spacing size={5} />
                  <Text typography="t6">이벤트 설명</Text>
                  <Spacing size={20} />
                  <Button
                    color="grey"
                    size="large"
                    onClick={() => setChangeEvent(5)}
                  >
                    자세히 보기
                  </Button>
                </Flex>
              </SlideDescBox>
            </SlideBox>
          </SwiperSlide>
          <SwiperSlide>
            <SlideBox>
              <img
                src={`${process.env.PUBLIC_URL}/images/event/slideEvent6.jpg`}
                alt=""
              />
              <SlideDescBox>
                <Flex direction="column" align={'center'} justify={'center'}>
                  <Spacing size={20} />
                  <Text typography="t4">이벤트 이름</Text>
                  <Spacing size={5} />
                  <Text typography="t6">이벤트 설명</Text>
                  <Spacing size={20} />
                  <Button
                    color="grey"
                    size="large"
                    onClick={() => setChangeEvent(6)}
                  >
                    자세히 보기
                  </Button>
                </Flex>
              </SlideDescBox>
            </SlideBox>
          </SwiperSlide>
        </Swiper>
      </EventListBox>
      <EventContentBox>{renderEvent()}</EventContentBox>
    </EventPageContainer>
  )
}

const SlideBox = styled.div``
const SlideDescBox = styled.div`
  height: 300px;
`
const EventContentBox = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  justify-content: center;

  & img {
    height: auto;
    width: 100%;
    object-fit: contain;
  }
`
const EventPageContainer = styled.div`
  width: 100%;
  margin-top: 20px;

  @media (max-width: 600px) {
    width: 100vw;
  }
`
const EventListBox = styled.div`
  width: 100%;

  .swiper {
    width: 100%;
    height: 580px;
    margin-bottom: 30px;
  }

  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    height: 380px;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
  }

  .swiper-pagination-bullet-active {
    background-color: #000;
  }
`
export default EventPage
