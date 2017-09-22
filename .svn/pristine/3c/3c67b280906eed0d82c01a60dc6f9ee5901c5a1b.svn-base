<!--密码输入框-->
<template>
    <div class="flex_row" :style="inputRowStyle">
        <image v-if="leftIconURL.length>0"
               :style="leftIconStyle"
               :src="leftIconURL"></image>
        <input type="password"
               class="input"
               @input="inputText"
               @focus="inputFocus"
               @blur="inputBlur"
               :maxlength="maxLength"
               :value="value"
               :style="inputStyle"
               :placeholder="placeholder"/>
        <image v-if="clearIconURL.length>0 && showClearButton"
               :style="clearIconStyle"
               :src="clearIconURL"
               @click="clearValue"></image>
        <!--<image class="eye_icon" :src="eyeIconURL"-->
        <!--@click="changeInputType"></image>-->
    </div>
</template>
<script>
    import weexUtils from "../../utils/WeexUtils";

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
            clearIconURL: {
                default: weexUtils.getResourcesURL("/images/buyer/clear_icon.png", weex)
            },
            clearIconStyle: {
                default: {
                    width: "40px",
                    height: "40px",
                    marginRight: "30px"
                }
            },
            eyeIconURL: {default: weexUtils.getResourcesURL("/images/eye_icon.png", weex)},
            placeholder: {
                default: ""
            },
            maxLength: {
                default: 25
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
            return {
                value: "",
                inputType: "text",
                showClearButton: false
            }
        },
        methods: {
            inputText({value}) {
                if (value.length > this.maxLength) {
                    this.value = new String(this.value);
                    return false;
                }
                this.setValue(value);

                //检查输入
                if (this.checkValue && this.checkValue.constructor === Function) {
                    this.checkValue(() => {
                        this.setValue("");
                    });
                }
            },
            inputFocus() {
                this.showClearButton = this.value.length > 0
            },
            inputBlur() {
                this.showClearButton = false;
            },
            clearValue() {
                this.setValue("");
            },
            setValue(val) {
                this.value = val;
                this.showClearButton = val.length > 0;
                this.$emit("input", this.value);  //触发input，事件向上传递
            },
            changeInputType() {
                if (this.inputType === 'password') {
                    this.inputType = "text";
                    this.eyeIconURL = weexUtils.getResourcesURL("/images/eyelash_icon.png", weex);
                } else {
                    this.inputType = "password";
                    this.eyeIconURL = weexUtils.getResourcesURL("/images/eye_icon.png", weex);
                }
            }
        },
        beforeMount() {
            this.setValue(this.initVal);
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

    .eye_icon {
        width: 50px;
        height: 50px;
    }
</style>