export interface RegisterUserParams {
  username: string
  password: string
  email: string
}
export interface RegisterUserResponse {
  jwt: string
  user: {
    id: number
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
    level: number
    createdAt: string
    updatedAt: string
  }
}

export interface LoginUserParams {
  identifier: string
  password: string
}

export interface LoginUserResponse {
  jwt: string
  user: {
    id: number
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
    level: number
    createdAt: string
    updatedAt: string
  }
}

export interface GerUserInfoResponse {
  id: number
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  level: number
  createdAt: string
  updatedAt: string
}

export interface ForgotPwdParams {
  email: string
}

export interface ForgotPwdResponse {}

export interface ResetPwdParams {
  code: string
  password: string
  passwordConfirmation: string
}

export interface ResetPwdResponse {}

export interface GetProductResponse {
  id: number
  title: string
  slug: object
  description: string
  price: number
  currency: string
  isSubscription: boolean
  interval: string
  trialPeriodDays: number
  paypalOrderId: object
  paypalSubcriptionId: string
  paypalLinks: Array<{ rel: string; href: string; method: string }>
  createdAt: string
  updatedAt: string
  paypalPayment: Array<undefined>
  createdBy: object
  updatedBy: object
  paypalPlanId: string
}

export interface GetProductCheckoutResponse {
  status: string
  status_update_time: string
  id: string
  plan_id: string
  start_time: string
  quantity: string
  shipping_amount: {
    currency_code: string
    value: string
  }
  subscriber: {
    email_address: string
    payer_id: string
    name: {
      given_name: string
      surname: string
    }
    shipping_address: {
      address: {
        address_line_1: string
        admin_area_2: string
        admin_area_1: string
        postal_code: string
        country_code: string
      }
    }
  }
  billing_info: {
    outstanding_balance: {
      currency_code: string
      value: string
    }
    cycle_executions: Array<{
      tenure_type: string
      sequence: number
      cycles_completed: number
      cycles_remaining: number
      current_pricing_scheme_version: number
      total_cycles: number
    }>
    last_payment: {
      amount: {
        currency_code: string
        value: string
      }
      time: string
    }
    next_billing_time: string
    final_payment_time: string
    failed_payments_count: number
  }
  create_time: string
  update_time: string
  plan_overridden: boolean
  links: Array<{ href: string; rel: string; method: string }>
}

export interface GetConfigResponse {
  data: {
    id: number
    attributes: {
      todolistProductId: number
      todolistProductEnabled: boolean
      createdAt: string
      updatedAt: string
      publishedAt: string
    }
  }
  meta: {}
}

export interface CreateProductPaymentResponse {
  id: number
  txnDate: string
  transactionId: string
  isTxnSuccessful: boolean
  txnMessage: object
  txnErrorMessage: object
  txnAmount: object
  createdAt: string
  updatedAt: string
  customerId: string
  paymentLinks: Array<{ rel: string; href: string; method: string }>
  paypalProduct: object
  createdBy: object
  updatedBy: object
}

export type GetProductPayments = [
  Array<{
    id: number
    txnDate: string
    transactionId: string
    isTxnSuccessful: boolean
    txnMessage: object
    txnErrorMessage: object
    txnAmount: object
    createdAt: string
    updatedAt: string
    customerId: string
    status: 'pending' | 'active' | 'inactive'
    paymentLinks: Array<{ rel: string; href: string; method: string }>
    paypalProduct: object
    createdBy: object
    updatedBy: object
  }>,
  number,
]
