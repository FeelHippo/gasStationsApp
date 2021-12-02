import store from '@/store'
export default {
  readTokenStorage: async () => {
    const token = localStorage.getItem('X-Auth-Token')
    const success = token && await store.dispatch('authentication/verifyToken', token)
    if (success) return { name: 'home' }
    return { name: 'authentication' }
  },
  returnTokenValue: () => localStorage.getItem('X-Auth-Token'),
}