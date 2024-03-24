import HeadTitle from '@/components/shared/HeadTitle'
import Map from '@/components/shared/Map'
import styled from '@emotion/styled'

function StoreMapPage() {
  return (
    <>
      <HeadTitle title="매장찾기" desc="오프라인 위치 찾기" />
      <Map />
    </>
  )
}

export default StoreMapPage
