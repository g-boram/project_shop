import BeautyYoutube from '@/components/main/BeautyYoutube'
import IngEvent from '@/components/main/IngEvent'
import MoveLinkImg from '@/components/main/MoveLinkImg'
import SlideBanner from '@/components/main/SlideBanner'
import SlideTopItem from '@/components/main/SlideTopItem'
import Search from '@/components/shared/Search'
import MainBanner from '@/components/user/MainBanner'
import MainCosmeticList from '@/components/user/MainCosmeticList'
import MainIconBox from '@/components/user/MainIconBox'
import styled from '@emotion/styled'

// 메인 페이지
// : 누구나 볼수있음
function HomePage() {
  return (
    <Layout>
      <MainBanner />
      <MainIconBox />
      <Search />
      <MainCosmeticList />
      <SlideBanner />
      <IngEvent />
      <MoveLinkImg />
      <BeautyYoutube />
      <SlideTopItem />
    </Layout>
  )
}

const Layout = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`
export default HomePage
