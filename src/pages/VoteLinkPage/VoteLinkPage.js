import './index.css'

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getLinks, resetLinkReducer } from '../../redux/actions'
import AddLinkButton from './components/AddLinkButton'
import LinkList from './components/LinkList'

const VoteLinkPage = ({ links, getLinks, resetLinkReducer }) => {
  const [shouldRenderList, setShouldRenderList] = useState(false)

  useEffect(() => {
    getLinks()
    return () => {
      resetLinkReducer()
    }
  }, [getLinks, resetLinkReducer])

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
  getLinks,
  resetLinkReducer
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteLinkPage)
