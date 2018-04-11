// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './zjapp.vue'
import router from './router'
import VueRouter from 'vue-router'
import store from './store'

// Vue.use(Vuex)

Vue.config.productionTip = false

//加载公共组件
import components from './components/'
Object.keys(components).forEach((key)=>{
  Vue.component(key,components[key]);
})

//挂靠公共过滤器
import filters from './config/filters.js'
Object.keys(filters).forEach((key)=>{
  Vue.filter(key,filters[key]);
})

//挂靠公共方法
import methods from './config/methods.js'
Object.keys(methods).forEach((key)=>{
  Vue.prototype[key]=methods[key];
})



new Vue({
  el: '#index',
  router,
  store,
  template: '<App/>',
  components: { App }
})


