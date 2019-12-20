import './index.css'

import React from 'react'
import { Layout } from 'antd'

const { Header } = Layout

const AppHeader = () => {
  return (
    <Header className='header'>
      <div className='header-site'>
        <span className='header-site-text'>hepsiburada</span>
        <span className='header-site-text-postfix'>.com</span>
      </div>
      <div className='header-app-info'>
        <span className='header-app-info-link'>Link</span>
        <span className='header-app-info-vote'>VOTE </span>
        <span className='header-app-info-challenge'>Challenge</span>
      </div>
    </Header>
  )
}

export default AppHeader
