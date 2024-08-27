import {
  Alert,
  Button,
  Descriptions,
  Divider,
  message,
  Modal,
  Result,
  Spin,
  Typography,
} from 'antd'
import React, { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { getStrategy, getStrategyList } from '@/api/strategy'
import { Code } from '@/components/code'
import { useAsync } from '@/hooks/useAsync'
import { useBacktestInfo } from '@/hooks/useBacktestInfo'
import { useIsLogined } from '@/hooks/useIsLogined'
import { getArray } from '@/utils'

import { CodeWrap, Contain, CopyBtn, Iframe } from './index.style'
import { createProductPayment, getProduct } from '@/api/vip'

export interface StrategyInfoProps {}

const highStyle = {
  background: 'antiquewhite',
}

export const StrategyInfo: React.FC<StrategyInfoProps> = ({}) => {
  const { data: list, loading } = useAsync(() => getStrategyList(), [])

  const navigate = useNavigate()

  const params = useParams()
  const [frameLoading, setFrameLoading] = useState(true)

  const id = params?.id
  const currentItem = useMemo(() => {
    if (id) {
      return getArray(list).find((item) => +item.id === +id)
    }
  }, [id, list])

  const { data: backtestInfo, loading: backtestInfoLoading } = useBacktestInfo(
    currentItem?.backtest_uri,
  )

  const isLogined = useIsLogined()

  const {
    run: buy,
    loading: buyLoading,
    data: strategy,
  } = useAsync(
    async () => {
      if (!isLogined) {
        navigate('/login')
        message.info('Please login first')
        return
      }
      if (currentItem) {
        const strategy = await getStrategy(currentItem?.id)
        if (strategy?.code) {
          message.success('Get success')
          return strategy
        } else {
          Modal.confirm({
            title: 'Requirements',
            content: `The current strategy needs to be purchased before it can be viewed`,
            async onOk() {
              const product = await getProduct(currentItem?.id)
              if (!product) {
                message.error('Product not found')
                return
              }
              const payment = await createProductPayment(product?.paypalPlanId)
              if (payment) {
                const item = getArray(payment?.paymentLinks).find(
                  (item) => item.rel === 'approve',
                )
                location.href = item.href
              } else {
                message.error('Product not found')
              }
            },
            okText: 'Go to buy',
          })
        }
      }
    },
    [currentItem, isLogined],
    {
      manual: true,
    },
  )

  if (!currentItem && !loading) {
    return (
      <Contain>
        <Result status={404} title="The resource is not found." />
      </Contain>
    )
  }

  return (
    <Contain>
      {/* 1. name */}
      <Typography.Title>{currentItem?.name}</Typography.Title>
      <Divider />
      {/* 2. details | charts */}
      <Spin spinning={frameLoading}>
        <Iframe
          src={currentItem?.profit_uri}
          onLoad={() => {
            setFrameLoading(false)
          }}
        ></Iframe>
      </Spin>
      <Spin spinning={backtestInfoLoading}>
        <Descriptions size="small" bordered column={2}>
          {getArray(backtestInfo).map((item) => {
            let style = {}
            if (
              item.key.includes('CAGR') ||
              item.key.includes('Profit factor') ||
              item.key.includes('Absolute Drawdown (Account)')
            ) {
              style = highStyle
            }
            return (
              <Descriptions.Item
                labelStyle={style}
                contentStyle={style}
                label={item.key}
                key={item.key}
              >
                {item.value}
              </Descriptions.Item>
            )
          })}
        </Descriptions>
      </Spin>
      <Alert
        type="info"
        message={currentItem?.desc}
        style={{ marginTop: 24 }}
      />
      <Divider />
      {strategy?.code ? (
        <CodeWrap>
          <CopyBtn>
            <Typography.Text copyable={{ text: strategy?.code }} />
          </CopyBtn>
          <Code>{strategy?.code}</Code>
        </CodeWrap>
      ) : (
        <Button loading={buyLoading} type="primary" onClick={buy}>
          Get StrategyCode
        </Button>
      )}
    </Contain>
  )
}
