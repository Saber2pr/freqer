import {
  Alert,
  Button,
  Descriptions,
  Divider,
  Image,
  message,
  Modal,
  Result,
  Spin,
  Typography,
} from 'antd'
import React, { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { createResourceUri, getStrategy, getStrategyList } from '@/api/strategy'
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

  const { loading: paypalBuyLoading, run: paypalBuy } = useAsync(
    async () => {
      const product = await getProduct(currentItem?.id)
      if (!product) {
        message.error('Product not found')
        return
      }
      const payment = await createProductPayment(
        product?.paypalPlanId,
        currentItem?.id,
      )
      if (payment) {
        const item = getArray(payment?.paymentLinks).find(
          (item) => item.rel === 'approve',
        )
        location.href = item.href
      } else {
        message.error('Product not found')
      }
    },
    [currentItem?.id],
    {
      manual: true,
    },
  )

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
            width: 600,
            content: (
              <div>
                <Typography.Paragraph>
                  The current strategy needs to be purchased before it can be
                  viewed.
                  <br />
                  Two ways for buy it:
                </Typography.Paragraph>

                <Divider />
                <Typography.Paragraph>
                  Way 1: Purchase with PayPal. (Automatic delivery.)
                </Typography.Paragraph>
                <Button
                  type="primary"
                  loading={paypalBuyLoading}
                  onClick={paypalBuy}
                >
                  Buy with Paypal
                </Button>
                <Divider />
                <Typography.Paragraph>
                  Way 2: Purchase with cryptocurrency. (1.0 USDT)
                </Typography.Paragraph>
                <Typography.Paragraph type="secondary">
                  Use a cryptocurrency wallet app to scan the QR code and make
                  the payment. (Binance, OKX, MetaMask, etc.)
                </Typography.Paragraph>
                <Image
                  style={{ display: 'block', margin: '0 auto' }}
                  width={200}
                  height={200}
                  src={createResourceUri('receive.jpg')}
                />
                <Typography.Paragraph strong>
                  After completing the payment, please send the
                  <u style={{ margin: '0.5em' }}>
                    wallet address you used for the payment
                  </u>
                  and
                  <u style={{ margin: '0.5em' }}>Current page url address</u>
                  as a message to the
                  <a
                    target="_blank"
                    style={{ margin: '0.5em' }}
                    href="https://t.me/recover2025"
                  >
                    @recover2025
                  </a>
                  account(telegram) or email to
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=saber2pr@gmail.com&su=%5BFreqtrade%20Strategies%5D%20Purchase%20with%20cryptocurrency&body=Wallet%20address%20used%20for%20the%20payment%3A%0ACurrent%20page%20url%20address%3A"
                    target="_blank"
                    style={{ margin: '0.5em' }}
                  >
                    saber2pr@gmail.com
                  </a>
                  . Your order will be processed and activated shortly after.
                </Typography.Paragraph>
                <Divider />
              </div>
            ),
            okButtonProps: {
              hidden: true,
            },
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
      {currentItem?.desc && (
        <Alert
          type="info"
          message={currentItem?.desc}
          style={{ marginTop: 24 }}
        />
      )}
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
