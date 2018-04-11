<template>
    <div class="container">
        <topComponent title="必填资料"> </topComponent>
        <div class="listTop">
            <p class="tCenter col9">草根金融承诺你的信息安全</p>
        </div>
        <ul class="mustInfo">
            <li v-for="(item,index) in lists" :class="{lock:item.islock, arrow:!item.islock,wait:!item.islock,ok:item.isok}" @click="pushLink(index)">
                <i :class='item.icls'></i>
                <span>{{ item.tit }}</span>
                <b>{{ item.con }}</b>
            </li>
        </ul>
        <p class="infoLink tCenter">
            <span class="arrow" @click="$router.push('/loan/myson')">选填资料</span>
            资料越完善，审核通过率越高，借款费用越低
        </p>
        <div class="btnWarp">
            <span class="subBtn" :class="{grayBg:!checked}" @click="goApply">申请借款</span>
        </div>
        <div class="agreeMent mt20" :class="{no:!checked}" @click="checked = !checked">
            我已阅读并同意
            <span class="blue">《个人信息收集授权协议》</span>
            <input type="checkbox" v-model="checked">
        </div>
        <transition name="scale">
            <dialogPopup :class='daglogclass' :msg='daglogcontent' v-show='daglogshow'></dialogPopup>
        </transition>
    </div>
</template>

<script>
    export default {
        data:function () {
            return {
                checked:true,
                daglogshow:false,
                daglogclass:'',
                daglogcontent:'',
                lists: [
                    {icls:'icon01',tit:'第一步',islock:false,isok:false,con:'身份认证',param:'userInfo',url:'/credit/userinfor',err:'请进行身份认证'},
                    {icls:'icon02',tit:'第二步',islock:true,isok:false,con:'人脸识别',param:'userFace',url:'/credit/userface',err:'请进行人脸识别'},
                    {icls:'icon03',tit:'第三步',islock:true,isok:false,con:'紧急联系人',param:'userContact',url:'/credit/usercontact',err:'请填写紧急联系人'},
                    {icls:'icon04',tit:'第四步',islock:true,isok:false,con:'手机认证',param:'userPhoto',url:'/credit/userphoto',err:'请进行手机认证'},
                    {icls:'icon05',tit:'第五步',islock:true,isok:false,con:'工作信息',param:'userWork',url:'/credit/userwork',err:'请填写工作信息'}
                ]
            }
        },
        methods: {
            pushLink:function (index) {
                var flag = false;
                if(this.lists[index].islock == true) {
                    for(var i=0;i<index;i++) {
                        if(this.lists[i].isok == false) {
                            this.callDialog(this.lists[i].err);
                            flag = true;
                            break;
                        }
                    }
                    if(flag == false)
                        this.$router.push(this.lists[index].url);
                }
                else {
                    this.$router.push(this.lists[index].url);
                }

            },
            goApply:function () {
                if(this.checked == false)
                    this.callDialog('请阅读并同意协议');
                else if(this.lists[0].isok == false) this.callDialog(this.lists[0].err);
                else if(this.lists[1].isok == false) this.callDialog(this.lists[1].err);
                else if(this.lists[2].isok == false) this.callDialog(this.lists[2].err);
                else if(this.lists[3].isok == false) this.callDialog(this.lists[3].err);
                else if(this.lists[4].isok == false) this.callDialog(this.lists[4].err);
                else
                    this.$router.push('/loan/submitapply');
            },
            showClass:function (arr) {
                for(var i=0;i<arr.length;i++) {
                    if(this.$store.state.creditStatus[this.lists[i].param] == false) {
                        this.lists[i].islock = false;
                        break;
                    }else {
                        this.lists[i].islock = false;
                        this.lists[i].isok = true;
                    }
                }
            }
        },
        computed: {
            watchLocal:function () {

                var obj={};
                for( var i=0;i<this.lists.length;i++) {
                    obj[i] = this.$store.state.creditStatus[this.lists[i].param];
                }
                return obj;
            }
        },
        watch: {
            watchLocal: {
                handler:function (val, oldval) {
                    if(val !== oldval)
                        this.showClass(this.lists);
                },
                deep:true      //对象内部的属性监听，也叫深度监听
            }

        },
        /**
         * 实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，
         */
        created:function() {
            //创建页面的时候先查看缓存中是否有值，将样式显示全
            this.showClass( this.lists );
        }

    }

</script>
<style>

</style>
