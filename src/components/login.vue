<template>
    <div id="loginBp">
        <div class="banner">
            <img src="/static/img/banner.png" alt=""  class="bannerImg" />
            <div class="bannerTitle">
                <div class="bannerLeft">
                    <img src="/static/img/logo1.png" alt="">
                    <span>BP云助手</span>
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
                        <li>BP云小程序</li>
                        <li>进入工作台</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="loginTest">
            <iframe id="iframe" :src="url" frameborder="0" style="width:100%;height:221px;overflow:hidden" scrolling="no"></iframe>
        </div>
    </div>
</template>
<script>
import Swiper from 'swiper';
export default {
    data(){
        return {
            url:''
        }
    },
    created(){
        this.getloginCode();
    },
    methods:{
        getloginCode(){ // 获取
            this.axios.post('/vc/wxLog/wxLoginCode_BP').then(res=>{
                if(res.data.status==1){
                    this.url=res.data.msg;
                    let index=this.url.indexOf('&');
                    this.url=this.url.slice(0,index)+'&href=data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDE0MHB4O21hcmdpbi10b3A6MDt9Ci5pbXBvd2VyQm94IC50aXRsZSB7ZGlzcGxheTogbm9uZTt9Ci5pbXBvd2VyQm94IC5pbmZvIHt3aWR0aDogMjAwcHg7fQouc3RhdHVzX2ljb24ge2Rpc3BsYXk6IG5vbmV9Ci5pbXBvd2VyQm94IC5zdGF0dXMge3RleHQtYWxpZ246IGNlbnRlcjsgY29sb3I6ICM5OTk7fQouaW1wb3dlckJveCAuc3RhdHVzIHAgeyBmb250LXdlaWdodDogMzAwfQouaW1wb3dlckJveCAuc3RhdHVzX3R4dCBwIHt0b3A6IDNweH0KLmltcG93ZXJCb3ggLmljb24zOF9tc2cuc3VjY3tkaXNwbGF5Om5vbmV9'+this.url.slice(index)
                    console.log(res);
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    #loginBp{
        width:100%;
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
                background:pink;
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
                        background:red;
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
                            &:last-child{
                                width:94px;
                                height:28px;
                                background:rgba(40,120,255,1);
                                
                            }
                            .wechatCode{
                                display:none;
                                position:absolute;
                                left:-110px;
                                top:38px;
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
                        }
                    }
                }
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
        }
    }
</style>
