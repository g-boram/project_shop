import Navbar from '@/components/shared/Navbar'
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
      <HomePageContainer>
        <HomeComponentWrapper>
          <Navbar />
          <MainBanner />
          <MainIconBox />

          <Search />
          <MainCosmeticList />
        </HomeComponentWrapper>
        <BottomNavbar>bottom</BottomNavbar>
      </HomePageContainer>
    </>
  )
}

const HomeComponentWrapper = styled.div`
  height: 100%;
  overflow: scroll;
`

const HomePageContainer = styled.div`
  position: relative;
  background: #fbfbfb;
  max-width: 1440px;
  height: 100vh;
`
const BottomNavbar = styled.div`
  position: absolute;
  background-color: pink;
  height: 80px;
  width: 100%;
  display: sticky;
  bottom: 0;
  @media (min-width: 600px) {
    display: none;
  }
`
export default HomePage
