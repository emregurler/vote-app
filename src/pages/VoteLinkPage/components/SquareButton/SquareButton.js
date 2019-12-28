import './SquareButton.css'

import React from 'react'
import PropTypes from 'prop-types'

const SquareButton = ({ content }) => {
  return <div className='square-button'>{content}</div>
}

SquareButton.propTypes = {
  content: PropTypes.node
}

export default SquareButton
