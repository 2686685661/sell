<template>
    <div class="container">
        <topComponent title="借款描述">
            <span class="save" slot="right" @click="goSave">保存</span>
        </topComponent>
        <template v-for='(item,index) of datas'>
            <p class="listTop">
                <span class="col3">{{item.tit}}</span>
                <template v-if='item.num != 100'>(还可输入{{item.num}}字)</template>
            </p>
            <div class="feedBack">
                <div class="feed-text feed-mini" :class='{ col5 : item.def!==item.txt }'>
                    <textarea maxlength="100" class="limitFeed" @focus="textFocus(index)" @blur="textBlur(index)"  v-model.tirm='item.txt'></textarea>
                </div>
            </div>
        </template>
        <transition name="scale">
            <dialogPopup :class='daglogclass' :msg='daglogcontent' v-show='daglogshow'></dialogPopup>
        </transition>
    </div>
</template>

<script>

    export default {
        data:function () {
            return {
                daglogclass:'',
                daglogcontent:'',
                daglogshow:false,
                datas: [
                    {tit:'我的简介',txt:'',num:100,def:'请简单介绍您的基本情况。例如：本人在浙江杭州上班，从事的行业是互联网行业。（字数100字以内）'},
                    {tit:'我的还款能力',txt:'',num:100,def:'请简单介绍您的还款能力。例如：本人在公司任职的岗位是java开发，月收入稳定，能按时归还借款。（字数100字以内）'},
                    {tit:'本次申请借款的用途',txt:'',num:100,def:'请介绍本次申请借款的用途。例如：本次申请借款主要是因为新家装修，急需用钱。（字数100字以内）'}
                ]
            }
        },
        methods: {
            textFocus:function (index) {

                //获得焦点
                if(this.datas[index].txt == this.datas[index].def)
                    this.datas[index].txt = '';
            },
            textBlur:function (index) {
                //失去焦点
                if(this.datas[index].txt == '')
                    this.datas[index].txt = this.datas[index].def;
            },
            changeText:function (i) {
                if(this.datas[i].txt.length > 100) {
                    this.datas[i].txt = this.datas[i].txt.substring(0,100);
                }else if(this.datas[i].txt == this.datas[i].def) {
                    this.datas[i].num = 100;
                }else {
                    this.datas[i].num = (100-this.datas[i].txt.length);
                }
            },
            goSave:function () {
                if(this.datas[0].num > 95) this.callDialog('简介不能低于五个字');
                else if(this.datas[1].num > 95) this.callDialog('还款能力不能低于五个字');
                else if(this.datas[2].num > 95) this.callDialog('借款用途不能低于五个字');
                else {
                    this.$store.commit('uploadApplys',{name:'tempDesCont',val:JSON.stringify(this.datas)});
                    this.callDialog('保存成功','true',1500);
                    setTimeout(()=>{
                        this.$router.back();
                    },1800);
                }
            }

        },
        created:function () {
            for(var i=0;i<this.datas.length;i++) {
                this.datas[i].txt = this.datas[i].def;
            }
        },
        computed: {
            dataRest:function () {
                var obj = {};
                for(var i=0;i<this.datas.length;i++) {
                    obj[i] = this.datas[i].txt;
                }
                return obj;
            }
        },
        watch: {
            dataRest: {
                handler:function (nowval, oldval) {
                    for(var i=0;i<this.datas.length;i++) {
                        if(nowval != oldval)
                            this.changeText(i);
                    }
                },
                deep:true
            }
        },
        mounted:function () {
            if(this.$store.state['tempDesCont'] !== '')
                this.datas = JSON.parse(this.$store.state['tempDesCont']);
        }
    }
</script>
<style>

</style>
