<template>
    <div class="container">
        <topComponent title="工作信息">
            <span class="save" slot="right" @click="preWork">保存</span>
        </topComponent>
        <p class=listTop>真实有效的信息会提高我们风控审核通过的概率，请如实填写您的工作单位信息及工作内容。</p>
        <ul class="formCom form-plus">
            <li>
                <label>
                    <span>公司名称</span>
                    <input type="text" v-model.trim="data.comName">
                </label>
            </li>
            <li>
                <label>
                    <span>公司固定电话</span>
                    <input type="text" v-model.trim="data.comPhoto">
                </label>
            </li>
            <li class="icon-arrow">
                <span>公司性质</span>
                <p class="gray" :class="{col6:data.comType !== defind }">{{ data.comType }}</p>
                <select v-model="data.comType">
                    <option v-for="item in optionComType">{{ item }}</option>
                </select>
            </li>
            <li class="icon-calendar">
                <label>
                    <span>入职时间</span>
                    <input type="date" v-model="data.entryTime">
                </label>
            </li>
            <li>
                <label>
                    <span>月均收入（元）</span>
                    <input type="number" placeholder="填写数字如：3000" v-model.trim="data.monMoney">
                </label>
            </li>
        </ul>
        <p class="listTop">公司地址</p>
        <ul class="formCom form-plus">
            <li class="icon-arrow">
                <span>选择省</span>
                <p class="gray" :class="{col6:data.comProvin !== defind }">{{ data.comProvin | optionArrobj(optionComPro) }}</p>
                <select v-model="data.comProvin">
                    <option v-for="item in optionComPro" :value="item.code">{{ item.address }}</option>
                </select>
            </li>
            <li class="icon-arrow">
                <span>选择市</span>
                <p class="gray" :class="{col6:data.comCity !== defind }">{{ data.comCity | optionArrobj(optionComCity) }}</p>
                <select v-model="data.comCity">
                    <option v-for="item in optionComCity" :value="item.code">{{ item.address }}</option>
                </select>
            </li>
            <li class="icon-arrow">
                <span>选择区</span>
                <p class="gray" :class="{col6:data.comArea !== defind }">{{ data.comArea | optionArrobj(optionComArea) }}</p>
                <select v-model="data.comArea">
                    <option v-for="item in optionComArea" :value="item.code">{{ item.address }}</option>
                </select>
            </li>
            <li>
                <label>
                    <span>详细地址</span>
                    <input type="text" placeholder="不必重复填写省市区信息" v-model.trim="data.comDerRess">
                </label>
            </li>
        </ul>
        <transition name="scale">
            <dialogPopup v-show="daglogshow" :class="daglogclass" :msg="daglogcontent"></dialogPopup>
        </transition>
    </div>
</template>

<script>
    import mapcCity from '../../data/city.json'
    export default {
        data:function () {
            return {
                daglogclass:'',
                daglogcontent:'',
                daglogshow:false,
                defind:'请选择',
                data: {
                    comName:'',
                    comPhoto:'',
                    comType:'请选择',
                    entryTime:'',
                    monMoney:'',
                    comProvin:'请选择',
                    comCity:'请选择',
                    comArea:'请选择',
                    comDerRess:''
                },
                optionComType:['国家机关','公共事业单位','学校','医院','银行','全球500强','上市公司','国企','非营利性公益组织','民营企业','自由职业者','其它'],
                optionComPro:[],
                optionComCity:[],
                optionComArea:[]
            }
        },
        methods: {
            preWork:function () {

                var checkCHA = /[\u4E00-\u9FA5]{2,}/;
                var checkTel = /(^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$)|(^((\(\d{3}\))|(\d{3}\-))?(1[3578]\d{9})$)/;
                if(checkCHA.test(this.data.comName) == false) this.callDialog('公司名称格式错误');
                else if(checkTel.test(this.data.comPhoto) == false) this.callDialog('固话格式错误');
                else if(this.data.comType == this.defind) this.callDialog('公司性质不能为空');
                else if(this.data.entryTime == '') this.callDialog('入职时间不能为空');
                else if(this.data.monMoney == '') this.callDialog('月薪不能为空');
                else if(this.data.comProvin == this.defind) this.callDialog('请选择公司所在省');
                else if(this.data.comCity == this.defind) this.callDialog('请选择公司所在市');
                else if(this.data.comArea == this.defind) this.callDialog('请选择公司所在区');
                else if(checkCHA.test(this.data.comDerRess) == false) this.callDialog('详细地址格式不正确');
                else {
                    this.$store.commit('uploadCreditStatu',{name:'userWork',val:true});
                    this.$store.commit('uploadCreditData',{name:'userWork',val:JSON.stringify(this.data)});
                    this.callDialog("保存成功","true",2000);
                    setTimeout(()=>{
                        this.$router.back();
                    },2000);
                }

            },
            setCityList:function () {
                this.optionComCity = this.replyData(this.data.comProvin);
            },
            setAreaList:function () {
                this.optionComArea = this.replyData(this.data.comCity).length == 0 ? [{"code":"无","address":"无"}] : this.replyData(this.data.comCity);
            },
            replyData:function (procode) {
                var data = mapcCity[procode];
                var newobj = [];
                for(var arr in data) {
                    var obj = {};
                    obj['code'] = arr;
                    obj['address'] = data[arr];
                    newobj.push(obj);
                }
                return newobj;
            }
        },
        filters: {
            optionArrobj:function (value,obj) {
                var newobj = {};
                if(value == '请选择' || value == '') {
                    return value;
                }
                else {
                    for(var i=0;i<obj.length;i++) {
                        newobj[obj[i].code] = obj[i].address;
                    }
                    return newobj[value];
                }
            }
        },
        mounted:function () {
            if(this.$store.state.creditStatus['userWork'] == true) {
                if(this.$store.state.creditDatas['userWork'] !== undefined) {
                    this.data = JSON.parse(this.$store.state.creditDatas['userWork']);
                }
            }
            this.optionComPro = mapcCity['86'];
        },
        watch: {
            "data.comProvin":"setCityList",
            "data.comCity":"setAreaList"
        }
    }
</script>
<style>

</style>
