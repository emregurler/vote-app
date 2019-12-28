import './LinkItem.css'

import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'
import SquareButton from '../SquareButton'
import VoteButton from '../VoteButton'

const LinkItem = ({ link, onUpvote, onDownvote, onDelete }) => {
  const { name, url, point } = link

  const squareButtonContent = (
    <div className='list-item-point-content'>
      <span className='square-button-point-text'>{point}</span>
      <span>POINTS</span>
    </div>
  )

  const handleUpvote = () => {
    onUpvote(link)
  }

  const handleDownvote = () => {
    onDownvote(link)
  }

  const handleDelete = () => {
    onDelete(link)
  }
  return (
    <div className='list-item-container'>
      <SquareButton content={squareButtonContent} />
      <div className='list-item-info'>
        <div>
          <div>{name}</div>
          <div>({url})</div>
        </div>
        <div className='list-item-vote-container'>
          <VoteButton
            text='Up Vote'
            iconType='caret-up'
            onClick={handleUpvote}
          />
          <VoteButton
            text='Down Vote'
            iconType='caret-down'
            onClick={handleDownvote}
          />
        </div>
      </div>
      <Icon
        onClick={handleDelete}
        className='list-item-remove-icon'
        type='minus-circle'
        theme='twoTone'
        twoToneColor='#eb2f96'
      />
    </div>
  )
}

LinkItem.propTypes = {
  link: PropTypes.object
}

export default LinkItem
