import './index.css'

import React from 'react'
import { Layout, Row, Col } from 'antd'

const { Header } = Layout

const AppHeader = () => {
  return (
    <Header className='header'>
      <Row type='flex' justify='space-between' align='bottom'>
        <Col className='header-site'>
          <span className='header-site-text'>hepsiburada</span>
          <span className='header-site-text-postfix'>.com</span>
        </Col>
        <Col className='header-app-info'>
          <span className='header-app-info-link'>Link</span>
          <span className='header-app-info-vote'>VOTE </span>
          <span className='header-app-info-challenge'>Challenge</span>
        </Col>
      </Row>
    </Header>
  )
}

export default AppHeader
