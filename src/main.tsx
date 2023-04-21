import './index.css'
import 'antd/dist/reset.css'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
import { Routes } from './lib/routes'
import React from 'react'
import ReactDOM from 'react-dom/client'
import dayjs from 'dayjs'
import ruRU from 'antd/es/locale/ru_RU'
dayjs.locale('ru')

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider
      locale={ruRU}
      theme={{
        token: {
          colorPrimary: '#ffdd2d',
          colorWarning: '#fab619',
          colorError: '#f52222',
          colorInfo: '#428bf9',
          colorSuccess: '#00b92d',
          colorTextBase: '#000000cc',
        },
      }}
    >
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter basename="/tinkoff-cup">
            <Routes />
          </BrowserRouter>
        </QueryClientProvider>
      </RecoilRoot>
    </ConfigProvider>
  </React.StrictMode>
)
