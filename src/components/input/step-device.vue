<!--步进器-->
<template>
    <div class="stepping">
        <image v-if="decreaseButtonShow"
               :style="buttonStyle"
               :src="decreaseIconURL"
               @click="decreaseButton"></image>
        <input :type="inputType"
               @input="inputValue"
               @focus="inputFocus"
               @blur="inputBlur"
               :style="inputStyle"
               :disabled="readonly"
               :maxlength="maxLength"
               v-bind:value="value"/>
        <image v-if="addButtonShow"
               :style="buttonStyle"
               :src="addIconURL"
               @click="addButton"></image>
    </div>
</template>
<script>
    import weexUtils from "../../utils/WeexUtils";
    import {timer} from "typescript_api_sdk/src/utils/ExportWeexSdkModel";

    const ADD_ICON_URL = weexUtils.getResourcesURL("images/storehome_icon_add@2x.png");
    const ADD_ICON_DISABLED_URL = weexUtils.getResourcesURL("images/storehome_icon_add_disable@2x.png");
    const DECREASE_ICON_URL = weexUtils.getResourcesURL("images/storehome_icon_decrease@2x.png");
    const DECREASE_ICON_DISABLED_URL = weexUtils.getResourcesURL("images/storehome_icon_decrease_disable@2x.png");
    /**
     * 节流函数
     * @param times
     * @param action
     * @return {Function}
     */
    const debounce = (times, action) => {
        let last;
        return function () {
            let ctx = this;
            let args = arguments;
            timer.clearTimeout(last);
            last = timer.setTimeout(() => {
                action.apply(ctx, args)
            }, times);
        }
    };

    export default {
        props: {
            initVal: {
                default: ""   //初始值
            },
            maxVal: {
                default: -1   //最大值，-1表示不限制
            },
            minVal: {
                default: 0   //最小值，-1表示不限制
            },
            stepSize: {
                default: 1    //步长
            },
            addIconURL: {default: ADD_ICON_URL},
            decreaseIconURL: {default: DECREASE_ICON_URL},
            buttonStyle: {
                default: {
                    width: "50px",
                    height: "50px"
                }
            },
            inputStyle: {
                default: {
                    lineHeight: "45px",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    paddingTop: "7px",
                    paddingBottom: "7px",
                    width: "120px",
                    borderWidth: "1px",
                    borderColor: "#d2d2d2",
                    borderRadius: "2px",
                    marginLeft: "10px",
                    marginRight: "10px"
                }
            },
            readonly: {default: false},
            buttonShowModel: {
                default: "hide"   //按钮在边界值情况的显示模式 hide:隐藏 disabled:禁用
            },
            decimalLength: {  //保留的小数位数 默认为0
                default: 0
            },
            chcekInputValue: {
                default: false
            }
        },
        data() {
            let platform = weex.config.env.platform.toLowerCase();
            let inputType = platform === "android" ? "number" : 'tel';
            return {
                value: 0,
                addButtonShow: true,
                decreaseButtonShow: true,
                inputType,
                platform
            }
        },
        methods: {
            inputValue: function ({value}) {
                console.log("value-> " + value);
                console.log(arguments);
                value = value.trim();
                let length = value.length;
                if (length === 0) {
                    this.value = "";
                    return;
                }
                //value = this.valueCheck(value);
                this.setValue(value)
            },

            valueCheck(value) {
                let valString = value.toString();
                let index = valString.indexOf(".");
                let length = value.length;
                if (this.decimalLength > 0 && index > 0) {
                    //需要保留小数位数，且输入了小数点
                    if (index === length - 1) {
                        //最后一位输入的值为小数点
                        this.value = value;
                        this.valueChange();
                    } else {
                        let values = valString.split(".");
                        this.decimalLength = parseInt(this.decimalLength);
                        let end = this.decimalLength + values[0].length + 1;
                        value = valString.substr(0, end);
                        value = parseFloat(value);
                    }
                } else {
                    value = parseInt(value);
                }
                return value;

            },
            /**
             * 设置值
             * @param resultValue 结果值
             */
            setValue(resultValue) {
                resultValue=parseFloat(resultValue);
                if (resultValue < this.minVal) {
                    //结果值小于最小值
                    resultValue = this.minVal === -1 ? resultValue : this.minVal;

                } else if (resultValue >= this.maxVal) {
                    //结果值大于最大值
                    resultValue = this.maxVal === -1 ? resultValue : this.maxVal;
                }

                if (this.decimalLength > 0) {

                    let length = 0;
                    let s = resultValue.toString().trim();
                    let i = s.indexOf(".");
                    if (i >= 0 && i < s.length - 1) {
                        length = s.split(".")[1].length;
                        resultValue = parseFloat(resultValue).toFixed(length < this.decimalLength ? length : this.decimalLength);
                    } else {

                    }
                }else {
                    resultValue=parseInt(resultValue);
                }

                this.value = resultValue;
                this.valueChange();
                this.changeButtonShowStatus();
                console.log("value-> " + this.value);
            },
            decreaseButton() {
                let val = this.value.toString().trim().length === 0 ? 0 : this.value;
                let resultValue = this.accurateSubtraction(val, this.stepSize);
                this.setValue(resultValue)
            },
            addButton() {
                let val = this.value.toString().trim().length === 0 ? 0 : this.value;
                let resultValue = this.accurateAdd(parseFloat(this.value), this.stepSize);
                this.setValue(resultValue)
            },
            valueChange() {
                this.$emit("input", this.value);
            },
            inputFocus() {

            },
            inputBlur() {

            },
            /**
             * 改变按钮显示状态
             */
            changeButtonShowStatus() {
                if (this.value === this.minVal) {
                    if (this.buttonShowModel === "hide") {
                        this.decreaseButtonShow = false;
                    } else {
                        this.decreaseIconURL = DECREASE_ICON_DISABLED_URL
                    }
                    return
                }
                if (this.value === this.maxVal) {
                    if (this.buttonShowModel === "hide") {
                        this.addButtonShow = false;
                    } else {
                        this.addIconURL = ADD_ICON_DISABLED_URL
                    }
                    return;
                }
                if (this.buttonShowModel === "hide") {
                    if (!this.decreaseButtonShow) {
                        this.decreaseButtonShow = true;
                    }
                    if (!this.addButtonShow) {
                        this.addButtonShow = true;
                    }
                } else {
                    if (this.addIconURL !== ADD_ICON_URL) {
                        this.addIconURL = ADD_ICON_URL;
                    }
                    if (this.decreaseIconURL !== DECREASE_ICON_URL) {
                        this.decreaseIconURL = DECREASE_ICON_URL;
                    }
                }

            },

            /**
             * 精确加法计算
             **/
            accurateAdd(arg1, arg2) {
                let r1, r2, m, c;
                try {
                    r1 = arg1.toString().split(".")[1].length;
                }
                catch (e) {
                    r1 = 0;
                }
                try {
                    r2 = arg2.toString().split(".")[1].length;
                }
                catch (e) {
                    r2 = 0;
                }
                c = Math.abs(r1 - r2);
                m = Math.pow(10, Math.max(r1, r2));
                if (c > 0) {
                    let cm = Math.pow(10, c);
                    if (r1 > r2) {
                        arg1 = Number(arg1.toString().replace(".", ""));
                        arg2 = Number(arg2.toString().replace(".", "")) * cm;
                    } else {
                        arg1 = Number(arg1.toString().replace(".", "")) * cm;
                        arg2 = Number(arg2.toString().replace(".", ""));
                    }
                } else {
                    arg1 = Number(arg1.toString().replace(".", ""));
                    arg2 = Number(arg2.toString().replace(".", ""));
                }
                return (arg1 + arg2) / m;
            },
            /**
             * 精确减法计算
             **/
            accurateSubtraction(arg1, arg2) {
                let r1, r2, m, n;
                try {
                    r1 = arg1.toString().split(".")[1].length;
                }
                catch (e) {
                    r1 = 0;
                }
                try {
                    r2 = arg2.toString().split(".")[1].length;
                }
                catch (e) {
                    r2 = 0;
                }
                m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
                n = (r1 >= r2) ? r1 : r2;
                return ((arg1 * m - arg2 * m) / m).toFixed(n);
            }
        },
        beforeMount() {
            if (this.initVal) {
                this.value = parseFloat(this.initVal);
                this.valueChange();
            }
            this.changeButtonShowStatus();
            if (this.decimalLength > 0) {
                this.inputType = this.platform === "ios" ? "number" : 'tel';
            }
            if (this.maxVal !== -1) {
                this.maxVal = parseInt(this.maxVal);
            }
            if (this.minVal !== -1) {
                this.minVal = parseInt(this.minVal);
            }

        }
    }
</script>
<style scoped>
    .stepping {
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
</style>