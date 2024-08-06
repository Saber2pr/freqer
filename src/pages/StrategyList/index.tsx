import React from 'react'
import { Contain } from './index.style'
import { Col, Row } from 'antd'
import { Card } from '@/components/card'

export interface StrategyListProps {}

export const StrategyList: React.FC<StrategyListProps> = ({}) => {
  const list = [
    {
      name: 'SMAOffset',
    },
    {
      name: 'SMAOffset',
    },
    {
      name: 'SMAOffset',
    },
    {
      name: 'SMAOffset',
    },
    {
      name: 'SMAOffset',
    },
    {
      name: 'SMAOffset',
    },
    {
      name: 'SMAOffset',
    },
    {
      name: 'SMAOffset',
    },
  ]

  return (
    <Contain>
      <Row gutter={[16, 16]}>
        {list.map((item) => (
          <Col key={item.name} span={6}>
            <Card name={item.name} />
          </Col>
        ))}
      </Row>
    </Contain>
  )
}
