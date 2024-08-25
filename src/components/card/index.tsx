import { Card as AntdCard, Image } from 'antd'
import React from 'react'

import { StrategyExtItem } from '@/api/strategy'

export interface CardProps {
  item: StrategyExtItem
}

export const Card: React.FC<CardProps> = ({ item }) => {
  return (
    <AntdCard
      hoverable
      cover={<Image height={200} preview={false} src={item.cover_uri} />}
    >
      <AntdCard.Meta
        title={item.name}
        description={`Profit factor: ${item.factor}`}
      />
    </AntdCard>
  )
}
