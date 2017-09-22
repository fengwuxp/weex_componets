<!--搜索框-->
<template>
    <div class="search-content" :style="containerStyle">
        <image class="search-icon" :src="searchIconURL"></image>
        <input type="text" :autofocus="inputFocus"
               class="search-input"
               :placeholder="searchPlaceholder"
               :style="inputStyle"
               @focus="searchInputFocus"
               v-model="searchContentText"/>
        <image class="clear-icon" v-if="clearShow" :src="clearIconURL" @click="clearInputText"></image>
    </div>
</template>
<script>
    import weexUtils from "../utils/WeexUtils";

    export default {
        props: {
            searchContainerStyle: {
                default: {}
            },
            searchInputStyle: {
                default: {}
            },
            searchPlaceholder: {default: ""},
            backIconURL: {default: weexUtils.getResourcesURL("/images/buyer/back_icon.png", weex)},
            searchIconURL: {default: weexUtils.getResourcesURL("/images/buyer/search_icon.png", weex)},
            clearIconURL: {default: weexUtils.getResourcesURL("/images/buyer/clear_icon.png", weex)},
            clearShow: {default: false}
        },
        data() {
            return {
                inputStyle: {
                    paddingLeft: " 20px",
                    height: "56px",
                    lineHeight: " 56px",
                    placeholderColor: "#ADADAD",
                    color: "#3C3D3D"
                },
                containerStyle: {
                    backgroundColor: " #ffffff",
                    height: " 60px",
                    borderColor: "#EBEAEA"
                },
                searchText:""
            }
        },
        computed: {
            //输入的搜索文本
            searchContentText: {
                get: function () {
                    return this.searchText;
                },
                set: function (value) {
                    console.log("searchContentText-> " + value)
                    if (value === null || value.trim().length === 0) {
                        this.clearShow = false;
                        value = "";
                    } else {
                        this.clearShow = true;
                    }
                    this.searchText=value.trim();
                    this.$emit("searchAction", {
                        content: this.searchText
                    });
                }
            }
        },
        methods: {
            searchInputFocus() {
                //输入框获取焦点
                this.$emit("onSearchInputFocus", {
                    content: this.searchContentText
                });
            },
            clearInputText() {
                //清除输入框数据
                this.searchContentText = "";
                this.$emit("clickClearButton", {
                    content: this.searchContentText
                });
            }
        },
        created(){
            this.containerStyle=Object.assign(this.containerStyle,this.searchContainerStyle);
            this.inputStyle=Object.assign(this.inputStyle,this.searchInputStyle);
        }
    }
</script>
<style scoped>
    .search-content {
        flex: 1;
        flex-direction: row;
        padding-left: 20px;
        padding-right: 20px;
        border-width: 1px;
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
        border-width: 0;
        font-size: 28px;
        flex: 1;
    }

    .clear-icon {
        width: 40px;
        height: 40px;
    }
</style>