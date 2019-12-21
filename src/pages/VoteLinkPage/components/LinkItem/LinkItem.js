import './style.css'

import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SquareButton from '../SquareButton/SquareButton'
import { upvoteLink, downvoteLink, deleteLink } from '../../../../redux/actions'
import { Icon } from 'antd'
import VoteButton from '../VoteButton'

const LinkItem = ({ link, upvoteLink, downvoteLink, deleteLink }) => {
  const { id, name, url, point } = link

  const squareButtonContent = (
    <div className='list-item-point-content'>
      <span className='square-button-point-text'>{point}</span>
      <span>POINTS</span>
    </div>
  )

  const onUpVote = () => {
    upvoteLink(link)
  }

  const onDownVote = () => {
    downvoteLink(link)
  }

  const onDeleteItem = (id) => {
    deleteLink(id)
  }
  console.log('rerender')
  return (
    <div className='list-item-container'>
      <SquareButton content={squareButtonContent} />
      <div className='list-item-info'>
        <div>
          <div>{name}</div>
          <div>({url})</div>
        </div>
        <div className='list-item-vote-container'>
          <VoteButton text='Up Vote' iconType='caret-up' onClick={onUpVote} />
          <VoteButton
            text='Down Vote'
            iconType='caret-down'
            onClick={onDownVote}
          />
        </div>
      </div>
      <Icon
        onClick={() => {
          onDeleteItem(id)
        }}
        className='list-item-remove-icon'
        type='minus-circle'
        theme='twoTone'
        twoToneColor='#eb2f96'
      />
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
