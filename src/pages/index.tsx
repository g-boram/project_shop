import Search from '@/components/shared/Search'
import MainBanner from '@/components/user/MainBanner'
import MainCosmeticList from '@/components/user/MainCosmeticList'
import MainIconBox from '@/components/user/MainIconBox'
import styled from '@emotion/styled'

// 메인 페이지
// : 누구나 볼수있음
function HomePage() {
  return (
    <>
      <MainBanner />
      <MainIconBox />
      <Search />
      <MainCosmeticList />
    </>
  )
}

export default HomePage
