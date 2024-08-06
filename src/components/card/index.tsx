import React from 'react'
import { Card as AntdCard, Image } from 'antd'

export interface CardProps {
  name: string
}

export const Card: React.FC<CardProps> = ({ name }) => {
  return (
    <AntdCard
      hoverable
      cover={
        <Image
          alt="example"
          height={200}
          preview={false}
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
    >
      <AntdCard.Meta title={name} description="www.instagram.com" />
    </AntdCard>
  )
}
