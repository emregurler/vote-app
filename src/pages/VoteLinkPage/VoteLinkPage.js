import './index.css'

import React from 'react'
import AddLinkButton from './components/AddLinkButton'
import LinkFilterSelect from './components/LinkFilterSelect'

const VoteLinkPage = () => {
  return (
    <div className='vote-link-container'>
      <AddLinkButton />
      <hr />
      <LinkFilterSelect />
    </div>
  )
}

export default VoteLinkPage
