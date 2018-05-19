import {isNumber} from "util";


const Util = {
    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    // 例子：
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
    formatterDate: (date: Date | number = new Date(), fmt: string = "yyyy-MM-dd hh:mm:ss") => {

        if (isNumber(date)) {
            date = Util.getLocalTime(new Date(date));//new Date(date);
        } else {
            date = Util.getLocalTime(date as Date);
        }

        const o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (const k in o)
            if (new RegExp("(" + k as string + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },


    /**
     * 获取本地时间
     * @param {Date} date 当前时间
     * @param {number} i  目标时区，i为时区值数字，比如北京为东八区则输入8,西5输入-5,现默认东八区北京时间
     * @return {Date}
     */
    getLocalTime: (date: Date, i: number = 8): Date => {

        //得到1970年一月一日到现在的秒数
        let local = date.getTime();

        //本地时间与GMT时间的时间偏移差
        let offset = date.getTimezoneOffset() * 60000;

        //得到现在的格林尼治时间
        let utcTime = local + offset;

        return new Date(utcTime + 3600000 * i);
    },


    /**
     * 格式化数值
     * @param value
     * @param regExp
     * @return {number}
     */
    formatterNumber: (value: any = "0", regExp: String): number | string => {
        if (regExp == null) {
            throw new Error("params regExp is  null!");
        }
        let s: string;
        if (regExp.indexOf(".") < 0) {
            s = parseFloat(value).toFixed(0);
            return parseInt(s);
        }

        const len = regExp.split(".")[1].length;
        s = parseFloat(this).toFixed(len);
        return s;//parseInt(s);
    },
    /**
     * 数值金额转换 元转分
     */
    yuanTofen: (value: number = 0): string => {
        let number = value * 1000 / 10;
        let s: string = parseFloat(number.toString()).toFixed(0); // *1000/10 防止精度损失
        return s;//parseInt(s);
    },

    /**
     * 数值金额转换 分转元
     */
    fenToYuan: (value: number = 0): string => {
        let number = value / 100;
        let s: string = parseFloat(number.toString()).toFixed(2);  //保证2位小数
        return s;//parseFloat(s);
    },


    /**
     * 格式化金额
     * @param {string | number} value
     * @param {boolean} isFee 单位是否为分
     * @return {string}
     */
    formatterMoney: (value: string | number, isFee: boolean = true): string => {
        let val: string;
        if (isNumber(value)) {
            val = isFee ? Util.fenToYuan(value) : value.toString();
        } else {
            val = value;
        }
        let rex = /\d{1,3}(?=(\d{3})+$)/g;
        return val.replace(/^(-?)(\d+)((\.\d+)?)$/, function (s, s1, s2, s3) {
            return s1 + s2.replace(rex, '$&,') + s3;
        });
    }
};

/**
 * formatter
 */
export default Util;
