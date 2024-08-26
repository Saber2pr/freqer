import { message } from 'antd'
import axios, { AxiosError } from 'axios'

const tokenKey = 'token'
const codeKey = 'code'

export const setToken = (token: string) => localStorage.setItem(tokenKey, token)
export const clearToken = () => localStorage.removeItem(tokenKey)
export const getToken = () => localStorage.getItem(tokenKey)

export const setCode = (code: string) => localStorage.setItem(codeKey, code)
export const clearCode = () => localStorage.removeItem(codeKey)
export const getCode = () => localStorage.getItem(codeKey)

const request = axios.create({
  baseURL: 'https://strapi.saber2pr.top',
})

export const ApiUrls = {
  me: `/api/users/me`,
  register: `/api/auth/local/register`,
  login: `/api/auth/local`,
  forgot: `/api/auth/forgot-password`,
  reset: `/api/auth/reset-password`,
  vipGetProduct: '/api/strapi-paypal/getProduct',
  vipGetProductCheckout: '/api/strapi-paypal/getPaypalCheckout',
  vipCreatePayment: '/api/strapi-paypal/createProductPayment',
  vipGetPayments: '/api/strapi-paypal/getPayments',
  getStrategy: '/api/strategy-products/getStrategy',
}

const WhiteUrls = [
  ApiUrls.login,
  ApiUrls.register,
  ApiUrls.forgot,
  ApiUrls.reset,
]

request.interceptors.request.use((config) => {
  const isWhite = WhiteUrls.includes(config.url)

  const token = getToken()
  if (token && !isWhite) {
    config.headers.setAuthorization(`Bearer ${token}`)
  }
  return config
})

request.interceptors.response.use(
  (res) => {
    return res
  },
  (error: AxiosError<any>) => {
    if (error?.response?.status === 401) {
      clearToken()
      // location.hash = '/login'
    } else {
      const errorMsg = error?.response?.data?.error?.message
      if (errorMsg) {
        message.error(errorMsg)
      }
    }
  },
)

export { request }
