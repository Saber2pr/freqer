import React from 'react'
import { Bottom, Contain, FormContent, Logo } from './index.style'
import { Button, Card, Divider, Form, Input, Space, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useAsync } from '@/hooks/useAsync'
import { loginUser, setToken } from '@/api'
import { useDispatch } from 'react-redux'
import { commonSlice } from '@/store/common'
import { useAppDispatch } from '@/store/store'

export interface LoginPageProps {}

type FormValues = {
  identifier: string
  password: string
}

export const LoginPage: React.FC<LoginPageProps> = ({}) => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const { loading, run: runLogin } = useAsync(
    async (values: FormValues) => {
      const res = await loginUser(values)
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
        title="Sign In"
        style={{
          width: '400px',
          margin: '36px auto',
          boxShadow: '0 10px 20px rgba(0, 0, 0, .2)',
        }}
      >
        <FormContent>
          <Form form={form} layout="vertical" onFinish={runLogin}>
            <Form.Item
              name="identifier"
              label="Username"
              rules={[{ required: true }]}
            >
              <Input placeholder="your nick name or email" />
            </Form.Item>
            <Form.Item
              name="password"
              labelCol={{ className: 'password-form-item' }}
              label={
                <Space
                  style={{ width: '100%', justifyContent: 'space-between' }}
                >
                  <div>Password</div>
                  <Link to="/reset" style={{ textDecoration: 'underline' }}>
                    Forgot password?
                  </Link>
                </Space>
              }
              rules={[{ required: true }]}
            >
              <Input.Password placeholder="your account password" />
            </Form.Item>
          </Form>
          <Button
            loading={loading}
            block
            type="primary"
            onClick={() => form.submit()}
          >
            Sign In
          </Button>
        </FormContent>
      </Card>
      <Bottom>
        <Link to="/register" style={{ textDecoration: 'underline' }}>
          Create Account
        </Link>
      </Bottom>
    </Contain>
  )
}
