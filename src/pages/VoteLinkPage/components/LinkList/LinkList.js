import './style.css'

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Pagination } from 'antd'
import PropTypes from 'prop-types'
import LinkItem from '../LinkItem'
import { getLinks } from '../../../../redux/actions'

const LinkList = ({ links, getLinks }) => {
  const total = links.length
  const pageSize = 5
  const [page, setPage] = useState(1)
  const [currentList, setCurrentList] = useState([...links].slice(0, pageSize))

  useEffect(() => {
    getLinks()
  }, [])

  useEffect(() => {
    //TODO:
    onChangePage(1)
  }, [links])

  const onChangePage = (page) => {
    const startFrom = (page - 1) * pageSize
    const end = startFrom + pageSize
    const currentList = links.slice(startFrom, end)
    setCurrentList(currentList)
    setPage(page)
  }

  return (
    <div>
      {currentList.map((link) => (
        <LinkItem
          key={link.id}
          id={link.id}
          name={link.name}
          url={link.url}
          point={link.point}
        />
      ))}
      <Pagination
        pageSize={5}
        currentPage={page}
        total={total}
        onChange={onChangePage}
      />
    </div>
  )
}

LinkList.propTypes = {
  links: PropTypes.array
}

const mapStateToProps = (state) => ({
  links: state.linkReducer.links
})

const mapDispatchToProps = {
  getLinks
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkList)
