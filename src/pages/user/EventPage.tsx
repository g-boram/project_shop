import HeadTitle from '@/components/shared/HeadTitle'
import styled from '@emotion/styled'

import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules'
import Text from '@/components/shared/Text'
import Flex from '@/components/shared/Flex'
import Button from '@/components/shared/Button'
import Spacing from '@/components/shared/Spacing'
import { useState } from 'react'

const EventPage = () => {
  const [changeEvent, setChangeEvent] = useState(0)

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
                src="https://swiperjs.com/demos/images/nature-2.jpg"
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
                    color="pink"
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
                src="https://swiperjs.com/demos/images/nature-3.jpg"
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
                    color="pink"
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
                src="https://swiperjs.com/demos/images/nature-4.jpg"
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
                    color="pink"
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
                src="https://swiperjs.com/demos/images/nature-5.jpg"
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
                    color="pink"
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
                src="https://swiperjs.com/demos/images/nature-6.jpg"
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
                    color="pink"
                    size="large"
                    onClick={() => setChangeEvent(5)}
                  >
                    자세히 보기
                  </Button>
                </Flex>
              </SlideDescBox>
            </SlideBox>
          </SwiperSlide>
        </Swiper>
      </EventListBox>
    </EventPageContainer>
  )
}

const SlideBox = styled.div``
const SlideDescBox = styled.div``
const EventPageContainer = styled.div`
  width: 100%;
  background-color: pink;
`
const EventListBox = styled.div`
  width: 100%;
  background-color: grey;
  padding: 10px 0;

  .swiper {
    width: 100%;
    height: 450px;
    padding-top: 50px;
    padding-bottom: 50px;
  }

  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    height: 300px;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
  }
`
export default EventPage
