import types from './action-types'

export const getLinks = () => {
  return { type: types.GET_LINKS }
}

export const getLinksSuccess = (links) => {
  return {
    type: types.GET_LINKS_SUCCESS,
    links
  }
}

export const addLink = (newLink) => {
  return {
    type: types.ADD_LINK,
    newLink
  }
}

export const addLinkSuccess = (newLink) => {
  return {
    type: types.ADD_LINK_SUCCESS,
    newLink
  }
}

export const deleteLink = (id) => {
  return {
    type: types.DELETE_LINK,
    id
  }
}

export const deleteLinkSuccess = (id) => {
  return {
    type: types.DELETE_LINK_SUCCESS,
    id
  }
}

export const upvoteLink = (link) => {
  return {
    type: types.UP_VOTE_LINK,
    link
  }
}

export const upvoteLinkSuccess = (link) => {
  return {
    type: types.UP_VOTE_LINK_SUCCESS,
    link
  }
}

export const downvoteLink = (link) => {
  return {
    type: types.DOWN_VOTE_LINK,
    link
  }
}

export const downvoteLinkSuccess = (link) => {
  return {
    type: types.DOWN_VOTE_LINK_SUCCESS,
    link
  }
}

export const setSelectedOrder = (selectedOrder) => {
  return {
    type: types.SET_SELECTED_ORDER,
    selectedOrder
  }
}

export const resetLinkReducer = () => {
  return {
    type: types.RESET_LINK_REDUCER
  }
}
