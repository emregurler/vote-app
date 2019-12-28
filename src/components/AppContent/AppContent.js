import './AppContent.css'

import React from 'react'
import { Layout } from 'antd'

const { Content } = Layout

const AppContent = (props) => {
  return <Content className='content'>{props.children}</Content>
}
export default AppContent
