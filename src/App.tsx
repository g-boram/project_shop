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

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/auth/kakao" Component={KakaoLogin} />
        <Route path="/signin" Component={SigninPage} />
        <Route path="/signup" Component={SignupPage} />
        <Route path="/my" Component={MyPage} />
        {/* 관리자 페이지 */}
        <Route path="/manager" Component={ManagerPage} />
        <Route path="/manager/main" Component={M_MainPage} />
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
