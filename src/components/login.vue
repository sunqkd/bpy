<template>
    <div id="loginBp">
        <div class="banner">
            <img src="/static/img/banner.png" alt=""  class="bannerImg" />
            <div class="bannerTitle">
                <div class="bannerLeft">
                    <img src="/static/img/logo1.png" alt="">
                    <span>BP云</span>
                </div>
                <div class="bannerRight">
                    <ul class="bannerUl">
                        <li>
                            加入微信群
                            <div class="wechatCode">
                                <img src="/static/img/pm.jpg" alt="" />
                                <span class="pmtext">微信扫码加产品经理入群</span>
                                <span class="pmsubtext">问题反馈 · 体验新功能</span>
                            </div>
                        </li>
                        <li>BP云小程序
                            <div class="bpCode">
                                <img src="/static/img/qh.jpg" alt="" />
                                <span class="bptext">BP云小程序</span>
                            </div>
                        </li>
                        <li @click="loginOF()">{{this.userInfo?'进入工作台':'登录'}}</li>
                    </ul>
                </div>
            </div>
            <div class="freecharge" @click="loginOF()">
                免费使用
            </div>
            <div class="Bpcontent">
                <div class="banner01">
                    <img src="/static/img/banner01.png" alt="" >
                    <img src="/static/img/banne01-1.png" alt="">
                </div>
                <div class="bannerText">
                    <span>「BP云」是什么？</span>
                    <span>BP云是一款为投资人和创业者高效管理项目资料的小程序，您所有的文件都已安全加密处理，您可以</span>
                    <span>在小程序及网站随时存取下载。</span>
                    <span>我们已获得君盛投资、清源投资及深圳国资委旗下远致投资战略入股，欢迎您帮助我们改进产品体验。</span>
                </div>
                <div class="swiperContain">
                    <div class="swiper-container">
						<div class="swiper-wrapper" >
							<div class="swiper-slide">
								<img src="/static/img/swiper1.png" alt="">
							</div>
                            <div class="swiper-slide">
								<img src="/static/img/swiper2.png" alt="">
							</div>
                            <div class="swiper-slide">
								<img src="/static/img/swiper3.png" alt="">
							</div>
						</div>
						<!-- 如果需要分页器 -->
						<div class="swiper-pagination"></div>
					</div>
                </div>
                <div class="bottom">
                    <img src="/static/img/bottom.png" alt="">
                </div>
                <div class="Copyright">
                    Copyright © BP云　粤ICP备12093050号-
                </div>
            </div>
        </div>
        <div class="loginTest" v-if="wxFlag">
            <div class="contain">
                <img src="/static/img/closepop.png" alt="" @click="closeWX()">
                <span>微信登录</span>
                <iframe id="iframe" :src="wxurl" frameborder="0" style="width:100%;height:250px;overflow:hidden" scrolling="no"></iframe>
            </div>
        </div>
    </div>
</template>
<script>
import Swiper from 'swiper';
import {mapState,mapMutations} from 'vuex'
export default {
    data(){
        return {
            wxurl:'', // 微信二维码
            wxFlag:false, // 登录弹窗
        }
    },
    computed: {
		...mapState(['cookie','userInfo','bgColor'])
	},
    async created(){
        this.getloginCode();
        await this.getMemberDetail()
    },
    mounted(){
        this.$nextTick(()=>{
            this.newSwiper();
        })
    },
    methods:{
        async getMemberDetail(){
			await this.axios.post('/vc/member/getMemberDetail').then(res=>{
                if(res.data.status==1){
                    this.saveCookie(this.getCookie('rememberMatch'))
					this.saveUserInfo(res.data.data)
                }else{
                    console.log('暂未登陆！')
                    // this.$router.push('/');
                }
            })
        },
        getCookie(cookie_name) {
			var allcookies = document.cookie;
			//索引长度，开始索引的位置
			var cookie_pos = allcookies.indexOf(cookie_name);

			// 如果找到了索引，就代表cookie存在,否则不存在
			if (cookie_pos != -1) {
				// 把cookie_pos放在值的开始，只要给值加1即可
				//计算取cookie值得开始索引，加的1为“=”
				cookie_pos = cookie_pos + cookie_name.length + 1; 
				//计算取cookie值得结束索引
				var cookie_end = allcookies.indexOf(";", cookie_pos);
				
				if (cookie_end == -1) {
					cookie_end = allcookies.length;

				}
				//得到想要的cookie的值
				var value = unescape(allcookies.substring(cookie_pos, cookie_end)); 
			}
			return value;
		},
        ...mapMutations(['saveCookie','saveUserInfo']),
        getloginCode(){ // 获取二维码
            this.axios.post('/vc/wxLog/wxLoginCode_BP').then(res=>{
                if(res.data.status==1){
                    this.wxurl=res.data.msg;
                    let index=this.wxurl.indexOf('&');
                    this.wxurl=this.wxurl.slice(0,index)+'&href=data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDE0MHB4O21hcmdpbi10b3A6MDt9Ci5pbXBvd2VyQm94IC50aXRsZSB7ZGlzcGxheTogbm9uZTt9Ci5pbXBvd2VyQm94IC5pbmZvIHt3aWR0aDogMjAwcHg7fQouc3RhdHVzX2ljb24ge2Rpc3BsYXk6IG5vbmV9Ci5pbXBvd2VyQm94IC5zdGF0dXMge3RleHQtYWxpZ246IGNlbnRlcjsgY29sb3I6ICM5OTk7fQouaW1wb3dlckJveCAuc3RhdHVzIHAgeyBmb250LXdlaWdodDogMzAwfQouaW1wb3dlckJveCAuc3RhdHVzX3R4dCBwIHt0b3A6IDNweH0KLmltcG93ZXJCb3ggLmljb24zOF9tc2cuc3VjY3tkaXNwbGF5Om5vbmV9'+this.wxurl.slice(index)
                   
                }
            })
        },
        newSwiper(){ // 轮播图
            var mySwiper = new Swiper ('.swiper-container', {
                loop: true, // 循环轮播
                autoplay:5000,
                autoplayDisableOnInteraction : false,
                pagination : '.swiper-pagination',
                paginationClickable :true,
                observer:true,
                observeParents:true,
                // slidesPerView: 'auto',
                onSlideChangeEnd: function(swiper){ 
                　　　swiper.update()
                }
            }) 
        },
        loginOF(){ // 登录或者进入工作台
            if(this.userInfo){
                this.$router.push({path:'/bpy',query:{customerId:this.cookie}})
            }else{
                // 登录
                this.wxFlag = true;
            }
        },
        closeWX(){ // 关闭弹窗
            this.wxFlag = false;
        }
    }
}
</script>
<style lang="scss" scoped>
    #loginBp{
        width:100%;
        min-height:100%;
        background:rgba(244,246,246,1);
        .banner{
            width:100%;
            position:relative;
            .bannerImg{
                display:inline-block;
                width:100%;
                height:auto;
            }
            .bannerTitle{
                width:100%;
                padding:24px 28px;
                box-sizing: border-box;
                position:absolute;
                left:0;
                top:0;
                display:flex;
                align-items: center;
                justify-content: space-between;
                z-index:5;
                .bannerLeft{
                    display:flex;
                    align-items: center;
                    img{
                        width:36px;
                        height:36px;
                        display:inline-block;
                        margin-right:12px;
                    }
                    span{
                        font-size: 20px;
                        color:rgba(255,255,255,1);
                    }
                }
                .bannerRight{
                    height:36px;
                    .bannerUl{
                        height:100%;
                        display:flex;
                        align-items: center;
                        font-size:14px;
                        color:rgba(255,255,255,1);
                        li{
                            height:100%;
                            margin-left:32px;
                            display:flex;
                            align-items: center;
                            justify-content: center;
                            position:relative;
                            cursor:pointer;
                            &:nth-child(1){
                                margin-left:0;
                                &:hover{
                                    .wechatCode{
                                        display:block;
                                    }  
                                }
                            }
                            &:nth-child(2){
                                &:hover{
                                    .bpCode{
                                        display:block;
                                    }  
                                }
                                
                            }
                            &:last-child{
                                width:94px;
                                height:28px;
                                background:rgba(40,120,255,1);
                                
                            }
                            .wechatCode{
                                display:none;
                                position:absolute;
                                left:-110px;
                                top:35px;
                                width:180px;
                                padding:20px 0;
                                box-sizing: border-box;
                                background:rgba(255,255,255,1);
                                box-shadow:0px 4px 8px 0px rgba(0,0,0,0.08);
                                border-radius:6px;
                                text-align: center;
                                img{
                                    width:120px;
                                    height:auto;
                                    margin-bottom:10px;
                                }
                                span{
                                    display: block;
                                }
                                .pmtext{
                                    color:#222222;
                                    font-size:13px;
                                    line-height: 18px;
                                }
                                .pmsubtext{
                                    color:#666666;
                                    font-size:13px;
                                    line-height: 18px;
                                }
                            }
                            .bpCode{
                                display:none;
                                position:absolute;
                                left:0px;
                                top:35px;
                                width:160px;
                                padding:20px 0;
                                box-sizing: border-box;
                                background:rgba(255,255,255,1);
                                box-shadow:0px 4px 8px 0px rgba(0,0,0,0.08);
                                border-radius:6px;
                                text-align: center;
                                .bptext{
                                    color:#222222;
                                    font-size:13px;
                                    display:inline-block;
                                }
                                img{
                                    display:inline-block;
                                    width:120px;
                                    height:auto;
                                }
                            }
                        }
                    }
                }
            }
            .freecharge{
                position:absolute;
                width:160px;
                height:40px;
                background:rgba(255,255,255,1);
                color:#2878FF;
                line-height:40px;
                text-align: center;
                left:50%;
                margin-left:-80px;
                top:41%;
                z-index:5;
                cursor:pointer;
            }
            .Bpcontent{
                position:absolute;
                left:50%;
                margin-left:-640px;
                top:63%;
                width:1280px;
                height:1732px;
                background:rgba(255,255,255,1);
                padding:72px 116px 60px 116px;
                box-sizing: border-box;
                text-align: center;
                .banner01{
                    width:100%;
                    padding:0 75px;
                    box-sizing: border-box;
                    img{
                        width:100%;
                        height:auto;
                        display: inline-block;
                        &:nth-child(2){
                            margin-top:68px;
                        }
                    }
                }
                .bannerText{
                    width:100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-top:81px;
                    span{
                        font-size:16px;
                        color:rgba(34,34,34,1);
                        line-height:22px;
                        &:nth-child(1){
                            color:#222222;
                            font-size:28px;
                            margin-bottom:22px;
                        }
                    }
                }
                .swiperContain{
                    width:100%;
                    height:660px;
                    margin-top:49px;
                    img{
                        width:100%;
                        height:100%;
                        display:inline-block;
                    }
                }
                .bottom{
                    width:100%;
                    margin-top:113px;
                    display:flex;
                    align-items: center;
                    justify-content: center;
                    img{
                        height:148px;
                        width:auto;
                        display: inline-block;
                    }
                }
            }
            .Copyright{
                width: 100%;
                display:flex;
                align-items: center;
                justify-content: center;
                height:86px;
                color:#666666;
                font-size:12px;
                background:rgba(244,246,246,1);
                // background:red;
                position:absolute;
                bottom:0;
                left:0px;
            }
        }
        // 微信登录
        .loginTest{
            width:100%;
            height:100%;
            background:rgba(0,0,0,0.4);
            position:fixed;
            left:0;
            top:0;
            z-index:20;
            display:flex;
            align-items: center;
            justify-content: center;
            .contain{
                width:340px;
                height:340px;
                background:rgba(255,255,255,1);
                border-radius:8px;
                display: flex;
                flex-direction: column;
                align-items: center;
                position:relative;
                img{
                    width:20px;
                    height:20px;
                    display:inline-block;
                    position:absolute;
                    right:16px;
                    top:16px;
                    cursor:pointer;
                }
                span{
                    color:#666666;
                    font-size:20px;
                    margin-top:40px;
                    margin-bottom:18px;
                }
            }
        }
    }
</style>
