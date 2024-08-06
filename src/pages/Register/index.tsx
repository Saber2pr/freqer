import { Button, Card, Form, Input, Space, Typography } from 'antd'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { registerUser, setToken } from '@/api'
import { useAsync } from '@/hooks/useAsync'

import { Bottom, Contain, FormContent, Logo } from './index.style'
import { useDispatch } from 'react-redux'
import { commonSlice } from '@/store/common'
import { useAppDispatch } from '@/store/store'

export interface RegisterPageProps {}

type FormValues = {
  username: string
  password: string
  email: string
}

export const RegisterPage: React.FC<RegisterPageProps> = ({}) => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { loading, run: runRegister } = useAsync(
    async (values: FormValues) => {
      const res = await registerUser(values)
      setToken(res.jwt)
      dispatch(commonSlice.actions.setUserInfo(res.user))
      return res
    },
    [],
    {
      manual: true,
      onSuccess() {
        navigate('/')
      },
    },
  )

  return (
    <Contain>
      <Space style={{ width: '100%', justifyContent: 'center' }}>
        <Logo src="//saber2pr.top/MyWeb/resource/image/todolist-logo.png" />
        <Typography.Title level={3} style={{ marginBottom: 0 }}>
          Todolist TreeView
        </Typography.Title>
      </Space>
      <Card
        title="Sign Up"
        style={{
          width: '400px',
          margin: '36px auto',
          boxShadow: '0 10px 20px rgba(0, 0, 0, .2)',
        }}
      >
        <FormContent>
          <Form form={form} layout="vertical" onFinish={runRegister}>
            <Form.Item
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="your nick name" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true }]}
            >
              <Input.Password placeholder="your account password" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, type: 'email' }]}
            >
              <Input placeholder="your email" />
            </Form.Item>
          </Form>
          <Button
            loading={loading}
            block
            type="primary"
            onClick={() => form.submit()}
          >
            Create An Account
          </Button>
        </FormContent>
      </Card>
      <Bottom>
        <p>Already have an account?</p>
        <Link to="/login" style={{ textDecoration: 'underline' }}>
          Sign In
        </Link>
      </Bottom>
    </Contain>
  )
}
