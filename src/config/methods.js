import Vue from 'vue';

import canvasCode from './canvasCode'

import alertKnowDatas from '../data/alertKnow.json'

export default {
    callDialog:function (msg, cls, time) {

        if(cls == undefined) {
            cls = 'sort';
        }
        if(time == undefined) {
            time = 1200;
        }
        this.daglogshow = true;
        this.daglogclass = cls;
        this.daglogcontent = msg;

        setTimeout(()=>{
            this.daglogshow = false;
        },time)
    },
    alertKnow:function (val) {
        for(var i=0;i<alertKnowDatas.length;i++) {
            if(alertKnowDatas[i].name == val) {
                this.knowTit = alertKnowDatas[i].title;
                this.knowCon = alertKnowDatas[i].content;
                this.knowShow = true;
            }
        }
    },
    canvasCode:canvasCode

}
