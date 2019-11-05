import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'

Vue.prototype.$http = axios
Vue.prototype.$http.defaults.baseURL = 'https://novel.juhe.im'
Vue.config.productionTip = false
Vue.filter('toWan',function (num) {
  if (num < 9999) return num.toString()
  var res = Math.floor(num / 1000)
  res = res / 10
  return res + '万'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
