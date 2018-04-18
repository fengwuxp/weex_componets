/**
 * Created by wuxp on 2017/6/6.
 */
import {isNullOrUndefined, isString, isNumber, isBoolean} from "util";

const moneyRegExp = /^[0-9]+[\.]?[0-9]{0,2}$/;

class CommonUtils {

    constructor() {
    }

    /**
     * 是否为金额
     * @param value
     * @return {boolean}
     */
    isMoney = (value: any): boolean => {

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
     * @return {boolean}
     */
    isNullOrUndefined = (obj: any): boolean => {
        return isNullOrUndefined(obj);
    };

    /**
     * 是否为一个空对象
     * @param obj
     * @return {boolean}
     */
    isEmptyObject = (obj: any): boolean => {
        if (isNullOrUndefined(obj)) {
            return true;
        }
        if (isString(obj)) {
            let k: string = obj.trim();
            if (k.trim().length === 0) {
                return true;
            }
            if (k === "null" || k === "undefined" || k === "{}" || k === "[]") {
                return true;
            }
        }
        if (isNumber(obj)) {
            return isNaN(obj);
        }
        if (isBoolean(obj)) {
            return false;
        }
        for (let k in obj) {
            return false
        }

        return true;
    };

    /**
     * 字符串去空格
     * @param {String} val
     * @return {number}
     */
    trim = (val: String): string => {
        if (this.isNullOrUndefined(val)) {
            return "";
        }
        if (!isString(val)) {
            val = val.toString();
        }
        return val.trim();
    };

    /**
     * 字符串是否有内容
     * @param {String} val
     * @return {boolean}
     */
    hasText = (val: String): boolean => {
        return this.trim(val).length > 0;
    }
}

export default new CommonUtils();
