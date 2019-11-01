<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
import {mapMutations} from 'vuex';
export default {
    name: 'App',
    mounted(){
        // 有cookie，获取用户信息判断是否有效
        if(document.cookie){
            this.axios.post('/vc/member/getMemberDetail').then(res=>{
                if(res.data.status==1){
                    this.saveCookie(document.cookie)
                    this.saveUserInfo(res.data.data)
                }else{
                    console.log('暂未登陆！')
                    // this.$router.push('/');
                }
            })
        }else{
            console.log('暂未登陆！')
            // this.$router.push('/');
        }
    },
    methods: {
        ...mapMutations(['saveCookie','saveUserInfo'])
    }
}
</script>

<style lang='scss'>
    html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,
    kbd,q,s,samp,small,strike,strong,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,
    tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,
    video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    ul,li{
        list-style: none
    }
	html,body{
		width:100%;
		height:100%;
		background:rgba(244,246,246,1);
        &::-webkit-scrollbar{width: 4px;}
        &::-webkit-scrollbar-thumb{width: 5px;background: blue;background-color: #DDE1E4}
	}
    a{
        text-decoration: none;
    }
    .ellipsis{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    #app{
        height:100%;
    }
    #center{
        .current-row{
            td{
                box-sizing: border-box;
                background:rgba(233,241,255,1) !important;
                border-top:2px solid rgba(40,120,255,1);
                border-bottom:2px solid rgba(40,120,255,1);
                border-right:none !important;
                border-left:none !important;
            }
        }
        .el-table::before{
            height:0 !important;
        }
    }
    .swiper-pagination-bullet {
        display: inline-block;
        width:40px;
        height:8px;
        background:rgba(0,0,0,0.15);
        border-radius:5px;
    }
    .swiper-pagination-bullet-active {
        width:40px;
        height:8px;
        background:rgba(40,120,255,1);
        border-radius:5px;
    }
    .swiper-pagination-fraction,
    .swiper-pagination-custom,
    .swiper-container-horizontal > .swiper-pagination-bullets {
        bottom: 10px;
        left: 0;
        width: 100%;
        text-align: center;
        box-sizing: border-box;
        padding-right: 35px;
    }
</style>
