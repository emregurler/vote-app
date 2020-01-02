import React from 'react'
import PropTypes from 'prop-types'
import LinkList from '../LinkList/LinkList'
import { Pagination } from 'antd'

const PaginatedList = ({
  currentList,
  pageSize,
  total,
  currentPage,
  onPageChange
}) => {
  const shouldRenderList = !!total
  return (
    <>
      {shouldRenderList && <LinkList currentList={currentList} />}
      <Pagination
        showLessItems
        hideOnSinglePage
        pageSize={pageSize}
        total={total}
        currentPage={currentPage}
        onChange={onPageChange}
      />
    </>
  )
}

PaginatedList.propTypes = {
  pageSize: PropTypes.number,
  currentList: PropTypes.array,
  total: PropTypes.number,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func
}

export default PaginatedList
