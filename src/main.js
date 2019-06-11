import Vue from 'vue'
import App from './App'
import router from './router'

import 'babel-polyfill'      //兼容ie9处理
import 'es6-promise/auto'

import axios from './api/index'
Vue.prototype.$axios = axios

import Store from './store/store'
Vue.prototype.$Store = Store

import ElementUI from 'element-ui';   //引入element-ui
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);





Vue.config.productionTip = false

Vue.filter('turnStatus',function(value){
  let data = Store.data.statusList;
  let st;
  data.forEach(item=>{
    if(item.value == value){
      st = item.text;
    }
  })
  return st;
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


