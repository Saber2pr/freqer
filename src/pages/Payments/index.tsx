import { Divider, Typography } from 'antd'
import React from 'react'

import { PaymentList } from '@/components/paymentList'

import { Contain } from './index.style'

export interface PaymentsPageProps {}

export const PaymentsPage: React.FC<PaymentsPageProps> = ({}) => {
  return (
    <Contain>
      <Typography.Title>Payments</Typography.Title>
      <Typography.Paragraph>
        Click on the card below to view details.
      </Typography.Paragraph>
      <Divider />
      <PaymentList />
    </Contain>
  )
}
