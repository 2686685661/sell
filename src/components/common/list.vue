<template>
    <li @click="goClick">
        <p v-html="title"></p>
        <slot name="right"></slot>
    </li>
</template>

<script type="application/ecmascript">

    export default {
        props: ['title'],
        methods: {
            goClick: function () {
                this.$emit('click');
            }
        }
    }
</script>
<style>

</style>
