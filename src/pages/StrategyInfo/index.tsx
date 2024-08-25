import { getStrategyList } from '@/api/strategy'
import { useAsync } from '@/hooks/useAsync'
import { useBacktestInfo } from '@/hooks/useBacktestInfo'
import { getArray } from '@/utils'
import { Col, Descriptions, Result, Row, Spin, Typography } from 'antd'
import React, { useMemo } from 'react'
import { useParams } from 'react-router'
import { Contain } from './index.style'

export interface StrategyInfoProps {}

const highStyle = {
  background: 'antiquewhite',
}

export const StrategyInfo: React.FC<StrategyInfoProps> = ({}) => {
  const { data: list, loading } = useAsync(() => getStrategyList(), [])

  const params = useParams()

  const id = params?.id
  const currentItem = useMemo(() => {
    if (id) {
      return getArray(list).find((item) => +item.id === +id)
    }
  }, [id, list])

  const { data: backtestInfo, loading: backtestInfoLoading } = useBacktestInfo(
    currentItem?.backtest_uri,
  )
  console.log('🚀 ~ backtestInfo:', backtestInfo)

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
      {/* 2. details | charts */}
      <Row>
        <Col span={12}>
          <Spin spinning={backtestInfoLoading}>
            <Descriptions size="small" bordered column={1}>
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
        </Col>
        <Col span={12}></Col>
      </Row>
      {/* code */}
    </Contain>
  )
}
