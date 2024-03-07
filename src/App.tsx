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
// import Layout from './components/shared/Layout'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styled from '@emotion/styled'
import BoardCategoryPage from './pages/user/board/BoardCategoryPage'

function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={1000} />
      <LayoutContainer>
        <Navbar />
        <PageContainer>
          <Routes>
            <Route path="/" Component={HomePage} />
            <Route path="/auth/kakao" Component={KakaoLogin} />
            <Route path="/signin" Component={SigninPage} />
            <Route path="/signup" Component={SignupPage} />
            <Route path="/my" Component={MyPage} />
            {/* 게시판 & 채팅 페이지 */}
            <Route path="/board" Component={BoardPage} />
            {/* 게시판 글작성 페이지 */}
            <Route path="/board/form" Component={BoardFormPage} />
            {/* 게시판 카테고리별 리스트 페이지 */}
            <Route path="/board/category" Component={BoardCategoryPage} />
            <Route path="/storeMap" Component={StoreMapPage} />
            {/* 관리자 페이지 */}
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
            {/* 
            @TODO: 인증이 필요한 페이지 나누기 ex) 관리자,유저의 등급 ...
            <Route path='' element={
              <PrivateRoute>
                <oooooPage />
              </PrivateRoute>
            }/> 
          */}
          </Routes>
        </PageContainer>
        <BottomNavbar />
      </LayoutContainer>
    </BrowserRouter>
  )
}

const LayoutContainer = styled.div`
  position: relative;
  height: 100vh;
`
const PageContainer = styled.div`
  height: auto;
  overflow: scroll;
  padding-bottom: 80px;
`
export default App
