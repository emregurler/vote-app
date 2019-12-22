import './style.css'

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Form, Input, Button, Icon } from 'antd'
import { addLink } from '../../redux/actions'

const AddLinkPage = ({ form, addLink }) => {
  const { getFieldDecorator } = form
  const addBeforeLink = 'http://'

  const handleSubmit = (e) => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        const newLink = {
          name: values.linkname,
          url: addBeforeLink + values.linkurl,
          point: 0,
          updatedDate: new Date().getTime()
        }
        addLink(newLink)
      }
    })
  }

  return (
    <React.Fragment>
      <Col className='add-link-page-container'>
        <Row className='return-to-list-container'>
          <Link to='/'>
            <Icon className='return-to-list-icon' type='arrow-left' />
            Return to List
          </Link>
        </Row>
        <Row className='add-new-link-title'>Add New Link</Row>
        <Row>
          <Form onSubmit={handleSubmit} className='login-form'>
            <Form.Item label='Link Name'>
              {getFieldDecorator('linkname', {
                rules: [
                  {
                    required: true,
                    message: 'Please Enter a Name'
                  }
                ]
              })(<Input placeholder='e.g. Alphabet' />)}
            </Form.Item>
            <Form.Item label='Link URL'>
              {getFieldDecorator('linkurl', {
                rules: [
                  {
                    required: true,
                    message: 'Please Enter a Url'
                  }
                ]
              })(
                <Input
                  addonBefore={addBeforeLink}
                  placeholder='e.g. http://xyz.abc'
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                size='large'
                type='primary'
                htmlType='submit'
                className='add-link-button'
              >
                ADD
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </Col>
    </React.Fragment>
  )
}

const mapDispatchToProps = {
  addLink
}

export default connect(null, mapDispatchToProps)(Form.create()(AddLinkPage))
