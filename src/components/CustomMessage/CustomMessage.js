import './style.css'

import React from 'react'
import PropTypes from 'prop-types'

const CustomMessage = ({ name, restOfText }) => (
  <div className='custom-message-container'>
    <span className='custom-message-name'>{name} </span>
    <span> {restOfText}</span>
  </div>
)

CustomMessage.propTypes = {
  name: PropTypes.string,
  restOfText: PropTypes.string
}

export default CustomMessage
