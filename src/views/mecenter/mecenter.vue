<template>
    <div class="container">
        <top-component title="草根金融"></top-component>
        <dl class="userInfo">
            <dt>
                <p class="user-logo"></p>
                <p class="user-tel">
                    您好
                    <span>15837587256</span>
                </p>
                <p class="user-tag">
                    <span class="mLevel">学徒</span>
                    <span class="mName">白手起家</span>
                </p>
            </dt>
            <dd>
                申请借款
                <span>1笔</span>
            </dd>
            <dd>
                待还借款
                <span>0笔</span>
            </dd>
        </dl>
        <ul class="listCom list-arrow list-icon mt20">
            <listComponent v-for="item in lists" :class="item.cls" :title="item.tit" @click="$router.push(item.url)"></listComponent>
        </ul>
        <footerComponent :idx="2"></footerComponent>
    </div>
</template>

<script type="application/ecmascript">
    export default {
        data: function () {
            return {
                lists: [
                    {cls:'icon-jiekuan',tit:'我的借款',url:''},
                    {cls:'icon-huankuan',tit:'我的还款',url:''},
                    {cls:'icon-jiangli',tit:'我的奖励',url:''},
                    {cls:'icon-help',tit:'帮助中心',url:''},
                    {cls:'icon-yijian',tit:'意见反馈',url:''},
                    {cls:'icon-about',tit:'关于我们',url:''},
                ]
            }
        }
    }
</script>
<style>

</style>
