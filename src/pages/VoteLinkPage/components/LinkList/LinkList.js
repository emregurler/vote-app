import './LinkList.css'

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Pagination, Divider, Button, Modal, Row } from 'antd'
import PropTypes from 'prop-types'
import { upvoteLink, downvoteLink, deleteLink } from '../../../../redux/actions'
import LinkItem from '../LinkItem'
import LinkFilterSelect from '../LinkFilterSelect'
import { linksOrderOptions } from '../../constants'

const LinkList = ({
  links,
  selectedOrder,
  upvoteLink,
  downvoteLink,
  deleteLink
}) => {
  const [page, setPage] = useState(1)
  const [deletingLink, setDeletingLink] = useState(undefined)
  const [currentPageLinks, setCurrentPageLinks] = useState([])

  const total = links.length
  const pageSize = 5
  const isVisiblePagination = total > pageSize
  const isVisibleDeleteModal = !!deletingLink

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

  const handleUpvoteLink = (link) => {
    upvoteLink(link)
  }

  const handleDownvoteLink = (link) => {
    downvoteLink(link)
  }
  const handleDeleteLink = (link) => {
    setDeletingLink(link)
  }

  const handleCancelDelete = () => {
    setDeletingLink(undefined)
  }

  const handleConfirmDelete = () => {
    deleteLink(deletingLink.id, () => {
      setDeletingLink(undefined)
    })
  }

  return (
    <>
      <Divider />
      <LinkFilterSelect />
      {currentPageLinks.map((link) => (
        <LinkItem
          key={link.id}
          link={link}
          onUpvote={handleUpvoteLink}
          onDownvote={handleDownvoteLink}
          onDelete={handleDeleteLink}
        />
      ))}
      {isVisiblePagination && (
        <Pagination
          pageSize={5}
          total={total}
          currentPage={page}
          onChange={setPage}
        />
      )}

      {deletingLink && (
        <Modal
          className='delete-modal'
          visible={isVisibleDeleteModal}
          title='Remove Link'
          onCancel={handleCancelDelete}
          footer={null}
        >
          <Row type='flex' justify='center' className='delete-modal-text'>
            Do you want to remove:
          </Row>
          <Row type='flex' justify='center' className='delete-modal-list-name'>
            {deletingLink.name}
          </Row>
          <Row type='flex' justify='center'>
            <Button
              className='delete-modal-button'
              key='submit'
              onClick={handleConfirmDelete}
            >
              OK
            </Button>

            <Button
              className='delete-modal-button'
              key='back'
              onClick={handleCancelDelete}
            >
              CANCEL
            </Button>
          </Row>
        </Modal>
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

const mapDispatchToProps = {
  upvoteLink,
  downvoteLink,
  deleteLink
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkList)
