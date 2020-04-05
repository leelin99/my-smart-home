import Vue from 'vue'
import App from './App'
import axios from "axios"
import apis from "./apis/api"

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$apis = apis
App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
