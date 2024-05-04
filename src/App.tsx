import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navbar from './components/shared/Navbar'
import HomePage from './pages'
import SigninPage from './pages/user/Signin'
import SignupPage from './pages/user/Signup'
import MyPage from './pages/user/MyPage'
import KakaoLogin from './components/auth/KakaoLogin'

import ManagerPage from './pages/manager'

import PrivateRoute from './components/auth/PrivateRoute'
import SetMainBanner from './pages/manager/main/SetMainBanner'
import SetCategoryIcons from './pages/manager/main/SetCategoryIcons'
import SetCosmeticData from './pages/manager/data/SetCosmeticData'
import BoardPage from './pages/user/board/BoardPage'
import StoreMapPage from './pages/user/StoreMapPage'
import BottomNavbar from './components/shared/BottomNavbar'
import BoardFormPage from './pages/user/board/BoardFormPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styled from '@emotion/styled'
import BoardCategoryPage from './pages/user/board/BoardCategoryPage'
import BoardDetailPage from './pages/user/board/BoardDetailPage'
import BoardEditPage from './pages/user/board/BoardEditPage'
import SetBoardData from './pages/manager/data/SetBoard'
import ManagerBoardEditForm from './components/manager/ManagerBoardEditForm'
import ManagerBoardForm from './components/manager/ManagerBoardForm'
import ManagerBoardDetail from './components/manager/ManagerBoardDetail'
import CosmeticPage from './pages/user/cosmetic'
import ManagerCosmeticForm from './components/manager/ManagerCosmeticForm'
import CosmeticDetailPage from './pages/user/cosmetic/CosmeticDetailPage'
import EventPage from './pages/user/EventPage'
import Footer from './components/shared/Footer'
import BrandInfoPage from './pages/user/BrandInfoPage'
import OrderPage from './pages/user/OrderPage'
import OrderDetailPage from './pages/user/OrderDetailPage'

function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={1000} />
      <Navbar />
      <LayoutContainer>
        <PageContainer>
          <Routes>
            <Route path="/" Component={HomePage} />
            <Route path="/auth/kakao" Component={KakaoLogin} />
            <Route path="/signin" Component={SigninPage} />
            <Route path="/signup" Component={SignupPage} />
            {/* 화장품 관련 페이지 */}
            <Route path="/cosmetic" Component={CosmeticPage} />
            <Route path="/cosmetic/:category" Component={CosmeticPage} />
            <Route path="/cosmetic/detail/:id" Component={CosmeticDetailPage} />
            {/* 게시판 & 채팅 페이지 */}
            <Route path="/board" Component={BoardPage} />
            <Route path="/board/form" Component={BoardFormPage} />
            <Route path="/board/detail/:id" Component={BoardDetailPage} />
            <Route path="/board/edit/:id" Component={BoardEditPage} />
            {/* 게시판 카테고리별 리스트 페이지 */}
            <Route path="/board/category" Component={BoardCategoryPage} />
            {/* 기타 페이지 */}
            <Route path="/storeMap" Component={StoreMapPage} />
            <Route path="/event" Component={EventPage} />
            <Route path="/info" Component={BrandInfoPage} />
            <Route path="/order" Component={OrderPage} />
            <Route path="/order/detail/:id" Component={OrderDetailPage} />

            {/* 관리자 페이지 --------------------------------------------------------- */}
            <Route path="/manager" Component={ManagerPage} />
            <Route
              path="/manager/main/setMainBanner"
              Component={SetMainBanner}
            />
            <Route
              path="/manager/main/setCategoryIcons"
              Component={SetCategoryIcons}
            />
            <Route
              path="/manager/data/setCosmeticData"
              Component={SetCosmeticData}
            />
            <Route
              path="/manager/cosmetic/form"
              Component={ManagerCosmeticForm}
            />
            <Route path="/manager/data/setBoardData" Component={SetBoardData} />
            <Route path="/manager/board/form" Component={ManagerBoardForm} />
            <Route
              path="/manager/board/detail/:id"
              Component={ManagerBoardDetail}
            />
            <Route
              path="/manager/board/edit/:id"
              Component={ManagerBoardEditForm}
            />
            {/* @TODO: 인증이 필요한 페이지 나누기 ex) 관리자,유저의 등급 ... */}
            <Route
              path="/my"
              element={
                <PrivateRoute>
                  <MyPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </PageContainer>
        <BottomNavbar />
      </LayoutContainer>
      <Footer />
    </BrowserRouter>
  )
}

const LayoutContainer = styled.div`
  position: relative;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  @media (max-width: 600px) {
    min-width: 100vw;
  }
`
const PageContainer = styled.div`
  max-width: 1400px;

  @media (max-width: 600px) {
    max-width: 100vw;
  }
  @media (min-width: 600px) {
    max-width: 1400px;
    min-width: 1200px;
    padding-bottom: 0;
  }
`
export default App
