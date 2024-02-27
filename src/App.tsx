import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from './components/shared/Layout'
import Navbar from './components/shared/Navbar'
import HomePage from './pages'
import SigninPage from './pages/user/Signin'
import SignupPage from './pages/user/Signup'

function App() {
  return (
    <BrowserRouter>
      {/* <Layout> */}
      <Navbar />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/signin" Component={SigninPage} />
        <Route path="/signup" Component={SignupPage} />
      </Routes>
      {/* </Layout> */}
    </BrowserRouter>
  )
}

export default App
