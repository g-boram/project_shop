import HeadTitle from '@/components/shared/HeadTitle'
import UserPageLayout from '@/components/shared/Layout/UserPageLayout'
import Map from '@/components/shared/Map'
import Markers from '@/components/shared/Markers'
import { Location } from '@/models/location'
import styled from '@emotion/styled'
import * as stores from '@/mock/storeData.json'
import { useState } from 'react'

function StoreMapPage() {
  // const location: Location = {
  //   lat: 37.497625203,
  //   lng: 127.03088379,
  //   name: 'test',
  //   address: 'address',
  //   link: 'link',
  //   waytocome: {
  //     metro: ['지하철 타고 오기'],
  //     bus: ['버스 타고 오기'],
  //   },
  // }

  const [map, setMap] = useState(null)
  const storeDatas = stores["DATA"]

  return (
    <UserPageLayout>
      <HeadTitle title="매장찾기" desc="오프라인 위치 찾기" />
      <MapContainer>
        <Map setMap={setMap} />
        <Markers storeDatas={storeDatas} map={map} />
      </MapContainer>
    </UserPageLayout>
  )
}

const MapContainer = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
`
export default StoreMapPage
