import Vue from 'vue'
import Router from 'vue-router'
import center from '@/components/center'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'center',
			component: center
		}
	]
})
