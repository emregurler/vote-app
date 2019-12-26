import './style.css'

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Pagination, Divider } from 'antd'
import PropTypes from 'prop-types'
import LinkItem from '../LinkItem'
import LinkFilterSelect from '../LinkFilterSelect'
import { linksOrderOptions } from '../../constants'

const LinkList = ({ links, selectedOrder }) => {
  const [page, setPage] = useState(1)
  const [currentPageLinks, setCurrentPageLinks] = useState([])

  const total = links.length
  const pageSize = 5
  const isVisiblePagination = total > pageSize

  useEffect(() => {
    setPage(1)
    calculateCurrentList()
  }, [selectedOrder])

  useEffect(() => {
    calculateCurrentList()
  }, [links, page])

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

  const calculateCurrentList = () => {
    const orderedList = orderBy(selectedOrder)
    const startFrom = (page - 1) * pageSize
    const end = startFrom + pageSize
    const currentList = orderedList.slice(startFrom, end)
    setCurrentPageLinks(currentList)
  }

  return (
    <>
      <Divider />
      <LinkFilterSelect />
      {currentPageLinks.map((link) => (
        <LinkItem key={link.id} link={link} />
      ))}
      {isVisiblePagination && (
        <Pagination
          pageSize={5}
          total={total}
          currentPage={page}
          onChange={setPage}
        />
      )}
    </>
  )
}

LinkList.propTypes = {
  selectedOrder: PropTypes.string,
  links: PropTypes.array
}

const mapStateToProps = (state) => ({
  selectedOrder: state.linkReducer.selectedOrder,
  links: state.linkReducer.links
})

export default connect(mapStateToProps)(LinkList)
