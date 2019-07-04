import Vue from 'vue'
import App from './App.vue'
import Servers from './components/Server/Servers.vue'

Vue.component('app-servers', Servers);

new Vue({
  el: '#app',
  render: h => h(App)
})
