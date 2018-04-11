<template>
   <div class="container bgF">
       <topComponent title="人脸识别"></topComponent>
       <p class="listTop">需要对接第三方接口，功能未开发。点击下方按钮，模拟已经完成。</p>

       <div class="btnWarp">
           <span class="subBtn" @click="completeFace">假设完成</span>
       </div>
       <p class="listTop" style="text-align: center;color: red">{{ tip }}</p>
       <transition name="scale">
           <dialogPopup v-show="daglogshow" :msg="daglogcontent" :class="daglogclass"></dialogPopup>
       </transition>
   </div>
</template>

<script>

    export default {
        data:function () {
            return {
                daglogshow:false,
                daglogcontent:'',
                daglogclass:'',
                tip:''
            }
        },
        methods: {
            completeFace:function () {
                this.$store.commit("uploadCreditStatu",{name:'userFace',val:true});
                this.$store.commit("uploadCreditData",{name:'userFace',val:"true"});
                this.callDialog("识别完成","true",2000);
                setTimeout(()=>{
                    this.$router.back();
                },2000);
            }
        },
        mounted:function () {
            //el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。
            // 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$el 也在文档内。
            if(this.$store.state.creditStatus['userFace'] == true) {
                if(this.$store.state.creditDatas['userFace'] !== undefined) {
                    this.tip = '已完成人脸识别';
                }
            }
        }
    }
</script>
<style>

</style>
