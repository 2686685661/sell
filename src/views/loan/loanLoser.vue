<template>
    <div class="container no-top">
        <loanBannnerTop :tit="title" :des="content">
            <img src="../../../static/img/loanBanner3.ad43349.jpg" slot="banner" alt="">
        </loanBannnerTop>
        <loanBannerDetail uid="loser">
            <span class="subBtn" slot="apply" @click="goFillData">申请借款</span>
        </loanBannerDetail>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                title: '草根福利借款',
                content: '草根投资项目担保，费率超低'
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
