import 'normalize.css'

import { message, Spin } from 'antd'
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {
  HashRouter,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from 'react-router-dom'

import { getToken, getUserInfo, setCode } from './api'
import { Container, Content, GlobalStyle } from './app.style'
import { Footer } from './components/footer'
import { Header } from './components/header'
import { useAsync } from './hooks/useAsync'
import { AccountPage } from './pages/Account'
import { ConfirmResetPage } from './pages/confirmReset'
import { LoginPage } from './pages/Login'
import { PaymentsPage } from './pages/Payments'
import { RegisterPage } from './pages/Register'
import { ResetPage } from './pages/Reset'
import { commonSlice } from './store/common'
import { store, useAppDispatch, useAppSelector } from './store/store'
import { parseUrlParam } from './utils/parseUrlParam'
import { StrategyList } from './pages/StrategyList'
import { StrategyInfo } from './pages/StrategyInfo'

message.config({
  top: 48,
})

export const App = () => {
  const loadingInfo = useAppSelector((state) => state?.common?.loadingInfo)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useAsync(async () => {
    const query = parseUrlParam(location.search)
    if (query?.code) {
      setCode(query?.code)
      navigate('/confirmReset')
      return
    }

    if (getToken()) {
      const userInfo = await getUserInfo()
      dispatch(commonSlice.actions.setUserInfo(userInfo))
    }
  }, [])

  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    const handle = () => {
      dispatch(
        commonSlice.actions.setLoading({
          loading: false,
          text: '',
        }),
      )
    }
    window.addEventListener('unload', handle)
    return () => {
      window.removeEventListener('unload', handle)
    }
  }, [])

  return (
    <Container>
      {/* @ts-ignore */}
      <GlobalStyle />
      <Header />
      <Spin spinning={loadingInfo?.loading} tip={loadingInfo?.text}>
        <Content>
          <Routes>
            <Route path="/" element={<StrategyList />}></Route>
            <Route path="/strategy/:id" element={<StrategyInfo />}></Route>
            <Route path="/account" element={<AccountPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/reset" element={<ResetPage />}></Route>
            <Route path="/confirmReset" element={<ConfirmResetPage />}></Route>
            <Route path="/payments" element={<PaymentsPage />}></Route>
          </Routes>
        </Content>
      </Spin>
      <Footer />
    </Container>
  )
}

const Index = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'))
