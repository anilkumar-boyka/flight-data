// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//parse server configuration
Parse.initialize("kBs4F7HKAdGvWkM7TctqEDP1unOZCf4mgHGlY25O");
Parse.serverURL = 'https://server.logatp.com/parse'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
