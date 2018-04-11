<template>
    <div class="container">
        <topComponent title="提交申请"></topComponent>
        <ul class="formCom form-untitled">
            <li>
                <input type="number" placeholder="请输入推荐人手机号码" v-model.trim="photo">
            </li>
        </ul>
        <div class="btnWarp">
            <span class="subBtn" @click="goSave">完成</span>
        </div>
        <transition name="scale">
            <dialogPopup :class='daglogclass' :msg='daglogcontent' v-show='daglogshow'></dialogPopup>
        </transition>
    </div>
</template>

<script>

    export default {
        data:function () {
            return {
                daglogclass:'',
                daglogcontent:'',
                daglogshow:false,
                photo:''
            }
        },
        methods: {
            goSave:function () {
                var checkName = /^[1][3578][0-9]{9}$/;
                if(checkName.test(this.photo) == false) {
                    this.callDialog('手机号格式不正确','sort');
                }
                else {
                    this.callDialog('提交成功','true');
                    setTimeout(()=>{
                        this.$router.back();
                    },2000);
                }
            }
        }
    }
</script>
<style>

</style>
