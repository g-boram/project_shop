import styled from '@emotion/styled'
import Flex from './Flex'
import Spacing from './Spacing'
import stores from '@/mock/storeData.json'

import { css } from '@emotion/react'
import { useEffect, useRef, useState } from 'react'
import Skeleton from './Skeleton'

declare global {
  interface Window {
    kakao: any
  }
}

function Map() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentStore, setCurrentStore] = useState('')
  const mapContainer = useRef(null)

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
            // setLocation({
            //   ...location,
            //   lat: store.lat,
            //   lng: store.lng,
            // })
          })
        })
      })
    }
    setIsLoading(false)
  }

  useEffect(() => {
    loadKakaoMap()
  }, [])

  console.log('currentStore', currentStore)
  return (
    <MapBox>
      {isLoading ? (
        <Skeleton width={'100%'} height={600} />
      ) : (
        <MapArea ref={mapContainer}></MapArea>
      )}

      {/* <MapWrapper>
        <MapArea ref={mapContainer}></MapArea>
        <Spacing size={20} />
        <Flex justify={'center'}>
          <a
            href={location.link}
            target="_blank"
            rel="noreferrer"
            css={linkBtnStyle}
          >
            길 찾기
          </a> 
        </Flex>
      </MapWrapper> */}
    </MapBox>
  )
}

const MapBox = styled.div``
const MapWrapper = styled.div`
  width: 100%;
`
const infowindow = css`
  height: 200px;
  width: 400px:
  background-color: grey;
`
const linkBtnStyle = css`
  padding: 10px 15px;
  border-radius: 15px;
  border: 1px solid #eee;
  &: hover {
    background-color: #eee;
  }
`
const MapArea = styled.div`
  height: 600px;
  width: 100%:
  z-index: 1;
  
  @media (max-width: 600px) {
    height: 300px;
    width: 100%:
  }
`
export default Map
