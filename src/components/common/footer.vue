<template>
    <div class="footer">
        <ul>
            <li v-for="(item,index) in list" :id='item.id' :class="[item.cls, {on:index === idx}]" @click="$router.push(item.url)">{{ item.con }}</li>
        </ul>
    </div>
</template>

<script type="text/ecmascript">
    export default {
      data:function() {
        return {
            list: [
                {id:'loan',cls:'footer-tab loan',con:'借款',url:'/loan'},
                {id:'credit',cls:'footer-tab credit',con:'信用',url:'/credit'},
                {id:'mecenter',cls:'footer-tab user',con:'个人中心',url:'/mecenter'}
            ]

         }
       },
        props:['idx']
    }
</script>

<style>


</style>
