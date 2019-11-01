// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'swiper/dist/css/swiper.css'
import store from './store'
import axios from 'axios'
import { get, post } from './http/http'
Vue.prototype.axios = axios;

Vue.use(ElementUI);
Vue.prototype.GET = get;
Vue.prototype.POST = post;
Vue.config.productionTip = false;

// router.afterEach((to, from, next) => {
// 	//机构 行业 项目没有登录就跳转登录页面
// 	if ((to.path == '/bpy') && document.cookie.indexOf('rememberMatch=') == -1) {
// 		router.push('/login')
// 	}
// })

/* eslint-disable no-new */
new Vue({
	el: '#app',
	store,
	router,
	components: { App },
	template: '<App/>'
})
