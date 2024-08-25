import { Card as AntdCard, Image } from 'antd'
import React from 'react'

import { StrategyExtItem } from '@/api/strategy'
import { useNavigate } from 'react-router'

export interface CardProps {
  item: StrategyExtItem
}

export const Card: React.FC<CardProps> = ({ item }) => {
  const navigate = useNavigate()
  return (
    <AntdCard
      hoverable
      cover={<Image height={200} preview={false} src={item.cover_uri} />}
      onClick={() => navigate(`/strategy/${item.id}`)}
    >
      <AntdCard.Meta
        title={item.name}
        description={`Profit factor: ${item.factor}`}
      />
    </AntdCard>
  )
}
