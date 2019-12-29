import './LinkList.css'

import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Divider, Button, Modal, Row } from 'antd'
import PropTypes from 'prop-types'
import { upvoteLink, downvoteLink, deleteLink } from '../../../../redux/actions'
import LinkItem from '../LinkItem'
import LinkFilterSelect from '../LinkFilterSelect'

const LinkList = ({
  currentList = [],
  upvoteLink,
  downvoteLink,
  deleteLink
}) => {
  const [deletingLink, setDeletingLink] = useState(undefined)
  const isVisibleDeleteModal = !!deletingLink

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
      {currentList.map((link) => (
        <LinkItem
          key={link.id}
          link={link}
          onUpvote={handleUpvoteLink}
          onDownvote={handleDownvoteLink}
          onDelete={handleDeleteLink}
        />
      ))}

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
  links: PropTypes.array
}

const mapStateToProps = (state) => ({
  links: state.linkReducer.links
})

const mapDispatchToProps = {
  upvoteLink,
  downvoteLink,
  deleteLink
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkList)
