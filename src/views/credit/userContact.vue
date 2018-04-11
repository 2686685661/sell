<template>
    <div class="container">
        <topComponent title="联系人信息">
            <span class="save" slot="right" @click="saveContact">保存</span>
        </topComponent>
        <p class="listTop">在您提交借款申请之后，平台需要向您填写的紧急联系人进行电话核实，核实您填写资料的真实性，请知晓。</p>
        <p class="listTop">联系人一</p>
        <ul class="formCom">
            <li>
                <label>
                    <span>姓名</span>
                    <input type="text" v-model.trim="data.conName1">
                </label>
            </li>
            <li class="icon-arrow">
                <span>关系</span>
                <p class="gray" :class="{col6:data.selectBind1 != defind}">{{ data.selectBind1 | displayText(optionBind) }}</p>
                <select v-model="data.selectBind1">
                    <option v-for="item in optionBind" :value="item.val">{{ item.txt }}</option>
                </select>
            </li>
            <li>
                <label>
                    <span>手机号码</span>
                    <input type="number" v-model="data.conPhoto1">
                </label>
            </li>
        </ul>
        <p class="listTop">联系人二</p>
        <ul class="formCom">
            <li>
                <label>
                    <span>姓名</span>
                    <input type="text" v-model.trim="data.conName2">
                </label>
            </li>
            <li class="icon-arrow">
                <span>关系</span>
                <p class="gray" :class="{col6:data.selectBind2 != defind}">{{ data.selectBind2 | displayText(optionBind) }}</p>
                <select v-model="data.selectBind2">
                    <option v-for="item in optionBind" :value="item.val">{{ item.txt }}</option>
                </select>
            </li>
            <li>
                <label>
                    <span>手机号码</span>
                    <input type="number" v-model="data.conPhoto2">
                </label>
            </li>
        </ul>
        <p class="listTop">联系人三</p>
        <ul class="formCom">
            <li>
                <label>
                    <span>姓名</span>
                    <input type="text" v-model.trim="data.conName3">
                </label>
            </li>
            <li class="icon-arrow">
                <span>关系</span>
                <p class="gray" :class="{col6:data.selectBind3 != defind}">{{ data.selectBind3 | displayText(optionBind) }}</p>
                <select v-model="data.selectBind3">
                    <option v-for="item in optionBind" :value="item.val">{{ item.txt }}</option>
                </select>
            </li>
            <li>
                <label>
                    <span>手机号码</span>
                    <input type="number" v-model="data.conPhoto3">
                </label>
            </li>
        </ul>
        <transition name="scale">
            <dialogPopup v-show="daglogshow" :class="daglogclass" :msg="daglogcontent"></dialogPopup>
        </transition>
    </div>
</template>

<script>

    export default {
        data:function () {
            return {
                daglogshow:false,
                daglogclass:'',
                daglogcontent:'',
                defind:'请选择关系',
                data: {
                    conName:'',
                    selectBind1:'请选择关系',
                    conPhoto1:'',
                    conName2:'',
                    selectBind2:'请选择关系',
                    conPhoto2:'',
                    conName3:'',
                    selectBind3:'请选择关系',
                    conPhoto3:''
                },
                optionBind: [
                    {val:'1',txt:'亲人'},
                    {val:'2',txt:'朋友'},
                    {val:'3',txt:'同事'}
                ]
            }
        },
        methods: {
            saveContact: function () {
                var checkName = /^[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*$/;
                var checkPhone = /^[1][3578][0-9]{9}$/;
                if(checkName.test(this.data.conName1) == false) this.callDialog("联系人一 姓名格式不正确",'text',1600);
                else if(this.data.selectBind1 == this.defind) this.callDialog("联系人一 请选择关系",'text',1600);
                else if(checkPhone.test(this.data.conPhoto1) == false) this.callDialog("联系人一 手机号格式错误",'text',1600);
                else if(checkName.test(this.data.conName2) == false) this.callDialog("联系人二 姓名格式不正确",'text',1600);
                else if(this.data.selectBind2 == this.defind) this.callDialog("联系人二 请选择关系",'text',1600);
                else if(checkPhone.test(this.data.conPhoto2) == false) this.callDialog("联系人二 手机号格式错误",'text',1600);
                else if(checkName.test(this.data.conName3) == false) this.callDialog("联系人三 姓名格式不正确",'text',1600);
                else if(this.data.selectBind3 == this.defind) this.callDialog("联系人三 请选择关系",'text',1600);
                else if(checkPhone.test(this.data.conPhoto3) == false) this.callDialog("联系人三 手机号格式错误",'text',1600);
                else {
                    this.$store.commit('uploadCreditStatu',{name:'userContact',val:true});
                    this.$store.commit('uploadCreditData',{name:'userContact',val:JSON.stringify(this.data)});
                    this.callDialog("保存成功","true",2000);
                    setTimeout(()=>{
                        this.$router.back();
                    },2000);
                }


            }
        },
        mounted:function () {
            if(this.$store.state.creditStatus['userContact'] == true) {
                if(this.$store.state.creditDatas['userContact'] !== undefined) {
                    this.data = JSON.parse(this.$store.state.creditDatas['userContact']);
                }
            }
        }
    }
</script>
<style>

</style>
