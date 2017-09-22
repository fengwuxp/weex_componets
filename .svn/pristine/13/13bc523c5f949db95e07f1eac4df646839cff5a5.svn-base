/**
 * Created by wuxp on 2017/6/6.
 */
import {isNullOrUndefined} from "util";

const moneyRegExp = /^[0-9]+[\.]?[0-9]{0,2}$/;

class CommonUtils {

    constructor() {}

    /**
     * 是否为金额
     * @param value
     * @return {boolean}
     */
    isMoney = (value: any): Boolean => {

        if (value === null) {
            return true;
        }

        if (moneyRegExp.test(value)) {
            //金额输入校验
            return true;
        }

        if (value.trim().length === 0) {
            return true;
        }
        return false;
    };

    /**
     * 对象是否为空或者null
     * @param obj
     * @return {Boolean}
     */
    isNullOrUndefined=(obj:any):Boolean=>{
       return isNullOrUndefined(obj);
    };

    /**
     * 字符串去空格
     * @param {String} val
     * @return {number}
     */
    trim=(val:String):String=>{
        if(this.isNullOrUndefined(val)){
            return "";
        }
       return val.trim();
    };

    /**
     * 字符串是否有内容
     * @param {String} val
     * @return {Boolean}
     */
    hasText=(val:String):Boolean=>{
       return this.trim(val).length>0;
    }
}

export default new CommonUtils();