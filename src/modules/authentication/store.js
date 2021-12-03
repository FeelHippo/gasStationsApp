import axios from 'axios'
const API_URL = 'http://localhost:3000'

export default {
  namespaced: true,
  state: () => ({
    success: false,
    username: null,
    password: null,
    token: null,
  }),
  getters: {
    success: state => state.success,
    username: state => state.username,
    password: state => state.password,
    token: state => state.token,
  },
  mutations: {
    updateState(state, { field, value }) {
      state[field] = value
    }
  },
  actions: {
    async verifyToken(context, token) {
      try {
        const tokenAuthentication = await axios.get(`${API_URL}/user/tokenIsValid`,
          {
            headers: {
              'X-Auth-Token': token,
              'Access-Control-Allow-Origin': '*',
            }
          },

        )
        return tokenAuthentication?.data?.success
        
      } catch (error) {
        console.log(error)
      }
    },
    async signIn({ commit }, userData) {
      try {
        const response = await axios.post(`${API_URL}/user/login`, userData, {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
        })

        const { data, status } = response
        if (data && status === 200) {
          const { token } = data

          Object.entries(data).forEach(
            ([ field, value ]) => commit('updateState', { field, value })
          )

          if (token) {
            localStorage.setItem('X-Auth-Token', token)
          }

        }

        return data?.success

      } catch (error) {
        console.log(error)
      }
    },
    async signUp({ commit }, userData) {
      try {
        const response = await axios.post(`${API_URL}/user/register`, userData, {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
        })

        const { data, status } = response
        if (data && status === '200') {

          Object.entries(data).forEach(
            ([ field, value ]) => commit('updateState', { field, value })
          )

        }

        return data?.success

      } catch (error) {
        console.log(error)
      }
    }
  }
}