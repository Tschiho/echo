import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/mock'
import '@/assets'

import VueProgressBar from 'vue-progressbar'
import { Swipe, SwipeItem, InfiniteScroll, Toast, Indicator, Spinner, Popup, Cell } from 'mint-ui'

Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.use(InfiniteScroll)
Vue.component(Spinner.name, Spinner)
Vue.component(Popup.name, Popup)
Vue.component(Cell.name, Cell)

Vue.prototype.$toast = Toast
Vue.prototype.$loading = Indicator

Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  thickness: '2px'
})

Vue.config.productionTip = false

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
