
import Vue from 'vue';

export default {
    displayText:function (value,arr) {
        var newobj = {};
        if(value == '请选择' || value == '')
            return value;
        else {
            for( var i=0;i<arr.length;i++) {
                newobj[arr[i].val] = arr[i].txt;
            }
            return newobj[value];
        }
    }
}
