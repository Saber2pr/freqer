import { Alert, Button, Card, Form, Input, Space, Typography } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { forgotPwd } from '@/api'
import { useAsync } from '@/hooks/useAsync'

import { Bottom, Contain, FormContent, Logo } from './index.style'

export interface ResetPageProps {}

type FormValues = {
  email: string
}

export const ResetPage: React.FC<ResetPageProps> = ({}) => {
  const [form] = Form.useForm()
  const [showTip, setShowTip] = useState(false)

  const { loading, run: runReset } = useAsync(
    async (values: FormValues) => {
      const res = await forgotPwd(values)
      setShowTip(true)
      return res
    },
    [],
    {
      manual: true,
    },
  )

  let content = (
    <>
      <FormContent>
        <Form form={form} onFinish={runReset} layout="vertical">
          <Form.Item
            name="email"
            label="Email address"
            rules={[{ required: true }]}
          >
            <Input placeholder="Email address you use to sign up." />
          </Form.Item>
        </Form>
        <Button
          loading={loading}
          block
          type="primary"
          onClick={() => form.submit()}
        >
          Get Password Reset Link
        </Button>
      </FormContent>
    </>
  )

  if (showTip) {
    content = (
      <>
        <Alert message="An email with a reset link has been sent to you" />
      </>
    )
  }

  return (
    <Contain>
      <Space style={{ width: '100%', justifyContent: 'center' }}>
        <Logo src="//saber2pr.top/MyWeb/resource/image/todolist-logo.png" />
        <Typography.Title level={3} style={{ marginBottom: 0 }}>
          Todolist TreeView
        </Typography.Title>
      </Space>
      <Card
        title="Reset Password"
        style={{
          width: '400px',
          margin: '36px auto',
          boxShadow: '0 10px 20px rgba(0, 0, 0, .2)',
        }}
      >
        {content}
      </Card>
      {showTip || (
        <Bottom>
          <Link to="/login" style={{ textDecoration: 'underline' }}>
            Back to Sign In
          </Link>
        </Bottom>
      )}
    </Contain>
  )
}
