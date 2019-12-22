import './index.css'

import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { getLinks } from '../../redux/actions'
import AddLinkButton from './components/AddLinkButton'
import LinkList from './components/LinkList'

const VoteLinkPage = ({ links, getLinks }) => {
  const [shouldRenderList, setShouldRenderList] = useState(false)

  useEffect(() => {
    getLinks()
  }, [getLinks])

  useEffect(() => {
    const should = !!links.length
    setShouldRenderList(should)
  }, [links])

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

const mapDispatchToProps = {
  getLinks
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteLinkPage)
