import Vue from 'vue'
import Vuex from 'vuex'
import home from '@/modules/home/store.js'
import authentication from '@/modules/authentication/store.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    home,
    authentication,
  }
})