import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login';
import index from '@/components/index';
import phone from '@/components/phone';

Vue.use(Router)

export default new Router({
	routes: [
		{
			path:'/',
			redirect:'/login'
		},
		{ // 登录
			path: '/login',
			name: 'login',
			component: login
		},
		{ // 云助手
			path:'/bpy',
			name:'bpy',
			component: index
		},
		{ // 绑定手机号
			path:'/phone',
			name:'phone',
			component: phone
		}
	]
})
