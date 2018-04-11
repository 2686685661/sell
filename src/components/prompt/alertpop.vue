<template>
    <div class="alertCheck">
        <div class="alertCheckCon">
            <p class="title">本次操作需要验证，请输入验证信息。</p>
            <ul class="forms">
                <li>
                    <input type="text" placeholder="请输入短信验证码" class="inputType1" v-model.trim="smsCode">
                    <sendSms @sentAjax="sendSmsAjax" cls="checkCode" auto="false"></sendSms>
                </li>
                <li class="liWarp">
                    <canvasCode @codeHas="codeHasChange" ccls="checkImg" icls="inputType2"></canvasCode>
                </li>
            </ul>
            <div class="alertBtns two">
                <span class="btn cancelBtn" @click="goHide">取消</span>
                <button class="btn bold line" @click="goSubmit">确定</button>
            </div>
            <delayTime v-if="showDelay"></delayTime>
            <transition name="scale">
                <dialogPopup v-show="daglogshow" :msg="daglogcontent" :class="daglogclass"></dialogPopup>
            </transition>
        </div>
    </div>
</template>

<script>
    export default {
        data:function () {
            return {
                imgCode:'',
                smsCode:'',
                daglogcontent:'',
                daglogclass:'',
                showDelay:false,
                daglogshow:false
            }
        },
        methods: {
            sendSmsAjax:function () {
                console.log('发送sms的ajax请求');
            },
            codeHasChange:function(code) {
                this.imgCode = code;
            },
            goSubmit:function() {
                var checkCode = /^[0-9]{6,8}$/;
                if(checkCode.test(this.smsCode) == false) this.callDialog('短信验证码错误');
                else if(this.imgCode.toUpperCase() !== this.canvasCode.codeNums.toUpperCase())
                    this.callDialog('图片验证码错误');
                else {
                    this.showDelay = true;
                    setTimeout(()=>{
                        this.$emit('success');
                    },2000);
                }
            },
            goHide:function() {
                this.$emit('hide');
            }
        }
    }
</script>
<style>

</style>
