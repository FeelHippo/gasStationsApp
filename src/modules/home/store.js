import axios from 'axios'
import LocalStorage from '@/utils/storage'
const API_URL = 'http://localhost:3000'

export default {
  namespaced: true,
  state: () => ({
    gasStations: [],
  }),
  getters: {
    markers: state => state?.gasStations,
  },
  mutations: {
    updateGasStations(state, data) {
      state.gasStations = data
    }
  },
  actions: {
    async getAllGasStations({ commit }) {
      try {

        const response = await axios.get(`${API_URL}/api/allStations`)
        const { data } = response
        commit('updateGasStations', data)

      } catch (error) {
        console.log(error)
      }
    },
    async postNewGasStation(context, data) {
      try {
        
        const token = LocalStorage.returnTokenValue()
        const response = await axios.post(`${API_URL}/api/postStation`, data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const { data: { success }, status } = response
        return status === 200 && success

      } catch (error) {
        console.log(error)
      }
    },
    async updateGasStation(context, data) {
      try {
        
        const token = LocalStorage.returnTokenValue()
        const response = await axios.put(`${API_URL}/api/updateStation`, data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const { data: { success }, status } = response
        return status === 200 && success

      } catch (error) {
        console.log(error)
      }
    },
    async deleteGasStation(context, id) {
      try {
        
        const token = LocalStorage.returnTokenValue()
        const response = await axios.delete(`${API_URL}/api/deleteStation/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const { data: { success }, status } = response
        return status === 200 && success
        
      } catch (error) {
        console.log(error)
      }
    }
  }
}