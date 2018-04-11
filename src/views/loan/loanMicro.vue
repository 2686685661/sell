<template>
   <div class="container no-top">
       <loanBannnerTop :tit="title" :des="content">
           <img src="../../../static/img/loanBanner1.52bb9bb.jpg" slot="banner" alt="">
       </loanBannnerTop>
       <loanBannerDetail uid="small">
           <span class="subBtn" slot="apply" @click="goFillData">申请借款</span>
       </loanBannerDetail>
   </div>
</template>

<script type="application/ecmascript">
    export default {
        data: function () {
            return {
                title: '微额借款',
                content: '应急首选，解你燃眉之急'

            }
        },
        methods: {
            goFillData: function () {
                this.$router.push('/loan/datamust');
            }
        }
    }

</script>
<style>

</style>
