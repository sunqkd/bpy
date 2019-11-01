<template>
    <div id="binding">
        <div class="bingSquery">
            <span class="bindText">绑定手机号</span>
            <input type="text" class="phone" placeholder="填写手机号"  v-model="info.phone"/>
            <div class="codeContain">
                <input type="text" v-model="info.sms" class="code" placeholder="填写验证码">
                <input class="yzm" type="button" @click="sms" value="发送验证码" readonly  v-if="timeCode">
                <div class="timeDowncode" v-else>{{numberSix}}</div>
            </div>
            <input type="button" value="确定" class="certain" @click="bdPhone()">
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            numberSix:60,
            timer:'',
            timeCode:true,
            info:{
                phone:'', // 电话号码
                sms:'', // 验证码
            },
            openId:'', // 
        }
    },
    created(){
        this.openId = this.$route.query.openId;
    },
    methods:{
        sms(){ // 发送验证码
            if(this.info.phone){
                this.axios.post('/vc/member/sms',{},{
                    params:{
                        phone : this.info.phone,
                        type :3
                    }
                }).then(res=>{
                    if(res.data.status!=1){
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        });
                    }else{
                        this.timeCode = false;
                        this.$message({
                            type: 'success',
                            message: res.data.msg
                        });
                        this.countDown(60,false);
                    }
                })
            }else{
                alert('请输入手机号')
            }
        },
        countDown(data,dataflag){ // 倒计时函数
            if(dataflag){ // 清除定时器
                clearInterval(this.timer);
                this.numberSix = 60;
                this.timeCode = true;
            }else{
                this.timer = setInterval(()=>{
                    data--;
                    this.numberSix = data;
                    if(data< 1){
                        clearInterval(this.timer);
                        this.numberSix = 60;
                        this.timeCode = true;
                    }
                },1000)
            }
        },
        bdPhone(){ // 绑定手机号
            if(this.info.phone && this.info.sms){
                this.axios.post('/vc/wxLog/saveBind',{},{
                    params:{
                        phone:this.info.phone,
                        openId:this.openId,
                        code:this.info.sms,
                        pwd:''
                    }
                }).then( (res) =>{
                    if(res.data.status == 1){
                        console.log(res);
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        });
                    }
                })
            }else{
                alert('请检查手机号或 验证码是否填写')
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    #binding{
        width:100%;
        height:100%;
        background:rgba(0,0,0,0.4);
        display:flex;
        align-items: center;
        justify-content: center;
        .bingSquery{
            width:360px;
            height:360px;
            padding:62px 40px 0 40px;
            box-sizing: border-box;
            background:rgba(255,255,255,1);
            border-radius:8px;
            display:flex;
            flex-direction: column;
            align-items: center;
            margin-top:-130px;
            .bindText{
                color:#666666;
                font-size:20px;
                margin-bottom:32px;
            }
            input{
                padding: 0 10px;
                outline: none;
                box-sizing: border-box;
            }
            .phone{
                width:280px;
                height:36px;
                border:1px solid rgba(232,232,232,1);
            }
            .codeContain{
                margin-top:10px;
                width:100%;
                display:flex;
                align-items: center;
                justify-content: space-between;
                .code{
                    width:195px;
                    height:36px;
                    border:1px solid rgba(232,232,232,1);
                }
                .yzm{
                    border:none;
                    width:80px;
                    height:36px;
                    background:rgba(40,120,255,1);
                    color:#ffffff;
                    cursor: pointer;
                }
                .timeDowncode{
                    width:80px;
                    height:36px;
                    border-radius:4px;
                    background:#90A4AE;
                    color:#ffffff;
                    font-size: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
            .certain{
                width:280px;
                height:36px;
                background:rgba(40,120,255,1);
                color:#ffffff;
                font-size:14px;
                border:none;
                margin-top:32px;
                cursor: pointer;
            }
        }
    }
    ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
        color:#222222;
    }
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color:#222222;
    }
    ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color:#222222;
    }
    :-ms-input-placeholder { /* Internet Explorer 10-11 */
        color:#222222;
    }
</style>