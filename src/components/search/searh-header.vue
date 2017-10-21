<template>
    <div>
        <div v-if="ios" class="ios_top"></div>
        <div class="flex_row search-header">
            <div class="back_container" @click="closeSearch">
                <image :src="backIconURL" class="back_icon"></image>
            </div>
            <div v-if="inputFocus" class="search-box">
                <div class="search-content">
                    <image class="search-icon" :src="searchIconURL"></image>
                    <input type="text" :autofocus="inputFocus" class="search-input" placeholder="搜索门店和商品"
                           @focus="searchInputFocus"
                           v-model="searchContentText"/>
                    <image class="clear-icon" v-if="clearShow" :src="clearIconURL" @click="clearInputText"></image>
                </div>
            </div>
            <div v-if="!inputFocus" class="search-box-2" @click="openSearchPlan">
                <image class="search-icon" :src="searchIconURL"></image>
                <text class="search-text">{{searchContentText.trim().length === 0 ? "搜索门店和商品" : searchContentText}}</text>
            </div>
            <div class="right_button" v-if="rightShow">
                <text class="close_button" @click="rightButtonClick">{{rightButtonText}}</text>
            </div>
        </div>
    </div>
</template>
<script>

    import weexUtils from "wxp_weex_componets/src/utils/WeexUtils";

    export default{
        props: {
            backIconURL: {default: weexUtils.getResourcesURL("/images/buyer/back_icon.png", weex)},
            searchIconURL: {default: weexUtils.getResourcesURL("/images/buyer/search_icon.png", weex)},
            clearIconURL: {default: weexUtils.getResourcesURL("/images/buyer/clear_icon.png", weex)},
            rightShow: {default: true},
            clearShow: {default: false},
            inputFocus: {default: true},
            searchInit: {default: ""},
            ios: {default: false}

        },
        data(){
            return {
                rightButtonText: "关闭",
                headerStyle: {},
                changeFlag: false,
            }
        },
        computed: {
            searchContentText: {
                get: function () {
                    return this.searchInit;
                },
                set:function (value) {
                    if (value === null || value.trim().length === 0) {
                        this.clearShow = false;
                        this.rightButtonText = "关闭";
                        value="";
                    } else {
                        this.clearShow = true;
                        this.rightButtonText = "搜索";
                    }
                    value=value.trim();
                    this.$emit("searchInput", {
                        content: value
                    });
                }
            }
        },
        methods: {
            closeSearch(){
                this.$emit("closeSearch");
            },
            rightButtonClick(){
                //点击右侧按钮
                let action = "query";
                if (this.rightButtonText === "关闭") {
                    action = "close";
                } else {
                    if (this.searchContentText.trim().length === 0) {
                        weexUtils.toast("搜索关键字不能为空!");
                        return;
                    }
                }

                //跳转到查询数据的页面
                this.$emit("clickRightButton", {
                    action: action,
                    keyWord: this.searchContentText
                });
            },
            searchInputFocus(){
                //输入框获取焦点
                this.$emit("onSearchInputFocus", {
                    content: this.searchContentText
                });
            },
            openSearchPlan(){
                if (this.searchContentText === null || this.searchContentText.trim().length === 0) {
                    this.rightButtonText = "关闭";
                } else {
                    this.rightButtonText = "搜索";
                }
                //打开搜索面板
                this.searchInputFocus();
                this.inputFocus = true;
            },
            clearInputText(){
                //清除输入框数据
                this.$emit("clickClearButton", {});
                this.rightButtonText = "关闭";
            }
        },
        beforeMount(){

        },
        created(){
        }
    }
</script>
<style scoped>
    .flex_row {
        flex-direction: row;
    }

    .ios_top {
        flex: 1;
        height: 28px;
        background-color: #F4F4F4;
    }

    .search-header {
        background-color: #F4F4F4;
        border-color: #DEDEDE;
        border-style: solid;
        border-bottom-width: 1px;
        padding-right: 30px;
        align-items: center;
    }

    .back_container {
        width: 100px;
        height: 100px;
        padding-top: 20px;
        padding-bottom: 20px;
        justify-content: center;
        align-items: center;
    }

    .back_icon {
        width: 40px;
        height: 40px;
    }

    .search-box-2 {
        flex: 1;
        height: 60px;
        line-height: 60px;
        flex-direction: row;
        padding-left: 25px;
        background-color: #ffffff;
        border-width: 1px;
        border-color: #EBEAEA;
        border-style: solid;
        border-radius: 10px;
        align-items: center;
    }

    .search-text {
        padding-left: 10px;
        font-size: 28px;
        color: #9F9F9F;
    }

    .search-box {
        padding-top: 20px;
        padding-bottom: 20px;
        flex: 1;
        height: 100px;
    }

    .search-content {
        flex: 1;
        height: 60px;
        flex-direction: row;
        padding-left: 20px;
        padding-right: 20px;
        background-color: #ffffff;
        border-width: 1px;
        border-color: #EBEAEA;
        border-style: solid;
        align-items: center;
        border-radius: 10px;
    }

    .search-icon {
        width: 40px;
        height: 40px;
        color: #838383;
    }

    .search-input {
        padding-left: 30px;
        height: 56px;
        line-height: 56px;
        border-width: 0;
        font-size: 28px;
        color: #3C3D3D;
        flex: 1;
        placeholder-color: "#ADADAD"

    }

    .clear-icon {
        width: 40px;
        height: 40px;
    }

    .right_button {
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 20px;
        width: 120px;
        height: 100px;
        justify-content: center;
        align-items: center;
    }

    .close_button {
        background-color: #ffffff;
        width: 100px;
        height: 60px;
        font-size: 32px;
        color: #3C3D3D;
        text-align: center;
        line-height: 60px;
        border-width: 1px;
        border-style: solid;
        border-color: #E1E1E1;
        border-radius: 5px;
    }
</style>