<template>
    <div id="app">
        <div id="header" >this is header</div>
        <router-view></router-view>
        <my-footer></my-footer>
    </div>
</template>

<script  type="text/ecmascript-6">
import myFooter from './components/footer/footer.vue'
export default {
  components: {
    myFooter
  }
}
</script>

<style>

</style>