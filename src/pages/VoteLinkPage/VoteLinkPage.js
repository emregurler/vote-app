import './index.css'

import React from 'react'
import { Link } from 'react-router-dom'
import AddLinkButton from './components/AddLinkButton'
import LinkFilterSelect from './components/LinkFilterSelect'
import LinkList from './components/LinkList'

const VoteLinkPage = () => {
  return (
    <div className='vote-link-page-container'>
      <Link to='add-link'>
        <AddLinkButton />
      </Link>
      <hr />
      <LinkFilterSelect />
      <LinkList />
    </div>
  )
}

export default VoteLinkPage
