import './index.css'

import React from 'react'
import { connect } from 'react-redux'
import AddLinkButton from './components/AddLinkButton'
import LinkList from './components/LinkList'

const VoteLinkPage = ({ links }) => {
  const shouldRenderList = !!links.length
  return (
    <div className='vote-link-page-container'>
      <AddLinkButton />
      {shouldRenderList && <LinkList />}
    </div>
  )
}

const mapStateToProps = (state) => ({
  links: state.linkReducer.links
})

export default connect(mapStateToProps)(VoteLinkPage)
