import axios from 'axios'

export default {
  fetchGetLinks() {
    return axios.get('/links').then(function(response) {
      return response.data
    })
  },
  fetchAddLink(newLink) {
    return axios.post('/links', newLink).then(function(response) {
      return response.data
    })
  },
  fetchUpdateVoteLink(updatedLink) {
    return axios
      .put(`/links/${updatedLink.id}`, updatedLink)
      .then(function(response) {
        return response.data
      })
  },
  fetchDeleteLink(id) {
    return axios.delete(`/links/${id}`).then(function(response) {
      return response.data
    })
  }
}
