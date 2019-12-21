import './index.css'

import React from 'react'
import SquareButton from '../SquareButton/SquareButton'

const AddLinkButton = () => {
  const onClickAddButton = () => {
    console.log('Add Button Clicked')
  }

  const content = (
    <div>
      <i className='fa fa-plus fa-3x'></i>
    </div>
  )

  return (
    <div onClick={onClickAddButton} className='add-link-container'>
      <SquareButton content={content} />
      <span className='add-link-button-text'>SUBMIT A LINK</span>
    </div>
  )
}

export default AddLinkButton
