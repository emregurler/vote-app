import React from 'react'
import { call, put, takeLatest, select } from 'redux-saga/effects'
import { message } from 'antd'
import types from './action-types'
import {
  addLinkSuccess,
  deleteLinkSuccess,
  getSortedPaginatedLinks,
  getSortedPaginatedLinksSuccess
} from './actions'
import API from './services'
import CustomMessage from '../components/CustomMessage'

const generateCustomMessage = (name, restOfText) => {
  return <CustomMessage name={name} restOfText={restOfText} />
}

const getStateLinks = (state) => state.linkReducer.links
const getStatePage = (state) => state.linkReducer.currentPage
const getStatePageSize = (state) => state.linkReducer.pageSize
const getStateSelectedOrder = (state) => state.linkReducer.selectedOrder

export function* getCurrentList() {
  try {
    const page = yield select(getStatePage)
    const pageSize = yield select(getStatePageSize)
    const selectedOrder = yield select(getStateSelectedOrder)
    const { links, totalCount } = yield call(
      API.getSortedLinkPageByPoint,
      selectedOrder,
      page,
      pageSize
    )
    yield put(getSortedPaginatedLinksSuccess(links, totalCount))
  } catch (error) {
    console.log('ERROR:', error)
  }
}

export function* addLink({ newLink }) {
  try {
    const addedLink = yield call(API.addLink, newLink)
    yield put(addLinkSuccess(addedLink))
    message.success(generateCustomMessage(newLink.name, 'added'))
  } catch (error) {
    console.log('ERROR:', error)
  }
}

export function* deleteLink({ id, callback }) {
  try {
    yield call(API.deleteLink, id)
    const links = yield select(getStateLinks)
    const deletedLink = links.find((link) => link.id === id)
    yield put(deleteLinkSuccess(id))
    message.success(generateCustomMessage(deletedLink.name, 'removed'))
  } catch (error) {
    console.log('ERROR:', error)
  } finally {
    callback()
  }
}

export function* updateLinkPoint({ type, link }) {
  const change = type === types.UP_VOTE_LINK ? +1 : -1
  const updatedLink = {
    ...link,
    point: link.point + change,
    updatedDate: new Date().getTime()
  }
  try {
    yield call(API.putLink, updatedLink)
    yield put(getSortedPaginatedLinks())
  } catch (error) {
    console.log('ERROR:', error)
  }
}

export default function* rootSaga() {
  yield takeLatest(types.GET_SORTED_PAGINATED_LINKS, getCurrentList)
  yield takeLatest(types.SET_CURRENT_PAGE, getCurrentList)
  yield takeLatest(types.SET_SELECTED_ORDER, getCurrentList)
  yield takeLatest(types.ADD_LINK, addLink)
  yield takeLatest(types.DELETE_LINK, deleteLink)
  yield takeLatest(types.UP_VOTE_LINK, updateLinkPoint)
  yield takeLatest(types.DOWN_VOTE_LINK, updateLinkPoint)
}
