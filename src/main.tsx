import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import { API_KEY } from 'constants/api'
import Router from './Router'
import 'assets/index.css'

axios.interceptors.request.use(
  (config) => {
    config.headers['x-api-key'] = API_KEY
    return config
  },
  (error) => {
    return error
  }
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>
)
