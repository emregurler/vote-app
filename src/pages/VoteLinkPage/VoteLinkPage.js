import './index.css'

import React from 'react'
import AddLinkButton from './components/AddLinkButton/AddLinkButton'
import LinkFilterSelect from './components/LinkFilterSelect'
import LinkList from './components/LinkList'
import { Link } from 'react-router-dom'

const VoteLinkPage = () => {
  return (
    <div className='vote-link-container'>
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
