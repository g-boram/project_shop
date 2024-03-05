import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navbar from './components/shared/Navbar'
import HomePage from './pages'
import SigninPage from './pages/user/Signin'
import SignupPage from './pages/user/Signup'
import MyPage from './pages/user/MyPage'
import KakaoLogin from './components/auth/KakaoLogin'

import ManagerPage from './pages/manager'
import M_MainPage from './pages/manager/main'

import PrivateRoute from './components/auth/PrivateRoute'
import SetMainBanner from './pages/manager/main/SetMainBanner'
import SetCategoryIcons from './pages/manager/main/SetCategoryIcons'
import SetCosmeticData from './pages/manager/data/SetCosmeticData'
import BoardPage from './pages/user/BoardPage'
import StoreMapPage from './pages/user/StoreMapPage'

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/auth/kakao" Component={KakaoLogin} />
        <Route path="/signin" Component={SigninPage} />
        <Route path="/signup" Component={SignupPage} />
        <Route path="/my" Component={MyPage} />
        <Route path="/board" Component={BoardPage} />
        <Route path="/storeMap" Component={StoreMapPage} />
        {/* 관리자 페이지 */}
        <Route path="/manager" Component={ManagerPage} />
        <Route path="/manager/main/setMainBanner" Component={SetMainBanner} />
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
    </BrowserRouter>
  )
}

export default App
