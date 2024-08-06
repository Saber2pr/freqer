import React from 'react'
import { Contain } from './index.style'
import { Divider, Space, Typography } from 'antd'
import { Logo } from '../confirmReset/index.style'

export interface AboutPageProps {}

export const AboutPage: React.FC<AboutPageProps> = ({}) => {
  return (
    <Contain>
      <Space style={{ width: '100%' }}>
        <Logo src="//saber2pr.top/MyWeb/resource/image/todolist-logo.png" />
        <Typography.Title level={3} style={{ marginBottom: 0 }}>
          Todolist TreeView
        </Typography.Title>
      </Space>
      <Divider />
      <Typography.Paragraph>
        Todolist is a task list tool based on tree structure management.
        <br />
        It can be used in the vscode plug-in. It also provides desktop apps for
        macos and windows.
        <br />
        It was first released on On 2021/6/14, the optimization function will be
        updated in the long term.
      </Typography.Paragraph>
      <Divider />
      <Typography.Paragraph>
        Developer's words: The UI and functional design of this software come
        from my daily working habits, which is equivalent to the program
        implementation of my working mode.
      </Typography.Paragraph>
      <Divider />
      <a href="https://saber2pr.top/todolist-pro/posts/1949634023/1186381381/">
        Future planning
      </a>
    </Contain>
  )
}
