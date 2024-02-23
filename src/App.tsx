import { useAlertContext } from './contexts/AlertContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from './components/shared/Layout'
import Navbar from './components/shared/Navbar'
import HomePage from './pages'
import styled from '@emotion/styled'

function App() {
  const { open } = useAlertContext()

  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Layout>
        <Routes>
          <Route path="/" Component={HomePage} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
