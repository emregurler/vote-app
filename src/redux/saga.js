import React from 'react'
import { call, put, takeLatest, select } from 'redux-saga/effects'
import { message } from 'antd'
import types from './action-types'
import {
  getLinksSuccess,
  addLinkSuccess,
  deleteLinkSuccess,
  upvoteLinkSuccess,
  downvoteLinkSuccess
} from './actions'
import API from './services'
import CustomMessage from '../components/CustomMessage'

const generateCustomMessage = (name, restOfText) => {
  return <CustomMessage name={name} restOfText={restOfText} />
}

const getStateLinks = (state) => state.linkReducer.links

export function* getLinks() {
  try {
    const links = yield call(API.fetchGetLinks)
    yield put(getLinksSuccess(links))
  } catch (error) {
    console.log('ERROR:', error)
  }
}

export function* addLink({ newLink }) {
  try {
    const addedLink = yield call(API.fetchAddLink, newLink)
    yield put(addLinkSuccess(addedLink))
    message.success(generateCustomMessage(newLink.name, 'added'))
  } catch (error) {
    console.log('ERROR:', error)
  }
}

export function* deleteLink({ id, callback }) {
  try {
    yield call(API.fetchDeleteLink, id)
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

export function* upvoteLink({ link }) {
  const updatedLink = {
    ...link,
    point: link.point + 1,
    updatedDate: new Date().getTime()
  }
  try {
    const link = yield call(API.fetchUpdateVoteLink, updatedLink)
    yield put(upvoteLinkSuccess(link))
  } catch (error) {
    console.log('ERROR:', error)
  }
}

export function* downvoteLink({ link }) {
  const updatedLink = {
    ...link,
    point: link.point - 1,
    updatedDate: new Date().getTime()
  }
  try {
    const link = yield call(API.fetchUpdateVoteLink, updatedLink)
    yield put(downvoteLinkSuccess(link))
  } catch (error) {
    console.log('ERROR:', error)
  }
}

export default function* rootSaga() {
  yield takeLatest(types.GET_LINKS, getLinks)
  yield takeLatest(types.ADD_LINK, addLink)
  yield takeLatest(types.DELETE_LINK, deleteLink)
  yield takeLatest(types.UP_VOTE_LINK, upvoteLink)
  yield takeLatest(types.DOWN_VOTE_LINK, downvoteLink)
}
