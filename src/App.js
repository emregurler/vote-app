import 'font-awesome/css/font-awesome.min.css'
import './App.css'

import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/AppHeader'
import Content from './components/AppContent'
import VoteLinkPage from './pages/VoteLinkPage'
import AddLinkPage from './pages/AddLinkPage'
import { Layout } from 'antd'

const App = () => {
  return (
    <React.Fragment>
      <Layout>
        <Header />
        <Content>
          <Router>
            <Switch>
              <Route exact path='/' component={VoteLinkPage} />
              <Route path='/add-link' component={AddLinkPage} />
            </Switch>
          </Router>
        </Content>
      </Layout>
    </React.Fragment>
  )
}

export default App
