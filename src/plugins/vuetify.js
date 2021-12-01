import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import VuetifyConfirm from 'vuetify-confirm'

Vue.use(Vuetify)

const vuetify = new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
})

Vue.use(VuetifyConfirm, {
  vuetify,
  buttonTrueText: 'Yes',
  buttonFalseText: 'No',
})
export default vuetify