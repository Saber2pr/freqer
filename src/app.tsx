import 'normalize.css'

import { message, Spin } from 'antd'
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter, Route, Routes, useNavigate } from 'react-router-dom'

import { getUserInfo, setCode } from './api'
import { getConfig } from './api/common'
import { Container, Content, GlobalStyle } from './app.style'
import { Footer } from './components/footer'
import { Header } from './components/header'
import { useAsync } from './hooks/useAsync'
import { AccountPage } from './pages/Account'
import { ConfirmResetPage } from './pages/confirmReset'
import { LoginPage } from './pages/Login'
import { ProductsPage } from './pages/Products'
import { RegisterPage } from './pages/Register'
import { ResetPage } from './pages/Reset'
import { commonSlice } from './store/common'
import { store, useAppDispatch, useAppSelector } from './store/store'
import { parseUrlParam } from './utils/parseUrlParam'

message.config({
  top: 48,
})

export const App = () => {
  const loadingInfo = useAppSelector((state) => state?.common?.loadingInfo)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { loading } = useAsync(async () => {
    const config = await getConfig()
    dispatch(commonSlice.actions.setConfig(config))

    const query = parseUrlParam(location.search)
    if (query?.code) {
      setCode(query?.code)
      navigate('/confirmReset')
      return
    }

    const userInfo = await getUserInfo()
    dispatch(commonSlice.actions.setUserInfo(userInfo))
  }, [])

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
      <Spin spinning={loadingInfo?.loading || loading} tip={loadingInfo?.text}>
        <Content>
          <Routes>
            <Route path="/account" element={<AccountPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/reset" element={<ResetPage />}></Route>
            <Route path="/confirmReset" element={<ConfirmResetPage />}></Route>
            <Route path="/payments" element={<ProductsPage />}></Route>
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
