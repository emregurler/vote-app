import axios from 'axios'
// import { linksOrderOptions } from '../pages/VoteLinkPage/constants'

const getLinks = () => axios.get('/links').then((response) => response.data)

const addLink = (newLink) =>
  axios.post('/links', newLink).then((response) => response.data)

const putLink = (updatedLink) =>
  axios
    .put(`/links/${updatedLink.id}`, updatedLink)
    .then((response) => response.data)

const deleteLink = (id) =>
  axios.delete(`/links/${id}`).then((response) => response.data)

//http://localhost:3001/links?_sort=point,updatedDate&_order=desc,desc,_page=1&_limit=5
//http://localhost:3001/links?_sort=updatedDate&_order=asc&_page=1&_limit=2

const getSortedLinkPageByPoint = (orderBy, page, pageSize) => {
  const { sortQuery, orderQuery } = {
    sortQuery: orderBy ? '_sort=point,updatedDate' : '',
    orderQuery: orderBy ? `&_order=${orderBy},desc` : ''
  }
  return axios
    .get(`/links?${sortQuery}${orderQuery}&_page=${page}&_limit=${pageSize}`)
    .then((response) => ({
      links: response.data,
      totalCount: response.headers['x-total-count']
    }))
}

export default {
  getLinks,
  addLink,
  putLink,
  deleteLink,
  getSortedLinkPageByPoint
}
