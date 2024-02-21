import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

import styled from '@emotion/styled'
import { css } from '@emotion/react'

const Container = styled.div`
  height: 100px;
  width: 100%;
  color: pink;
`

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Container>Hello</Container>
    <h2
      css={css`
        color: pink;
      `}
    >
      React
    </h2>
    <App />
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
