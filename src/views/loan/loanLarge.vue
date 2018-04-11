<template>
    <div class="container no-top">
        <loanBannnerTop :tit="title" :des="content">
            <img src="../../../static/img/loanBanner2.2bd63e8.jpg" slot="banner" alt="">
        </loanBannnerTop>
        <loanBannerDetail uid="large">
            <span class="subBtn" slot="apply" @click="goFillData">申请借款</span>
        </loanBannerDetail>
    </div>
</template>

<script type="application/ecmascript">
    export default {
        data: function () {
            return {
                title: '小额贷款',
                content: '无抵押，免担保，减你资金压力'

            }
        },
        methods: {
            goFillData:function () {
                this.$router.push('/loan/datamust');
            }
        }
    }
</script>
<style>

</style>
