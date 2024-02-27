import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navbar from './components/shared/Navbar'
import HomePage from './pages'
import SigninPage from './pages/user/Signin'
import SignupPage from './pages/user/Signup'
import MyPage from './pages/user/MyPage'
import PrivateRoute from './components/auth/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
      {/* <Layout> */}
      <Navbar />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/signin" Component={SigninPage} />
        <Route path="/signup" Component={SignupPage} />
        <Route path="/my" Component={MyPage} />
        {/* 
          @TODO: 인증이 필요한 페이지 나누기 ex) 관리자,유저의 등급 ...
          <Route path='' element={
            <PrivateRoute>
              <oooooPage />
            </PrivateRoute>
          }/> 
        */}
      </Routes>
      {/* </Layout> */}
    </BrowserRouter>
  )
}

export default App
