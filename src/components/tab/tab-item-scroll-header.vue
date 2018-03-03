<!--tab item scroll-头部-->
<template>
    <scroller class="flex_row flex_center"
              :style="scrollStyle"
              show-scrollbar="false"
              scroll-direction="horizontal">
        <div class="flex_center"
             v-for="(item,i) in items"
             :key="i"
             :ref="'item_header_'+i"
             @click="changeTab(i)"
             :style="getContainerStyle(i)">
            <text :style="getTextStyle(i)">{{item.text}}</text>
        </div>
    </scroller>
</template>
<script>
    import {dom} from "typescript_api_sdk/src/utils/ExportWeexSdkModel";

    export default {
        props: {
            items: {default: []},
            scrollStyle:{
                default:{}
            },
            defaultStyle: {
                default: {
                    container: {
                        backgroundColor: "#ffffff",
                        flex: "1"
                    },
                    text: {
                        fontSize: "32px",
                        color: "#303030"
                    }
                }
            },
            selectedStyle: {
                default: {
                    container: {
                        backgroundColor: "green"
                    },
                    text: {
                        fontSize: "32px",
                        color: "#FFFFFF"
                    }
                }
            },
            selectedIndex: {default: 0}
        },
        data() {
            return {};
        },
        methods: {
            //点击改变tab项
            changeTab(i) {
                if (this.selectedIndex === i) {
                    return;
                }
                this.$emit("changeTabItem", {
                    currentIndex: this.selectedIndex,
                    index: i,
                });

                if (this.items.length > 5) {
                    let targetIndex = (i === 0 || i === this.items.length - 1) ? i : i - 1;
                    const el = this.$refs['item_header_' + targetIndex][0];
                    dom.scrollToElement(el);
                }

            },
            getTextStyle(index){
                if(index===this.selectedIndex){
                    return this.selectedStyle.text
                }else {
                    return this.defaultStyle.text;
                }
            },
            getContainerStyle(index){
                if(index===this.selectedIndex){
                    return this.selectedStyle.container
                }else {
                    return this.defaultStyle.container;
                }
            }
        },
        beforeMount() {

        }
    }
</script>
<style scoped>
    .flex_row {
        flex-direction: row;
    }

    .flex_center {
        justify-content: center;
        align-items: center;
    }
</style>