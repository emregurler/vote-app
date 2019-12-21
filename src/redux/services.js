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

export function* getLinks() {
  //request
  const res = yield call(() =>
    axios
      .get('http://localhost:3001/links')
      .then(function(response) {
        // handle success
        return response
      })
      .catch(function(error) {
        // handle error
        console.log(error)
      })
  )

  yield put(getLinksSuccess(res.data))
}

export function* addLink({ newLink, callback }) {
  //request
  const res = yield call(() =>
    axios
      .post('http://localhost:3001/links', newLink)
      .then(function(response) {
        // handle success
        return response
      })
      .catch(function(error) {
        // handle error
        console.log(error)
      })
  )
  yield put(addLinkSuccess(res.data))
  callback(res.status < 300)
}

export function* deleteLink({ id }) {
  //request
  debugger
  const res = yield call(() =>
    axios
      .delete(`http://localhost:3001/links/${id}`)
      .then(function(response) {
        // handle success
        return response
      })
      .catch(function(error) {
        // handle error
        console.log(error)
      })
  )
  yield put(deleteLinkSuccess(id))
  // callback(res.status < 300)
}

export function* upvoteLink({ link }) {
  //request
  const updatedLink = { ...link, updatedDate: new Date().getTime() }
  const res = yield call(() =>
    axios
      .put(`http://localhost:3001/links/${link.id}`, updatedLink)
      .then(function(response) {
        return response
      })
      .catch(function(error) {
        console.log(error)
      })
  )

  yield put(upvoteLinkSuccess(res.data))
}

export function* downvoteLink({ link }) {
  //request
  const updatedLink = { ...link, updatedDate: new Date().getTime() }
  const res = yield call(() =>
    axios
      .put(`http://localhost:3001/links/${link.id}`, updatedLink)
      .then(function(response) {
        return response
      })
      .catch(function(error) {
        console.log(error)
      })
  )
  yield put(downvoteLinkSuccess(res.data))
}

export default function* rootSaga() {
  yield takeLatest(types.GET_LINKS, getLinks)
  yield takeLatest(types.ADD_LINK, addLink)
  yield takeLatest(types.DELETE_LINK, deleteLink)
  yield takeLatest(types.UP_VOTE_LINK, upvoteLink)
  yield takeLatest(types.DOWN_VOTE_LINK, downvoteLink)
}
