/**
 * Created by wuxp on 2017/6/21.
 */
import {appMain} from "typescript_api_sdk/src/utils/ExpotrtWeexCustomModel";


export default {

    data(){
        return {
            borderColor: "#e6e6e6",
            openActivityLastTime:0
        }
    },
    methods: {
        /**
         * 打开原生的界面
         * @param actionType  动作类型
         * @param actionValue 动作值
         * @param needLogin 是否需要登陆
         * @param params     参数
         * return Promise
         */
        openActivity({actionType, actionValue,needLogin}, params = {}){
            let times=new Date().getTime();
            if (this.openActivityLastTime+800>times) {
                return Promise.reject(()=>{
                    console.log("重复点击!");
                });
            }
            this.openActivityLastTime=times;
            let action = actionType;
            let paramMap = {};
            switch (actionType) {
                case "LINK":
                    //链接
                    paramMap = Object.assign({}, {url: actionValue});
                    break;
                case "SPECIAL":
                    //页面编号
                    paramMap = Object.assign({type:"SPECIAL",uiPageId: actionValue},params);
                    this.jump("/home",paramMap);
                    return;
                case "WEEX_PAGE_LINK":
                    //weex页面
                    this.openWeexByNative(actionValue,false,params,()=>{},needLogin);
                    return;
                case "GOOD_NUMBER":
                    //商品编号
                    paramMap = Object.assign({}, {good_id: parseInt(actionValue), store_id: -1, is_from_store_home: false});
                    break;
                case "GOOD_KEYWORD":
                    //搜索商品
                    return Promise.resolve(this.jump("/search", {keyword: encodeURI(actionValue)}));
                case "STORE_ID":
                    //店铺id
                    paramMap = Object.assign({}, {store_id: parseInt(actionValue)});
                    break;
                case "STORE_KEY_WORD":
                    //搜索店铺
                    return Promise.resolve(this.jump("/search", {keyword: encodeURI(actionValue)}));
                case "CLASS_ID":
                    //分类id
                    paramMap = Object.assign({}, {category_id: actionValue});
                    break;
                case "SEARCH_STORE_GOODS":
                    //店内搜索
                    action="search_goods";
                    break;
                case "my_message":
                    break;
                case "add_receive_addr":
                    break;
                case "choose_receive_addr":
                       //param:{address_id:xxx} 当前地址，没有传0
                    paramMap = Object.assign({}, {address_id: actionValue});
                     break;
                default:
                   console.error("未处理的动作类型，请检查传入的参数!");
            }
            params = Object.assign(paramMap, params);

            console.log("打开原生页面-> action: "+actionType+" 参数："+JSON.stringify(params));

            return new Promise((resolve = () => {
            }, reject = () => {
            }) => {
                appMain.openActivity(action,
                    params, (data) => {
                        resolve(data);
                    }, () => {
                        console.log("页面跳转失败-> " + action + " " + JSON.stringify(paramMap));
                        reject();
                    });
            });
        },
        // /**
        //  * 字符串进行utf-8拌面
        //  * @param str
        //  * @return {string}
        //  */
        // encodeUTF8(str){
        //     let temp = "", rs = "";
        //     for (let i = 0, len = str.length; i < len; i++) {
        //         temp = str.charCodeAt(i).toString(16);
        //         rs += "\\u" + new Array(5 - temp.length).join("0") + temp;
        //     }
        //     return rs;
        // },
        // /**
        //  * 字符串utf-8解码
        //  * @param str
        //  */
        // decodeUTF8(str){
        //     return str.replace(/(\\u)(\w{4}|\w{2})/gi, function ($0, $1, $2) {
        //         return String.fromCharCode(parseInt($2, 16));
        //     });
        // }
    }
}