import {
  Badge,
  Card,
  Descriptions,
  Divider,
  message,
  Tag,
  Typography,
} from 'antd'
import React, { useMemo } from 'react'
import { useNavigate } from 'react-router'

import { getToken } from '@/api'
import { createProductPayment, getProduct, getProductPayments } from '@/api/vip'
import { useAsync } from '@/hooks/useAsync'
import { useFormModal } from '@/hooks/useFormModal'
import { useHasProduct } from '@/hooks/useHasProduct'
import { commonSlice } from '@/store/common'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { getArray } from '@/utils'

import { Footer, Img } from './index.style'

export interface ProductProps {
  img: string
  title: string
  short: string
  description: React.ReactNode
  disabled?: boolean
}

export const Product: React.FC<ProductProps> = ({
  img,
  title,
  description,
  short,
}) => {
  const config = useAppSelector((state) => state?.common?.config)

  const { data: productInfo, loading } = useAsync(async () => {
    if (config) {
      const product = await getProduct(
        config?.data?.attributes?.todolistProductId,
      )
      return product
    }
  }, [config])

  const price = `${productInfo?.price || '-'}$/mo`

  const navigate = useNavigate()

  const hasProduct = config?.data?.attributes?.todolistProductEnabled

  const isActive = useHasProduct()

  const dispatch = useAppDispatch()
  const api = useFormModal({
    title,
    modalProps: {
      maskClosable: false,
      closable: false,
      okText: 'Accept',
      centered: true,
      width: 600,
      okButtonProps: { loading },
    },
    forms: (
      <>
        <Img src={img} />
        <Divider />
        <Descriptions
          labelStyle={{
            width: 100,
          }}
          bordered
          column={1}
        >
          <Descriptions.Item label="Product">{title}</Descriptions.Item>
          <Descriptions.Item label="Description">
            {description}
          </Descriptions.Item>
          <Descriptions.Item label="Price">{price}</Descriptions.Item>
        </Descriptions>
      </>
    ),
    initValues: null,
    async onOk() {
      if (isActive) {
        message.info('You have already got this product')
        return
      }

      dispatch(
        commonSlice.actions.setLoading({
          loading: true,
          text: 'Get Product Payment Details ...',
        }),
      )
      if (productInfo) {
        const payment = await createProductPayment(productInfo?.paypalPlanId)
        if (payment) {
          const item = getArray(payment?.paymentLinks).find(
            (item) => item.rel === 'approve',
          )
          location.href = item.href
        } else {
          message.error('Product not found')
        }
      }
    },
  })
  return (
    <Badge.Ribbon
      text={hasProduct ? 'New' : 'Preparing'}
      color={hasProduct ? 'volcano' : 'gray'}
    >
      <Card
        hoverable
        cover={<Img src={img} />}
        onClick={() => {
          if (!hasProduct) {
            message.error(
              'The product is temporarily not available for purchase',
            )
            return
          }
          if (getToken()) {
            api.setShow(true)
          } else {
            message.info('Please sign in first')
            navigate('/login')
          }
        }}
      >
        <Card.Meta
          title={title}
          description={
            <>
              <Typography.Paragraph ellipsis={{ rows: 1 }}>
                {short}
              </Typography.Paragraph>
              <Footer>
                <div>{price}</div>
                <Tag.CheckableTag checked>
                  {isActive ? 'ACCEPTED' : 'GET'}
                </Tag.CheckableTag>
              </Footer>
            </>
          }
        />
      </Card>
      {api.modal}
    </Badge.Ribbon>
  )
}
