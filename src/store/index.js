import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state:{
        cookie:'',//cookie，不为空则表示登录过
        userInfo:'',//用户信息
        customerId:'',//用户id
        bgColor:['#64B5F6','#7986CB','#BA68C8','#F06292','#B5D839','#BCAAA4','#81C784','#E57373','#90A4AE','#FBC02D','#4DD0E1','#9575CD']
    },
    getters: {
        
    },
    mutations: {
        // 保存cookie
        saveCookie(state,preload){
            state.cookie=preload;
        },
        // 保存用户信息
        saveUserInfo(state,preload){
            state.userInfo=preload;
        },
    },
    actions:{
        
    }
})