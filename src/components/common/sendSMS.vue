<template>
    <div :class="[smsCls,{grayBg:smsAuto}]" @click="send">{{ smsBtn }}</div>
</template>

<script>

    export default {
        data:function () {
            return {
                smsBtn:'',
                smsCls:'',
                smsNum:0, //倒计时时间
                deNum:0,  //默认倒计时时间
                smsAuto:false  //开关--在倒计时
            }
        },
        methods: {
            send:function () {
               if(this.smsAuto == false) {
                   this.$emit('sentAjax');
                   this.smsAuto = true;
                   this.smsBtn = this.smsNum+'秒后重发';
                   var smstimeout = setInterval(()=>{
                       this.smsNum--;
                       this.smsBtn = this.smsNum+'秒后重发';
                       if(this.smsNum == 0) {
                           clearInterval(smstimeout);
                           this.smsAuto = false;
                           this.smsNum = this.deNum;
                           this.smsBtn = '重新发送';
                       }
                   },1000);
               }
            }
        },
        props:['cls','btn','auto','time'],
        mounted:function () {
            this.smsCls = this.$options.propsData.cls ===undefined ? 'code-sms' : this.$options.propsData.cls;
            this.smsBtn = this.$options.propsData.btn ===undefined ? '点击发送' : this.$options.propsData.btn;
            this.smsNum = this.$options.propsData.time ===undefined ? 10 : this.$options.propsData.time;
            this.deNum = this.$options.propsData.time ===undefined ? 10 : this.$options.propsData.time;

            if(this.$options.propsData.auto == 'true')
                this.send();

        }
    }
</script>
<style>

</style>
