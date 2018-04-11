<template>
    <div class="top">
        <span class="back" @click="goBack" v-if="iSshow">{{ backTit }}</span>
        <slot name="left"></slot>
        <h1>{{ title }}</h1>
        <slot name="right"></slot>
    </div>
</template>

<script type="text/ecmascript">

    export default {
        data:function () {
            return {
                iSshow:true,
                backTit:'返回',
            }
        },
        props: ['title','showLeft'],
        methods: {
            goBack:function () {
                this.$router.back();
            }
        },
        mounted:function () {
            if(this.$options.propsData.showLeft !== undefined) this.iSshow = this.$options.propsData.showLeft;
        }

    }
</script>
<style>

</style>
