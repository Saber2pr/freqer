import { message } from 'antd'

import {
  CreateProductPaymentResponse,
  GetProductCheckoutResponse,
  GetProductPayments,
  GetProductResponse,
} from './interface'
import { ApiUrls, request } from './request'

export const getProduct = async (todolistProductId: number) => {
  if (!todolistProductId) {
    message.error('Product Not Found')
    return
  }

  const res = await request.get<GetProductResponse>(
    `${ApiUrls.vipGetProduct}/${todolistProductId}`,
  )

  return res.data
}

export const getProductCheckout = async (orderId: string) => {
  if (!orderId) {
    message.error('OrderId Not Found')
    return
  }

  const res = await request.get<GetProductCheckoutResponse>(
    `${ApiUrls.vipGetProductCheckout}/${orderId}`,
  )

  return res.data
}

export const createProductPayment = async (planId: string) => {
  if (!planId) {
    message.error('PlanId Not Found')
    return
  }

  const res = await request.post<CreateProductPaymentResponse>(
    `${ApiUrls.vipCreatePayment}`,
    {
      planId,
    },
  )

  return res.data
}

export const getProductPayments = async (offset: number, limit: number) => {
  const res = await request.get<GetProductPayments>(
    `${ApiUrls.vipGetPayments}/${offset}/${limit}`,
  )

  return res.data
}
