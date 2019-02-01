// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './vuex'
import VueAxios from 'vue-axios'
import Axios from 'axios'
import qs from 'qs'
import cfg from "../config/app";

import {HttpClient} from './utils/HttpUtils'
import Tools from './utils/tools'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconfont/iconfont.css'
import './assets/scss/main.css'
import './assets/less/fontColor.less'
import  VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
/***********/
import qiNiuToken from './utils/qiNiuToken'
import qiNiuUpload from './utils/qiNiuUpload'
/************/

Vue.prototype.$ajax = Axios;
Vue.prototype.HttpClient = HttpClient;
Vue.prototype.Tools = Tools;
Vue.prototype.$qs = qs;
Vue.prototype.Urls = cfg;

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueAxios, Axios);
Vue.use(VueQuillEditor);
/**************/
Vue.use(qiNiuToken);
Vue.use(qiNiuUpload);
/**************/

window.Vue = Vue;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})