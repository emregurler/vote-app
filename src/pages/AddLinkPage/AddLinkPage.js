import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button } from 'antd'
import { Link, Redirect } from 'react-router-dom'
import { addLink } from '../../redux/actions'

const AddLinkPage = ({ form, addLink }) => {
  const { getFieldDecorator } = form
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        const newLink = {
          name: values.linkname,
          url: values.linkurl,
          point: 0,
          updatedDate: new Date().getTime()
        }
        addLink(newLink, (isSuccess) => {
          isSuccess && setShouldRedirect(true)
        })
      }
    })
  }

  return (
    <React.Fragment>
      {shouldRedirect && <Redirect to='/' />}
      <Link to='/'>return page</Link>
      <span>Add New Link</span>
      <Form onSubmit={handleSubmit} className='login-form'>
        <Form.Item>
          {getFieldDecorator('linkname')(<Input placeholder='e.g. Alphabet' />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('linkurl')(
            <Input placeholder='e.g. http://xyz.abc' />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
          >
            ADD
          </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  )
}

const mapDispatchToProps = {
  addLink
}

export default connect(null, mapDispatchToProps)(Form.create()(AddLinkPage))