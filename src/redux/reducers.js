import types from './action-types'

const initialState = {
  links: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_LINKS_SUCCESS:
      const { links } = action
      links.sort((a, b) => b.updatedDate - a.updatedDate)

      return { ...state, links: [...links] }
    case types.ADD_LINK_SUCCESS:
      return {
        ...state,
        links: [...state.links, action.newLink]
      }
    case types.DELETE_LINK_SUCCESS:
      return {
        ...state,
        links: state.links.filter((link) => link.id !== action.id)
      }
    case types.UP_VOTE_LINK_SUCCESS:
      const news = state.links.map((link) =>
        link.id === action.link.id ? action.link : link
      )
      return {
        ...state,
        links: news
      }
    case types.DOWN_VOTE_LINK_SUCCESS:
      return {
        ...state,
        links: state.links.map((link) =>
          link.id === action.link.id ? action.link : link
        )
      }

    default:
      return state
  }
}
