import './index.css'

import React from 'react'
import SquareButton from '../SquareButton'
import { Link } from 'react-router-dom'

const AddLinkButton = () => {
  const content = (
    <div>
      <i className='fa fa-plus fa-3x'></i>
    </div>
  )

  return (
    <Link to='add-link'>
      <div className='add-link-container'>
        <SquareButton content={content} />
        <span className='add-link-button-text'>SUBMIT A LINK</span>
      </div>
    </Link>
  )
}

export default AddLinkButton
