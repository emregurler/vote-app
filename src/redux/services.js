import { call, put, takeLatest } from 'redux-saga/effects'
import {
  getLinksSuccess,
  addLinkSuccess,
  deleteLinkSuccess,
  upvoteLinkSuccess,
  downvoteLinkSuccess
} from './actions'
import types from './action-types'
import axios from 'axios'

function fetchUpdateVoteLink(updatedLink) {
  console.log(updatedLink)
  return axios
    .put(`/links/${updatedLink.id}`, updatedLink)
    .then(function(response) {
      console.log(response)
      return response.data
    })
}

function fetchGetLinks() {
  return axios.get('/links').then(function(response) {
    return response.data
  })
}

function fetchAddLink(newLink) {
  return axios.post('/links', newLink).then(function(response) {
    return response.data
  })
}

function fetchDeleteLink(id) {
  return axios.delete(`/links/${id}`).then(function(response) {
    return response.data
  })
}

export function* getLinks() {
  try {
    const links = yield call(fetchGetLinks)
    yield put(getLinksSuccess(links))
  } catch (error) {
    console.log('ERROR:', error)
  }
}

export function* addLink({ newLink }) {
  try {
    const addedLink = yield call(fetchAddLink, newLink)
    yield put(addLinkSuccess(addedLink))
  } catch (error) {
    console.log('ERROR:', error)
  }
}

export function* deleteLink({ id }) {
  try {
    yield call(fetchDeleteLink, id)
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
    const link = yield call(fetchUpdateVoteLink, updatedLink)
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
    const link = yield call(fetchUpdateVoteLink, updatedLink)
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
