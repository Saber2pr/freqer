import { getStrategyList } from '@/api/strategy'
import { useAsync } from '@/hooks/useAsync'
import { useBacktestInfo } from '@/hooks/useBacktestInfo'
import { getArray } from '@/utils'
import { Col, Descriptions, Result, Row, Spin, Typography } from 'antd'
import Item from 'antd/lib/list/Item'
import React, { useMemo } from 'react'
import { useParams } from 'react-router'
import { Contain } from './index.style'

export interface StrategyInfoProps {}

export const StrategyInfo: React.FC<StrategyInfoProps> = ({}) => {
  const { data: list } = useAsync(() => getStrategyList(), [])

  const params = useParams()

  const id = params?.id
  const currentItem = useMemo(() => {
    if (id) {
      return getArray(list).find((item) => +item.id === +id)
    }
  }, [id])

  const { data: backtestInfo, loading: backtestInfoLoading } = useBacktestInfo(
    currentItem.backtest_uri,
  )

  if (!currentItem) {
    return (
      <Contain>
        <Result status={404} title="The resource is not found." />
      </Contain>
    )
  }

  return (
    <Contain>
      {/* 1. name */}
      <Typography.Title>{currentItem.name}</Typography.Title>
      {/* 2. details | charts */}
      <Row>
        <Col span={12}>
          <Spin spinning={backtestInfoLoading}>
            <Descriptions bordered column={2}>
              {getArray(backtestInfo).map((item) => (
                <Descriptions.Item label={item.key} key={item.key}>
                  {item.value}
                </Descriptions.Item>
              ))}
            </Descriptions>
          </Spin>
        </Col>
        <Col span={12}></Col>
      </Row>
      {/* 3. backtests | profit */}
    </Contain>
  )
}
