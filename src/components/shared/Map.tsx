import styled from '@emotion/styled'
import Flex from './Flex'
import Spacing from './Spacing'
import stores from '@/mock/storeData.json'
import Skeleton from './Skeleton'
import Text from './Text'

import { IoStorefrontOutline } from 'react-icons/io5'
import { HiOutlineCursorClick } from 'react-icons/hi'
import { IoIosSend } from 'react-icons/io'
import { MdPhoneIphone } from 'react-icons/md'
import { css } from '@emotion/react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

declare global {
  interface Window {
    kakao: any
  }
}

function Map() {
  const mapContainer = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentStore, setCurrentStore] = useState<any>(null)

  const loadKakaoMap = () => {
    const storeDatas: any[] = stores['DATA']

    const DEFAULT_LAT = 37.498095
    const DEFAULT_LNG = 127.02761

    const script = document.createElement('script')
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_APP_MAP_KEY}&autoload=false`
    script.async = true

    document.head.appendChild(script)

    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapOption = {
          center: new window.kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG),
          level: 3,
        }

        const map = new window.kakao.maps.Map(mapContainer.current, mapOption)
        storeDatas?.map((store) => {
          var imageSrc = store?.category
              ? `/images/markers/${store?.category}.png`
              : '/images/markers/default.png', // 마커이미지의 주소입니다
            imageSize = new window.kakao.maps.Size(40, 40), // 마커이미지의 크기입니다
            imageOption = { offset: new window.kakao.maps.Point(27, 69) } // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

          // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
          var markerImage = new window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption,
          )

          // 마커가 표시될 위치입니다 y:위도, x:경도
          var markerPosition = new window.kakao.maps.LatLng(
            store?.lat,
            store?.lng,
          )

          // 마커를 생성합니다
          var marker = new window.kakao.maps.Marker({
            position: markerPosition,
            image: markerImage, // 마커이미지 설정
          })
          // 마커가 지도 위에 표시되도록 설정합니다
          marker.setMap(map)

          // 마커 커서가 오버되었을 때 마커 위에 표시할 인포윈도우 생성
          var content = `<div class="infowindow" style="background-color: #000; color: #fff; padding:6px 15px; border-radius: 10px; font-weight: bold;">${store?.name}</div>`

          // 커스텀 오버레이를 생성합니다
          var customOverlay = new window.kakao.maps.CustomOverlay({
            position: markerPosition,
            content: content,
            xAnchor: 0.6,
            yAnchor: 0.91,
          })

          // 마커에 마우스오버 이벤트를 등록합니다
          window.kakao.maps.event.addListener(marker, 'mouseover', function () {
            // 마커에 마우스오버 이벤트가 발생하면 커스텀 오버레이를 마커위에 표시합니다
            customOverlay.setMap(map)
          })

          // 마커에 마우스아웃 이벤트를 등록합니다
          window.kakao.maps.event.addListener(marker, 'mouseout', function () {
            // 마커에 마우스아웃 이벤트가 발생하면 커스텀 오버레이를 제거합니다
            customOverlay.setMap(null)
          })

          // 선택한 가게 저장
          window.kakao.maps.event.addListener(marker, 'click', function () {
            setCurrentStore(store)
          })
        })
      })
    }
    setIsLoading(false)
  }

  useEffect(() => {
    loadKakaoMap()
  }, [])

  return (
    <>
      <MapBox>
        {isLoading ? (
          <Skeleton width={'100%'} height={600} />
        ) : (
          <MapArea ref={mapContainer}></MapArea>
        )}
      </MapBox>
      <StoreDescBox>
        <HeadLine />
        <DescBox>
          <DescWrapper>
            {currentStore ? (
              <Flex
                css={flexMobileStyle}
                justify={'space-between'}
                align={'center'}
              >
                <Flex align={'center'} css={markerMobileStyle}>
                  <IconBox>
                    <img
                      src={
                        currentStore?.category
                          ? `/images/markers/${currentStore?.category}.png`
                          : '/images/markers/default.png'
                      }
                      alt=""
                    />
                  </IconBox>
                  <Flex
                    direction="column"
                    css={css`
                      margin: 0px 30px;
                      @media (max-width: 600px) {
                        margin: 0px;
                        width: 100%;
                      }
                    `}
                  >
                    <Text typography="t6" css={categoryStyle}>
                      {currentStore.category} / {currentStore.code_name}
                    </Text>
                    <Spacing size={10} />
                    <Text typography="t4" bold css={categoryStyle}>
                      {currentStore.name}
                    </Text>
                    <Spacing size={20} />
                    <Text typography="t6" css={categoryStyle}>
                      운영시간: {currentStore.open} ~ {currentStore.close}
                    </Text>
                    <Spacing size={5} />
                    <Text typography="t6" css={categoryStyle}>
                      매주 {currentStore.weekClose} 휴무
                    </Text>
                    <Spacing size={10} />
                    <Text typography="t6" css={categoryStyle}>
                      Tel: {currentStore.tel_no}
                    </Text>
                    <Spacing size={10} />
                    <Text typography="t6" css={categoryStyle}>
                      {currentStore.address}
                    </Text>
                  </Flex>
                </Flex>
                <Flex css={flexMobileJustify}>
                  <a href={`tel:${currentStore.tel_no}`}>
                    <Flex direction="column" align={'center'}>
                      <MdPhoneIphone size={30} />
                      <Spacing size={10} />
                      전화 걸기
                    </Flex>
                  </a>
                  <Spacing size={20} direction="horizontal" />
                  <Link to={'/'}>
                    <Flex direction="column" align={'center'}>
                      <IoIosSend size={30} />
                      <Spacing size={10} />
                      사이트 이동
                    </Flex>
                  </Link>
                </Flex>
              </Flex>
            ) : (
              <NoCurrentBox>
                <Flex>
                  <IoStorefrontOutline size={30} />
                  <Spacing size={10} direction="horizontal" />
                  <HiOutlineCursorClick size={20} />
                </Flex>
                <Spacing size={10} />
                <Text typography="t5">
                  Boramy 제품을 직접 확인하고 사용해볼 수 있는
                </Text>
                <Text typography="t5">오프라인 매장!</Text>
                <Spacing size={30} />
                <Text typography="t5">지도에 표시된 마커를 클릭 해보세요</Text>
                <Spacing size={10} />
                <Text typography="t5">
                  오프라인 매장의 정보를 확인할 수 있습니다
                </Text>
              </NoCurrentBox>
            )}
          </DescWrapper>
        </DescBox>
      </StoreDescBox>
    </>
  )
}

const NoCurrentBox = styled.div`
  width: 100%;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const MapBox = styled.div`
  width: 100%;
  @media (max-width: 600px) {
    width: 100vw;
    margin-top: 30px;
  }
`

const HeadLine = styled.div`
  height: 50px;
  width: 95%;
  margin-top: 40px;
  background-color: #303030;
  border-radius: 15px 15px 0 0;
`
const DescWrapper = styled.div`
  width: 95%;
  min-height: 170px;
  background-color: white;
  padding: 10px;
  border-radius: 10px;

  @media (max-width: 600px) {
    width: 87%;
    padding: 15px;
  }
`
const DescBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: 15px 0;
  width: 95%;
  background-color: #eee;
  border-radius: 0 0 15px 15px;
`
const IconBox = styled.div`
  height: 100px;
  width: 100px;
  margin-left: 20px;

  @media (max-width: 600px) {
    height: 60px;
    width: 60px;
    margin-bottom: 20px;
  }
  & img {
    height: 100%;
    width: 100%;
  }
`
const StoreDescBox = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 600px) {
    margin-bottom: 80px;
  }
`

const categoryStyle = css`
  display: contents;
`
const markerMobileStyle = css`
  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
  }
`
const flexMobileStyle = css`
  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
  }
`
const flexMobileJustify = css`
  width: 20%;
  @media (max-width: 600px) {
    width: 100%;
    margin-top: 40px;
    justify-content: space-around;
  }
`
const MapArea = styled.div`
  height: 500px;
  width: 100%:
  z-index: 1;
  
  @media (max-width: 600px) {
    height: 300px;
    width: 100%:
  }
`
export default Map
