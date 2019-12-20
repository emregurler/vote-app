import 'font-awesome/css/font-awesome.min.css'
import './App.css'

import React from 'react'
import Header from './components/AppHeader'
import Content from './components/AppContent'
import VoteLinkPage from './pages/VoteLinkPage'
import { Layout } from 'antd'

const App = () => {
  return (
    <React.Fragment>
      <Layout>
        <Header />
        <Content>
          <VoteLinkPage />
        </Content>
      </Layout>
    </React.Fragment>
  )
}

export default App
