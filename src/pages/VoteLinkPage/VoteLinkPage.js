import './VoteLinkPage.css'

import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  getSortedPaginatedLinks,
  setCurrentPage,
  resetLinkReducer
} from '../../redux/actions'
import AddLinkButton from './components/AddLinkButton'
import PaginatedList from './components/PaginatedList/PaginatedList'

const VoteLinkPage = ({
  currentList,
  currentPage,
  pageSize,
  total,
  setCurrentPage,
  getSortedPaginatedLinks,
  resetLinkReducer
}) => {
  useEffect(() => {
    getSortedPaginatedLinks()
    return () => {
      resetLinkReducer()
    }
    // for understanding (did)mount effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className='vote-link-page-container'>
      <AddLinkButton />
      <PaginatedList
        pageSize={pageSize}
        currentList={currentList}
        total={total}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentList: state.linkReducer.currentList,
  total: state.linkReducer.total,
  currentPage: state.linkReducer.currentPage,
  pageSize: state.linkReducer.pageSize,
  selectedOrder: state.linkReducer.selectedOrder
})

const mapDispatchToProps = {
  getSortedPaginatedLinks,
  setCurrentPage,
  resetLinkReducer
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteLinkPage)
