import './index.css'

import React from 'react'
import { Select } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setSelectedFilter } from '../../../../redux/actions'
import { linkFilterOptions } from '../../constants'

const { Option } = Select

const LinkFilterSelect = ({ selectedFilter, setSelectedFilter }) => {
  const onChangeFilter = (value) => {
    setSelectedFilter(value)
  }
  return (
    <Select
      className='link-filter-select'
      defaultValue={linkFilterOptions.defaultTitle}
      onChange={onChangeFilter}
      {...(selectedFilter && { value: selectedFilter })}
    >
      {Object.values(linkFilterOptions.options).map((filterOption, i) => (
        <Option key={i} value={filterOption.value}>
          {filterOption.title}
        </Option>
      ))}
    </Select>
  )
}

LinkFilterSelect.propTypes = {
  setSelectedFilter: PropTypes.func
}

const mapStateToProps = (state) => ({
  selectedFilter: state.linkReducer.selectedFilter
})

const mapDispatchToProps = {
  setSelectedFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkFilterSelect)
