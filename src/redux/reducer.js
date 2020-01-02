import types from './action-types'

const initialState = {
  currentList: [],
  total: 0,
  currentPage: 1,
  pageSize: 5,
  selectedOrder: undefined
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PAGINATED_LINKS_SUCCESS:
      return { ...state, currentList: [...action.links], total: +action.total }

    case types.GET_SORTED_PAGINATED_LINKS_SUCCESS:
      return { ...state, currentList: [...action.links], total: +action.total }

    case types.ADD_LINK_SUCCESS:
      return {
        ...state,
        currentList: [...state.currentList, action.newLink]
      }
    case types.DELETE_LINK_SUCCESS:
      return {
        ...state,
        currentList: state.currentList.filter((link) => link.id !== action.id)
      }
    case types.PUT_LINK_SUCCESS:
      const news = state.currentList.map((link) =>
        link.id === action.link.id ? action.link : link
      )
      return {
        ...state,
        currentList: news
      }
    case types.SET_SELECTED_ORDER:
      return {
        ...state,
        currentPage: 1,
        selectedOrder: action.selectedOrder
      }
    case types.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage
      }
    case types.RESET_LINK_REDUCER:
      return {
        ...initialState
      }
    default:
      return state
  }
}
