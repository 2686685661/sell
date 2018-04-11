<template>
    <div class="container" >
        <topComponent title="提交申请" class='top-icon' :showLeft="false">
            <span class="back" @click="goBack" slot="left">返回</span>
            <i class="recom" slot='right' @click="$router.push('/loan/loanrecom')"></i>
        </topComponent>
        <ul class="formCom form-selectRight">
            <li class="icon-arrow">
                <span>还款方式</span>
                <p class="gray">{{ data.selectWay | displayText(optionWay) }}</p>
                <select v-model="data.selectWay">
                    <option v-for="item in optionWay" :value="item.val">{{ item.txt }}</option>
                </select>
            </li>
            <li class="icon-arrow">
                <span>借款金额</span>
                <p class="gray">{{ data.selectMoney | displayText(optionMoney) }}</p>
                <select v-model="data.selectMoney">
                    <option  v-for="item in optionMoney" :value="item.val">{{ item.txt }}</option>
                </select>
            </li>
            <li class="icon-arrow">
                <span>借款期限</span>
                <p class="gray">{{ data.selectTerm | displayText(optionTerm) }}</p>
                <select v-model="data.selectTerm">
                    <option v-for="item in optionTerm" :value="item.val">{{ item.txt }}</option>
                </select>
            </li>
            <li @click="$router.push('/loan/loandes')">
                <span>借款描述</span>
            </li>
        </ul>
        <ul class="formCom form-selectRight mt30">
            <li class="icon-arrow">
                <span>方便联系时间段</span>
                <p class="gray">{{ data.selectTime | displayText(optionTime) }}</p>
                <select v-model="data.selectTime">
                    <option v-for="item in optionTime" :value="item.val">{{ item.txt }}</option>
                </select>
            </li>
        </ul>
        <div class="btnWarp">
            <span class="subBtn" @click="goApply">提交申请</span>
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
                daglogclass:'',
                daglogcontent:'',
                daglogshow:false,
                defind:'请选择',
                data: {
                    selectWay:'',
                    selectMoney:'',
                    selectTerm:'',
                    selectTime:''
                },
                optionWay:[
                    {val:'1',txt:'一次性还本付息'},
                    {val:'2',txt:'还本付息'}
                ],
                optionMoney:[
                    {val:'500',txt:'500元'},
                    {val:'1000',txt:'1000元'}
                ],
                optionTerm:[
                    {val:'7',txt:'7天'},
                    {val:'14',txt:'14天'},
                    {val:'21',txt:'21天'}
                ],
                optionTime:[
                    {val:'1',txt:'9:00-12:00'},
                    {val:'2',txt:'12:00-14:00'},
                    {val:'3',txt:'14:00-18:00'}
                ]
            }
        },
        methods: {
            goBack:function () {
                this.$store.commit('uploadApplys',{name:'tempDesCont',val:''});
                this.$store.commit('uploadApplys',{name:'tempApplyOpt',val:''});
                this.$router.back();
            },
            uploadStore:function () {
                this.$store.commit('uploadApplys',{name:'tempApplyOpt',val:JSON.stringify(this.data)});
            },
            goApply:function () {
                if(this.data.selectWay == this.defind)
                    this.callDialog('请选择还款方式');
                else if(this.data.selectMoney == this.defind)
                    this.callDialog('请选择借款金额');
                else if(this.data.selectTerm == this.defind)
                    this.callDialog('请选择借款期限');
                else if(this.$store.state['tempDesCont'] == '')
                    this.callDialog('请填写借款描述');
                else if(this.data.selectTime == this.defind)
                    this.callDialog('请选择方便时间段');
                else {
                    this.$router.push('/loan/loanmsg');
                }
            }
        },
        created:function () {
            this.data = {
                selectWay : this.defind,
                selectMoney : this.defind,
                selectTerm : this.defind,
                selectTime : this.defind
            }
        },
        computed: {
            dataStr:function () {
                var str = '';
                for(var key in this.data) {
                    str += this.data[key];
                }
                return str;
            }
        },
        watch: {
            "dataStr": "uploadStore"
        },
        mounted:function () {
            if(this.$store.state['tempApplyOpt'] !== '')
                this.data = JSON.parse(this.$store.state['tempApplyOpt']);
        }
    }
</script>
<style>

</style>
