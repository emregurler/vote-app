import React from 'react'
import { Select } from 'antd'

const { Option } = Select

const LinkFilterSelect = () => {
  const onChangeFilter = (value) => {
    console.log(value)
  }
  return (
    <Select
      className='link-filter-select'
      defaultValue='orderBy'
      onChange={onChangeFilter}
    >
      <Option value='orderBy'>Order By</Option>
      <Option value='low'>Points: Low to High</Option>
      <Option value='high'>Points: High to Low</Option>
    </Select>
  )
}

export default LinkFilterSelect
