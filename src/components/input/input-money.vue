<!--金额输入控件-->
<template>
    <div class="flex_row" :style="inputRowStyle">
        <image v-if="leftIconURL.length>0"
               :style="leftIconStyle"
               :src="leftIconURL"></image>
        <text v-if="leftText"
              :value="leftText"
              :style="leftTextStyle"></text>
        <input :type="inputType" class="input"
               @input="inputText"
               @focus="inputFocus"
               @blur="inputBlur"
               :value="value"
               :style="inputStyle"
               :autofocus="autoFocus"
               :placeholder="placeholder"/>
        <image v-if="clearIconURL.length>0 && showClearButton"
               :style="clearIconStyle"
               :src="clearIconURL"
               @click="clearValue"></image>
    </div>
</template>
<script>
    import weexUtils from "../../utils/WeexUtils";
    import commonUtils from "../../utils/CommonUtils";

    export default {
        props: {
            leftIconURL: {
                default: ""
            },
            leftIconStyle: {
                default: {
                    width: "50px",
                    height: "50px",
                    marginRight: "30px"
                }
            },
            leftText: {
                default: ""
            },
            leftTextStyle: {
                default: {
                    fontSize: "32px",
                    color: "#303030",
                    paddingRight: "10px"
                }
            },
            clearIconURL: {
                default: weexUtils.getResourcesURL("images/clear_icon.png")
            },
            clearIconStyle: {
                default: {
                    width: "40px",
                    height: "40px",
                    marginRight: "30px"
                }
            },
            autoFocus: {
                default: false
            },
            placeholder: {
                default: ""
            },
            maxValue: {
                default: -1
            },
            inputRowStyle: {
                default: {
                    padding: "15px",
                    borderBottomWidth: "1px",
                    borderBottomColor: "#e6e6e6",
                    borderBottomStyle: "solid"
                }
            },
            inputStyle: {
                default: {
                    lineHeight: "60px",
                    height: "60px"
                }
            },
            initVal: {
                default: ""
            },
            checkValue: {
                default: false
            }
        },
        data() {
            let isAndroid = weex.config.env.platform.toLowerCase() === "android";
            return {
                value: "",
                showClearButton: false,
                inputType:isAndroid?'tel':"number"
            }
        },
        methods: {
            inputText({value}) {
                if (!commonUtils.hasText(value)) {
                    return;
                }
                let val = parseFloat(value);
                if (this.maxValue > -1 && this.maxValue < val) {
                    //最大值验证
                    value = this.maxValue;
                }

                let values = value.split(".");
                if (values.length === 2 && values[1].length > 2) {
                    values[1] = values[1].substr(0, 2);
                    console.log("value join-> " + values.join("."));
                    value = values.join(".");
                }
                this.setValue(value);

            },
            inputFocus() {
                this.showClearButton = this.value.length > 0
            },
            inputBlur() {
                this.showClearButton = this.value.length > 0;
            },
            clearValue() {
                this.setValue("");
            },
            /**
             * 设置值
             * @param val
             * @param showClear 是否显示清除按钮
             */
            setValue(val, showClear = true) {
                this.value = val;
                if (showClear) {
                    this.showClearButton = val.length > 0;
                } else {
                    this.showClearButton = false;
                }
                this.$emit("input", this.value, (value) => {
                    this.value = value;
                });  //触发input，事件向上传递

            }
        },
        beforeMount() {
            this.setValue(this.initVal, false);
        }
    }
</script>
<style scoped>
    .flex_row {
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .input {
        flex: 1;
        border-width: 0;
        color: #3f3c3c;
        placeholder-color: #919191;
    }
</style>