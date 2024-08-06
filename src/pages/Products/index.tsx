import { Col, Divider, Row, Typography } from 'antd'
import React from 'react'

import { LinkOutlined } from '@ant-design/icons'

import { Contain } from './index.style'
import { Product } from './Product'
import { PaymentList } from '@/components/paymentList'

export interface ProductsPageProps {}

export const ProductsPage: React.FC<ProductsPageProps> = ({}) => {
  return (
    <Contain>
      <Typography.Title>Products</Typography.Title>
      <Typography.Paragraph>
        Click on the card below to view details.
      </Typography.Paragraph>
      <Divider />
      <Row>
        <Col span={6}>
          <Product
            img="//saber2pr.top/MyWeb/resource/image/todolist-logo.png"
            title="TodolistTreeView Pro"
            short="Get the professional version"
            description={
              <>
                <div>Get the professional version, which includes:</div>
                <div>1. Advanced features of the Vscode extension</div>
                <div>
                  2. TodolistTreeView cross-platform
                  <a
                    style={{ marginLeft: 4 }}
                    href="https://saber2pr.top/todolist-pro/posts/287994228/667772353/"
                  >
                    desktop app
                    <LinkOutlined />
                  </a>
                </div>
                <div>3. Cloud service support for subsequent plans</div>
              </>
            }
          />
        </Col>
      </Row>
      <Divider />
      <PaymentList />
    </Contain>
  )
}
