import { Avatar, Dropdown, Menu, Modal, Popover, message } from 'antd'
import React from 'react'

import { useAppSelector } from '@/store/store'
import { formatUserName } from '@/utils/formatUserName'
import { UserOutlined } from '@ant-design/icons'

import { Contain, HomeLink, LeftContent, RightContent } from './index.style'
import { clearToken } from '@/api'
import { useNavigate } from 'react-router'

export interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  const userInfo = useAppSelector((state) => state?.common?.userInfo)
  const navigate = useNavigate()

  const menu = (
    <Menu>
      <Menu.Item onClick={() => navigate('/account')}>Account</Menu.Item>
      <Menu.Item onClick={() => navigate('/payments')}>Payments</Menu.Item>
      <Menu.Item
        onClick={() =>
          Modal.confirm({
            title: 'Sign Out',
            content: 'Continue?',
            onOk() {
              clearToken()
              navigate('/login')
              message.success('Sign out.')
            },
          })
        }
      >
        Sign Out
      </Menu.Item>
    </Menu>
  )

  return (
    <Contain>
      <LeftContent>
        <HomeLink
          onClick={() => {
            navigate('/')
          }}
        >
          Freqtrade strategies
        </HomeLink>
      </LeftContent>
      <RightContent>
        {userInfo ? (
          <Dropdown trigger={['hover']} overlay={menu}>
            <Avatar size="small">{formatUserName(userInfo?.username)}</Avatar>
          </Dropdown>
        ) : (
          <Avatar size="small" icon={<UserOutlined />} />
        )}
      </RightContent>
    </Contain>
  )
}
