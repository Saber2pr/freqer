import { Col, Row, Spin } from 'antd'
import React from 'react'

import { getStrategyList } from '@/api/strategy'
import { Card } from '@/components/card'
import { useAsync } from '@/hooks/useAsync'
import { getArray } from '@/utils'

import { Contain } from './index.style'

export interface StrategyListProps {}

export const StrategyList: React.FC<StrategyListProps> = ({}) => {
  const { data: list, loading } = useAsync(() => getStrategyList(), [])

  return (
    <Contain>
      <Spin spinning={loading}>
        <Row gutter={[16, 16]}>
          {getArray(list).map((item) => (
            <Col key={item.name} span={6}>
              <Card item={item} />
            </Col>
          ))}
        </Row>
      </Spin>
    </Contain>
  )
}
