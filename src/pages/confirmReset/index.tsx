import { Button, Card, Form, Input, message, Space, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

import { clearCode, getCode, resetPwd } from '@/api'
import { useAsync } from '@/hooks/useAsync'

import { Bottom, Contain, FormContent, Logo } from './index.style'

export interface ConfirmResetPageProps {}

type FormValues = {
  password: string
  passwordConfirmation: string
}

const timeout = (delay = 1000) =>
  new Promise((resolve) => setTimeout(resolve, delay))

export const ConfirmResetPage: React.FC<ConfirmResetPageProps> = ({}) => {
  const [form] = Form.useForm()

  const { loading, run: runReset } = useAsync(
    async (values: FormValues) => {
      const code = getCode()
      if (!code) {
        message.error('reset code loose, please retry later')
        return
      }
      const res = await resetPwd({
        ...values,
        code,
      })
      clearCode()
      message.loading('Update Password success, to login page ...')
      await timeout(2000)
      location.href = `https://saber2pr.top/todolist-account/#/login`
      return res
    },
    [],
    {
      manual: true,
    },
  )

  return (
    <Contain>
      <Space style={{ width: '100%', justifyContent: 'center' }}>
        <Logo src="//www.freqtrade.io/en/stable/images/logo.png" />
        <Typography.Title level={3} style={{ marginBottom: 0 }}>
          Freqtrade Strategies
        </Typography.Title>
      </Space>
      <Card
        title="Update Password"
        style={{
          width: '400px',
          margin: '36px auto',
          boxShadow: '0 10px 20px rgba(0, 0, 0, .2)',
        }}
      >
        <FormContent>
          <Form form={form} onFinish={runReset} layout="vertical">
            <Form.Item
              name="password"
              label="New Password"
              rules={[{ required: true }]}
            >
              <Input.Password placeholder="your new account password" />
            </Form.Item>
            <Form.Item
              name="passwordConfirmation"
              label="Confirm New Password"
              rules={[{ required: true }]}
            >
              <Input.Password placeholder="confirm your new account password" />
            </Form.Item>
          </Form>
          <Button
            loading={loading}
            block
            type="primary"
            onClick={() => form.submit()}
          >
            Confirm Update Password
          </Button>
        </FormContent>
      </Card>
      <Bottom>
        <Link to="/login" style={{ textDecoration: 'underline' }}>
          Back to Sign In
        </Link>
      </Bottom>
    </Contain>
  )
}
