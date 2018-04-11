<template>
   <div class="container">
       <topComponent title="手机认证"> </topComponent>
       <i class="mobileIcon"></i>
       <ul class="formCom form-untitled">
           <li>
               <label>
                   <input type="text" v-model.trim="data.photo" readonly="readonly">
               </label>
           </li>
           <li>
               <label>
                   <input type="text" placeholder="请输入服务密码" v-model.trim="data.password">
               </label>
           </li>
       </ul>
       <div class="btnWarp">
           <span class="subBtn" @click="savePhoto">确认</span>
       </div>
       <p class="formTips tCenter">
           <span class="col6">忘记服务密码，请拨打</span>
           <span class="blue txtline">手机运营商客服电话</span>
           <span class="col6">进行重置</span>
       </p>
       <alertPopup @success="goSubmit" v-if="alertShow" @hide="alertShow = !alertShow"></alertPopup>
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
                alertShow:false,
                daglogcontent:'',
                daglogclass:'',
                data: {
                    photo:'',
                    password:''
                }
            }
        },
        methods: {
            savePhoto:function () {
                var checkPass = /^[0-9]{6,8}$/;
                if(checkPass.test(this.data.password) == false) {
                    this.callDialog('密码格式不正确')
                }
                else {
                    this.alertShow = true;
                }
            },
            goSubmit:function () {
                this.$store.commit('uploadCreditStatu',{name:'userPhoto',val:true});
                this.alertShow = !this.alertShow;
                this.callDialog("手机认证成功","true",1500);
                setTimeout(()=>{
                    this.$router.back();
                },2000);

            }
        },
        mounted:function () {
            this.data.photo = '15837587256';
        }
    }
</script>
<style>

</style>
