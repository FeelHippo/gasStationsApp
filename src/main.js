import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'leaflet/dist/leaflet.css';
import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import vuetify from '@/plugins/vuetify'
import vuelidate from '@/plugins/vuelidate'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  vuelidate,
  render: h => h(App),
}).$mount('#app')