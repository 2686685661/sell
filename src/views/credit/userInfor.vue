<template>
    <div class="container">
        <topComponent title="个人信息">
            <span class="save" slot="right" @click="preUser">保存</span>
        </topComponent>
        <p class="listTop">请仔细填写正确的个人信息</p>
        <ul class="formCom">
            <li>
                <label>
                    <span>姓名</span>
                    <input type="text" placeholder="请输入真实姓名" v-model="data.name">
                </label>
            </li>
            <li>
                <label>
                    <span>身份证号</span>
                    <input type="text" placeholder="请输入本人身份证号" v-model="data.identity">
                </label>
            </li>
            <li class="icon-arrow">
                <span>性别</span>
                <p>{{ data.selectSex | displayText(optionSex) }}</p>
                <select v-model="data.selectSex">
                    <option v-for="item in optionSex" :value="item.val">{{ item.txt }}</option>
                </select>
            </li>
            <li class="icon-arrow">
                <span>学历</span>
                <p>{{ data.selectEdu | displayText(optionEdu) }}</p>
                <select v-model="data.selectEdu">
                    <option v-for="item in optionEdu" :value="item.val">{{ item.txt }}</option>
                </select>
            </li>
            <li class="icon-arrow">
                <span>婚姻状况</span>
                <p>{{ data.selectMar | displayText(optionMarriage) }}</p>
                <select v-model="data.selectMar">
                    <option v-for="item in optionMarriage" :value="item.val">{{ item.txt }}</option>
                </select>
            </li>
        </ul>
        <p class="listTop">联系地址</p>
        <ul class="formCom">
            <li class="icon-arrow">
                <span>省</span>
                <p>{{ data.selectPro | optionArrobj(optionProvince) }}</p>
                <select v-model="data.selectPro">
                    <option  v-for="item in optionProvince" :value="item.code">{{ item.address }}</option>
                </select>
            </li>
            <li class="icon-arrow">
                <span>市</span>
                <p>{{ data.selectCity | optionArrobj(optionCity) }}</p>
                <select v-model="data.selectCity">
                    <option v-for="item in optionCity" :value="item.code">{{ item.address }}</option>
                </select>
            </li>
            <li class="icon-arrow">
                <span>区</span>
                <p>{{ data.selectArea | optionArrobj(optionArea) }}</p>
                <select v-model="data.selectArea">
                    <option  v-for="item in optionArea" :value="item.code">{{ item.address }}</option>
                </select>
            </li>
            <li>
                <label>
                    <span>详细地址</span>
                    <input type="text" placeholder="不必填写省市区" v-model="data.selectDetail">
                </label>
            </li>
            <li class="icon-calendar">
                <label>
                    <span>入住时间</span>
                    <input type="date" id="myData" v-model="data.selectTime">
                </label>
            </li>
        </ul>
        <div class="agreeMent mt20 bold" :class="{no: !checked}" @click="checked = !checked">
            我已阅读并同意
            <span class="blue">《个人信息收集授权协议》</span>
            <input type="checkbox" v-model="checked">
        </div>
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
                checked:true,
                daglogshow:false,
                daglogcontent:'',
                daglogclass:'',
                data:{
                    name:'',
                    identity:'',  //身份证号
                    selectSex:'',  //性别
                    selectEdu:'',  //学历
                    selectMar:'',  //婚姻
                    selectPro:'',  //省
                    selectCity:'',  //市
                    selectArea:'',  //区
                    selectDetail:'', //详细地址
                    selectTime:''   //入住时间
                },
                optionProvince: [],
                optionCity: [],
                optionArea: [],
                optionSex: [
                    {val:'1',txt:'男'},
                    {val:'2',txt:'女'}
                ],
                optionEdu: [
                    {val:'1',txt:'高中及高中以下'},
                    {val:'2',txt:'专科'},
                    {val:'3',txt:'本科'},
                    {val:'4',txt:'硕士及以上学历'}
                ],
                optionMarriage: [
                    {val:'1',txt:'未婚'},
                    {val:'2',txt:'已婚'}
                ]
            }
        },
        methods: {
            setCityList:function () {
                this.optionCity = this.replyData(this.data.selectPro);
            },
            setAreaList:function () {
                this.optionArea = this.replyData(this.data.selectCity).length == 0 ? [{"code":"无","address":"无"}] : this.replyData(this.data.selectCity);
            },
            replyData: function (procode) {
                var data = mapcCity[procode];
                var newobj = [];
                for(var arr in data) {
                    var obj = {};
                    obj['code'] = arr;
                    obj['address'] = data[arr];
                    newobj.push(obj);
                }
                return newobj;
            },
            preUser:function () {

                var checkName = /^[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*$/;
                var checkId = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/;
                var checkAdd = /[\u4E00-\u9FA5]{2,}/;
                if(this.checked == false) this.callDialog("请阅读并同意协议")
                else if(checkName.test(this.data.name) == false) this.callDialog("名称格式不正确")
                else if(checkId.test(this.data.identity) == false) this.callDialog("身份证号格式不正确")
                else if(this.data.selectSex == '') this.callDialog("请选择您的性别")
                else if(this.data.selectEdu == '') this.callDialog("请选择您的学历")
                else if(this.data.selectMar == '') this.callDialog("请选择您的婚姻状况")
                else if(this.data.selectPro == '' || this.data.selectPro == undefined) this.callDialog("请选择您的现居省份")
                else if(this.data.selectCity == '' || this.data.selectCity == undefined) this.callDialog("请选择您的目前所在市")
                else if(this.data.selectArea == '' || this.data.selectArea == undefined) this.callDialog("请选择您的目前所在区")
                else if(checkAdd.test(this.data.selectDetail) == false) this.callDialog("详细地址格式错误")
                else if(this.data.selectTime == '' || this.data.selectTime == undefined) this.callDialog("请选择您的入住时间")
                else {
                    this.$store.commit("uploadCreditStatu",{name:'userInfo',val:true});
                    this.$store.commit("uploadCreditData",{name:'userInfo',val:JSON.stringify(this.data)});
                    this.callDialog("保存成功","true",2000);
                    setTimeout(()=>{
                        this.$router.back();
                    },2000);
                }
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
            if(this.$store.state.creditStatus['userInfo'] == true) {
                if(this.$store.state.creditDatas['userInfo'] !== undefined) {
                    this.data = JSON.parse(this.$store.state.creditDatas['userInfo']);
                }
            }
            this.optionProvince = mapcCity['86'];

        },
        watch: {
            "data.selectPro": "setCityList",
            "data.selectCity": "setAreaList"
        }

    }

</script>
<style>

</style>
