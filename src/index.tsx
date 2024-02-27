import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

import { Global } from '@emotion/react'
import globalStyles from './styles/globalStyles'
import { RecoilRoot } from 'recoil'
import { AlertContextProvider } from './contexts/AlertContext'
import AuthGuard from './components/auth/AuthGuard'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Global styles={globalStyles} />
    <RecoilRoot>
      <AlertContextProvider>
        <AuthGuard>
          <App />
        </AuthGuard>
      </AlertContextProvider>
    </RecoilRoot>
  </React.StrictMode>,
)

reportWebVitals()
