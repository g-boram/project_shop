import { Location } from '@/models/location'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import Flex from './Flex'
import Spacing from './Spacing'

import * as stores from '@/mock/storeData'

declare global {
  interface Window {
    kakao: any
  }
}
interface MapProps {
  setMap: Dispatch<SetStateAction<any>>
}

// function Map({ location }: { location: Location }) {

//   const mapContainer = useRef(null)

//   useEffect(() => {
//     const script = document.createElement('script')
//     script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_APP_MAP_KEY}&autoload=false`
//     script.async = true

//     document.head.appendChild(script)

//     script.onload = () => {
//       window.kakao.maps.load(() => {
//         const position = new window.kakao.maps.LatLng(
//           location.lat,
//           location.lng,
//         )

//         const options = {
//           center: position,
//           level: 3,
//         }
//         const market = new window.kakao.maps.Marker({
//           position,
//         })

//         const map = new window.kakao.maps.Map(mapContainer.current, options)
//         market.setMap(map)
//       })
//     }
//   }, [location])

function Map({ setMap }: MapProps) {
  // const setMap = useSetRecoilState(mapState)
  // const location = useRecoilValue(locationState)

  const mapContainer = useRef(null)
  const DEFAULT_LAT = 37.497625203
  const DEFAULT_LNG = 127.03088379

  useEffect(() => {
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
        setMap(map)
      })
    }
  }, [])

  // const loadKakaoMap = () => {
  //   window.kakao.maps.load(() => {
  //     const mapContainer = document.getElementById('map')
  //     const mapOption = {
  //       center: new window.kakao.maps.LatLng(
  //         lat ?? location.lat,
  //         lng ?? location.lng,
  //       ),
  //       level: zoom ?? location.zoom,
  //     }
  //     const map = new window.kakao.maps.Map(mapContainer, mapOption)

  //     setMap(map)
  //   })
  // }
  return (
    <MapBox>
      <MapWrapper>
        <MapArea ref={mapContainer}></MapArea>
        <Spacing size={20} />
        <Flex justify={'center'}>
          {/* <a
            href={location.link}
            target="_blank"
            rel="noreferrer"
            css={linkBtnStyle}
          >
            길 찾기
          </a> */}
        </Flex>
      </MapWrapper>
    </MapBox>
  )
}

const MapBox = styled.div``
const MapWrapper = styled.div`
  width: 100%;
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
  height: 400px;
  width: 100%:
  z-index: 1;

  @media (max-width: 600px) {
    height: 250px;
  }
`
export default Map
