import './VoteLinkPage.css'

import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getLinks, setCurrentPage, resetLinkReducer } from '../../redux/actions'
import { linksOrderOptions } from './constants'
import AddLinkButton from './components/AddLinkButton'
import PaginatedList from './components/PaginatedList/PaginatedList'

const VoteLinkPage = ({
  links,
  currentPage,
  selectedOrder,
  getLinks,
  setCurrentPage,
  resetLinkReducer
}) => {
  const [currentList, setCurrentList] = useState([])

  const pageSize = 5
  const total = links.length

  const calculateCurrentList = () => {
    const orderedList = orderBy(selectedOrder)
    const startFrom = (currentPage - 1) * pageSize
    const end = startFrom + pageSize
    const currentList = orderedList.slice(startFrom, end)
    setCurrentList(currentList)
  }

  useEffect(() => {
    getLinks()
    return () => {
      resetLinkReducer()
    }
    // for understanding (did)mount effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    calculateCurrentList()
  }, [links, currentPage, selectedOrder])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const orderBy = (order) => {
    if (!order || order === linksOrderOptions.options.default.value) {
      return [...links]
    }
    let func
    if (order === 'less') {
      func = (a, b) => a.point - b.point || b.updatedDate - a.updatedDate
    } else {
      func = (a, b) => b.point - a.point || b.updatedDate - a.updatedDate
    }
    return [...links].sort(func)
  }

  return (
    <div className='vote-link-page-container'>
      <AddLinkButton />
      <PaginatedList
        currentList={currentList}
        total={total}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  links: state.linkReducer.links,
  currentPage: state.linkReducer.currentPage,
  selectedOrder: state.linkReducer.selectedOrder
})

const mapDispatchToProps = {
  getLinks,
  setCurrentPage,
  resetLinkReducer
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteLinkPage)
