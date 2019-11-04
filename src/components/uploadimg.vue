<template>
    <div class="uploadimg">
        <img class="imgIcon" src="/static/img/upload.png" alt="">
        <input type="file" @change="imgload" ref="file" id="qiniu"/>
        <div class="previewImg" :style="{'background':value?'#fff':''}">
            <img class="img" :src="value" alt="">
        </div>
        <div class="search" style="display:none">
            <a :href="'https://www.baidu.com/s?wd='+name" target="_blank" rel="nofollow">快速百度搜索</a>
            <a :href="'https://www.tianyancha.com/search?key='+name" target="_blank" rel="nofollow">快速天眼查</a>
            <a :href="'https://itjuzi.com/search?data='+name" target="_blank" rel="nofollow">it桔子搜索</a>
        </div>
    </div>
</template>

<script>
import * as qiniu from 'qiniu-js';
// 创建项目-上传logo
// 示例：<uploadimg v-model="form.logo" :name="form.name"></uploadimg>
export default {
    data(){
        return {
            token:'', // token信息
        }
    },
    components:{},
    props:{
        name:{
            type:String,
            default:''
        },
        value:{
            type:String,
            default:''
        }
    },
    watch:{},
    computed:{},
    methods:{
        // 选择图片
        async imgload(){ // 加载图片
            await this.getToken();
            this.upload();
        },
        async getToken(){ // token 信息
            await this.axios.get('vc/common/getQiuniuToken').then((res)=>{
                this.token = res.data.uptoken;
            })
        },
        upload(){ // 上传七牛云
            var that = this;
            let file = document.getElementById('qiniu').files[0]; // 上传的文件
            let key = new Date().getTime();   // 文件资源名
            let token = this.token;// 上传验证信息，前端通过接口请求后端获得
            let config = { // 配置信息
                useCdnDomain: true,
                // region: qiniu.region.z0
            }
            let  putExtra = {
                fname: file.name,
                params: {},
                mimeType: null
            }
            let observe = {
                next (res) {
                    console.log('已上传大小，单位为字节：' + res.total.loaded)
                    console.log('本次上传的总量控制信息，单位为字节：' + res.total.size)
                    console.log('当前上传进度，范围：0～100：' + res.total.percent);
                },
                error (err) {
                    console.log(err)
                    console.log(err.code)
                    console.log(err.message)
                    console.log(err.isRequestError)
                    console.log(err.reqId)
                },
                complete (res) {
                    //完成后的操作
                    //上传成功以后会返回key 和 hash  key就是文件名了！
                    if(res){
                        that.$emit('input','https://video.dyly.com/'+ res.key);
                        console.log(res.key);
                    }
                }
            };
            let observable = qiniu.upload(file, key, token, putExtra, config);
            let subscription = observable.subscribe(observe);
        },
    },
    created(){},
    mounted(){},
    beforeDestroy () {
        this.$refs.file.value='';
    }
}
</script>
<style lang="scss">
    .uploadimg{position: relative;
        .imgIcon{width:80px;vertical-align: middle;height: 80px;padding:28px;box-sizing: border-box;background: rgba(51,62,62,0.08);border: 1px solid rgba(0,0,0,0.15);border-radius: 4px;cursor: pointer;}
        input{position: absolute;left: 0;top:0;display: block;width: 80px;height: 80px;z-index: 2;cursor: pointer;opacity: 0;}
        .previewImg{width:80px;height: 80px;display: flex;justify-content: center;align-items: center;position: absolute;left:0;top:0px;
            img{max-width: 100%;max-height: 100%;}
        }
        .search{display: inline-block;margin-left: 15px;vertical-align: middle;
            a{display: block;font-size: 14px;color: #B6996A;line-height: 26px;}
        }
    }
</style>