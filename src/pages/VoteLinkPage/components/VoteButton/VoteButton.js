import './style.css'

import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'

const VoteButton = ({ iconType, text, onClick }) => {
  return (
    <div onClick={onClick} className='vote-div'>
      <Icon style={{ fontSize: 24 }} type={iconType} theme='filled' />
      <span>{text}</span>
    </div>
  )
}

VoteButton.propTypes = {
  iconType: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func
}

export default VoteButton
