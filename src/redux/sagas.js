import { call, put, takeLatest } from 'redux-saga/effects'
import types from './action-types'
import {
  getLinksSuccess,
  addLinkSuccess,
  deleteLinkSuccess,
  upvoteLinkSuccess,
  downvoteLinkSuccess
} from './actions'
import API from './services'

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
  } catch (error) {
    console.log('ERROR:', error)
  }
}

export function* deleteLink({ id }) {
  try {
    yield call(API.fetchDeleteLink, id)
    yield put(deleteLinkSuccess(id))
  } catch (error) {
    console.log('ERROR:', error)
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
  } catch (e) {
    console.log('error:', e)
  }
}

export default function* rootSaga() {
  yield takeLatest(types.GET_LINKS, getLinks)
  yield takeLatest(types.ADD_LINK, addLink)
  yield takeLatest(types.DELETE_LINK, deleteLink)
  yield takeLatest(types.UP_VOTE_LINK, upvoteLink)
  yield takeLatest(types.DOWN_VOTE_LINK, downvoteLink)
}
