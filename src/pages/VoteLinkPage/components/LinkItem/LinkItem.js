import './style.css'

import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SquareButton from '../SquareButton/SquareButton'
import { upvoteLink, downvoteLink, deleteLink } from '../../../../redux/actions'
import { Icon } from 'antd'

const LinkItem = ({
  id,
  name,
  url,
  point,
  upvoteLink,
  downvoteLink,
  deleteLink
}) => {
  const squareButtonContent = (
    <div className='list-item-point-content'>
      <span className='square-button-point-text'>{point}</span>
      <span>POINTS</span>
    </div>
  )

  const onUpVote = (link) => {
    const updatedLink = { ...link, point: link.point + 1 }
    upvoteLink(updatedLink)
  }

  const onDownVote = (link) => {
    const updatedLink = { ...link, point: link.point - 1 }
    downvoteLink(updatedLink)
  }

  const onDeleteItem = (id) => {
    console.log(id)
    deleteLink(id)
  }

  return (
    <div className='list-item-container'>
      <Icon
        onClick={() => {
          onDeleteItem(id)
        }}
        className='list-item-remove-icon'
        type='minus-circle'
        theme='twoTone'
        twoToneColor='#eb2f96'
      />
      <SquareButton content={squareButtonContent} />
      <div className='list-item-info'>
        <div>
          <div>{name}</div>
          <div>({url})</div>
        </div>
        <div className='list-item-vote-container'>
          <div
            onClick={() => onUpVote({ id, name, url, point })}
            className='vote-div'
          >
            <Icon style={{ fontSize: 24 }} type='caret-up' theme='filled' />
            <span>Up Vote</span>
          </div>
          <div
            onClick={() => onDownVote({ id, name, url, point })}
            className='vote-div'
          >
            <Icon style={{ fontSize: 24 }} type='caret-up' theme='filled' />
            <span>Down Vote</span>
          </div>
        </div>
      </div>
    </div>
  )
}

LinkItem.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
  point: PropTypes.number
}

const mapDispatchToProps = {
  upvoteLink,
  downvoteLink,
  deleteLink
}

export default connect(null, mapDispatchToProps)(LinkItem)
