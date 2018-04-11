<template>
    <div class="loanBanner">
        <p>
            <span class="tit"> {{ tit }}</span>
            {{ des }}
        </p>
        <slot name="banner"></slot>
        <span class="back" @click="$router.push('/loan')"></span>
    </div>
</template>

<script type="application/ecmascript">

    export default {
        props: ['tit','des']
    }
</script>
<style>

</style>
