<template>
    <div class="alertCheck alertDomNode" @click="goHide">
        <div class="alertCheckCon min_height" @click="stopPro">
            <p class="lineTit">{{ title }}</p>
            <p class="conDetail" v-html="content"></p>
        </div>
    </div>
</template>

<script>

    export default {
        props:['title','content'],
        methods: {
            goHide:function () {
                this.$emit('goHide');
            },
            stopPro:function (event) {
                event.stopPropagation();
            }

        }
    }
</script>
<style>

</style>
