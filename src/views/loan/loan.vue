<template>
        <div class=container>
            <top-component title="草根金融" :showLeft="false"></top-component>
            <banner></banner>
            <ul class="indexList mt20">
                <li v-for="item in lists" :class="item.cls" @click="$router.push(item.url)">
                    <b>{{ item.tit }}</b>
                    {{ item.con }}
                </li>
            </ul>
            <!--<router-view></router-view>-->
            <footerComponent :idx="0"></footerComponent>
        </div>
</template>

<script type="application/ecmascript">
    import banner from '../../components/loan/banner.vue'
//    import topComponent from '@/components/common/top.vue'
    export default {
      data:function () {
        return {
            lists: [
                {cls:'',tit:'微额借款',con:'金额500、1000元，期限7天、14天、21天',url:'/loan/loanmicro'},
                {cls:'icon02',tit:'小额贷款',con:'最高金额5000元，最长期限6个月',url:'/loan/loanlarge'},
                {cls:'icon03',tit:'屌丝福利贷款',con:'屌丝可带，最高金额10000元，期限30天',url:'/loan/loanloser'}
            ]
         }
      },
      components: {
        banner,
//        topComponent
      }
    }
</script>

<style type="text/css">
</style>
