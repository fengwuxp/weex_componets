<template>
    <div>
        <div class="flex_row tab-list" :style="tabHeaderStyle">
            <div class="tab-header"
                 v-for="(item,i) in list"
                 :key="i"
                 @click="changIndex(i)">
                <text class="tab-header-text" :style="item.style">{{item.name}}</text>
                <div class="vertical_line_tab" v-if="i<list.length-1"></div>
            </div>
        </div>
        <div :style="scrollerStyle">
            <slider :index="showIndex"
                    @change="changeSlider">
                <div class="slider-container"
                     v-for="(item,index) in list"
                     :key="index">
                    <div class="store_info flex_row"
                         v-for="(storeInfo,i) in item.storeInfos"
                         :key="i"
                         @click="openStore(index,i)">
                        <image :src="storeInfo.logo" class="store_logo"></image>
                        <div class="store_text_info">
                            <div style="height: 140px;">
                                <text class="store_name" lines="1">{{storeInfo.name}}</text>
                                <div class="flex_row" style="margin-bottom: 10px;">
                                    <text class="text_tag_dispatching">{{storeInfo.startPrice}}元起送</text>
                                    <text class="text_tag_money">免运费</text>
                                </div>
                                <div class="flex_row" style="align-items: center">
                                    <image v-for="(start,i) in storeInfo.starsList" class="start_icon"
                                           :src="start"></image>
                                    <text class="vertical_line">|</text>
                                    <text class="sales_volumes">售出{{storeInfo.sales}}件</text>
                                </div>
                            </div>
                            <div class="coupon_infos  border_top_dashed"
                                 v-if="storeInfo.voucherInfos.length>0 || storeInfo.rule!==null">
                                <div class="store_discount flex_row" v-for="(item,i) in storeInfo.voucherInfos"
                                     v-if="i<2">
                                    <text class="text_tag_coupon">领券</text>
                                    <text class="coupon_info" lines="1">{{item.title}}</text>
                                </div>
                                <div v-if="storeInfo.rule!==null">
                                    <text class="text_tag_coupon">满送</text>
                                    <text class="coupon_info" lines="1">满{{storeInfo.rule.price}}减{{storeInfo.rule.discount}}</text>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </slider>
        </div>
    </div>
</template>
<script>

    import {imageLoader} from "wxp_weex_componets/src/utils/ExportWeexModel";
    import callNative from "wxp_weex_componets/src/mixins/CallNative";
    import mixins from "wxp_weex_componets/src/mixins/index";
    import memberSession from "../../mixins/MemberSession";
    import ApiReqFactory from "wxp_weex_componets/src/utils/ApiReqFactory";
    import weexUtils from "wxp_weex_componets/src/utils/WeexUtils";
    import formatWeexUtils from "wxp_weex_componets/src/utils/FormatWeexUtils";

    import storeService from "jn_api_sdk/src/services/store/StoreService";


    export default{
        mixins:[callNative,memberSession,mixins],
        props: {
            tabHeaderStyle: {default: {}}
        },
        data(){
            return {
                list: [],
                showIndex: 0,
                storeIndex: 0,   //处理ios的重复渲染 用作校正
                scrollerStyle: {}
            };
        },
        methods: {
            changeTab(index){
                let prev = this.storeIndex;
                this.storeIndex = index;
                this.changeStyle(this.list[prev], prev);
                let item = this.list[index];
                this.changeStyle(item, index);
                this.scrollerStyle = item.storeStyle;   //更新高度
            },
            changIndex(index){
                this.changeTab(index);
                this.showIndex = index;
            },
            changeStyle(item, i){
                if (i === this.storeIndex) {
                    item.style = {
                        color: "#46B34E",
                        borderBottomWidth: "5px",
                        borderBottomStyle: "solid",
                        borderBottomColor: "#46B34E",
                        paddingBottom: "15px"
                    };
                } else {
                    item.style = {
                        color: "#6B6A6A",
                        borderBottomWidth: "0px",
                        borderBottomStyle: "solid",
                        borderBottomColor: "#46B34E",
                        paddingBottom: "20px"
                    };
                }
            },
            changeSlider({index}){
                this.changeTab(index);
            },
            openStore(row,i){
                //打开店铺
                let store=this.list[row].storeInfos[i];
                console.log(store);
                this.openActivity({
                    actionType:"STORE_ID",
                    actionValue:store.id
                });
            }
        },
        beforeMount()
        {
            const req = ApiReqFactory.newInstancesQueryReq({
                hasLoadStore: true,
                enable: true
            });
            storeService.queryCustomClass(req).then(({records}) => {
                records.forEach((item, i) => {
                    let height = 0;
                    item.storeInfos.forEach((store) => {
                        height += 181;  //基本高度
                        let starsList = [];
                        let praiseRate = parseInt(store.praiseRate);
                        for (let i = 0; i < 5; i++) {
                            if (i < praiseRate) {
                                starsList[i] = weexUtils.getResourcesURL("images/buyer/msdj_brigt_light.png", weex);
                            } else {
                                starsList[i] = weexUtils.getResourcesURL("images/buyer/msdj_grey_star.png", weex);
                            }
                        }
                        store.starsList = starsList;
                        if (store.voucherInfos === null || store.voucherInfos === undefined) {
                            store.voucherInfos = [];
                        }

                        if (store.voucherInfos.length > 2) {
                            height += 2 * 50;
                        } else {
                            height += store.voucherInfos.length * 50;
                        }

                        if (store.rule === undefined || store.rule === null) {
                            store.rule = null;
                        } else {
                            store.rule.price = formatWeexUtils.fenToYuan(store.rule.price);
                            store.rule.discount = formatWeexUtils.fenToYuan(store.rule.discount);
                            if (height < 282) {
                                height += 50;
                            }
                        }
                        if (height > 181) {
                            height += 1;
                        }
                    });
                    item.storeStyle = {
                        height: height + "px"
                    };
                    this.changeStyle(item, i);
                });
                this.list = records;
                this.scrollerStyle = records[0].storeStyle;
            });
        }
    }
</script>
<style scoped>
    .flex_row {
        flex-direction: row;
    }

    .tab-list {
        background-color: #E5E5E5;
    }

    .tab-header {
        flex: 1;
        flex-direction: row;
        padding-left: 15px;
        padding-right: 15px;
        align-items: center;
    }

    .vertical_line_tab {
        border-right-width: 1px;
        border-right-color: #46B34E;
        border-right-style: solid;
        width: 1px;
        height: 25px;
    }

    .tab-header-text {
        flex: 1;
        padding-top: 20px;
        padding-bottom: 20px;
        font-size: 32px;
        text-align: center;
    }

    .store_info {
        padding: 20px;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #e6e6e6;
        background-color: #ffffff;
    }

    .store_logo {
        width: 140px;
        height: 140px;
    }

    .store_text_info {
        flex: 1;
        padding-left: 15px;
    }

    .store_name {
        font-size: 32px;
        color: #3c3c3c;
        margin-bottom: 15px;
        text-overflow: ellipsis;
        lines: 1;
    }

    .text_tag_dispatching {
        font-size: 24px;
        color: #ADADAD;
        border-width: 1px;
        border-color: #ADADAD;
        border-style: solid;
        margin-right: 15px;
        padding-right: 10px;
        padding-left: 10px;
        line-height: 32px;
        border-radius: 4px;
    }

    .text_tag_money {
        font-size: 24px;
        color: #0db3f3;
        border-width: 1px;
        border-color: #0db3f3;
        border-style: solid;
        margin-right: 15px;
        padding-right: 10px;
        padding-left: 10px;
        line-height: 32px;
        border-radius: 4px;
    }

    .start_icon {
        width: 18px;
        height: 18px;
    }

    .vertical_line {
        color: #ADADAD;
        margin-right: 5px;
        margin-left: 5px;
        font-size: 26px;
    }

    .slider-container {
        width: 750px;
    }

    .sales_volumes {
        color: #ADADAD;
        font-size: 24px;
    }

    .border_top_dashed {
        border-top-width: 1px;
        border-top-style: dashed;
        border-top-color: #e6e6e6;
    }

    .coupon_infos {
        padding-right: 20px;
    }

    .text_tag_coupon {
        font-size: 22px;
        color: #ffffff;
        border-width: 1px;
        border-color: red;
        border-style: solid;
        padding-right: 3px;
        padding-left: 3px;
        line-height: 28px;
        border-radius: 2px;
        background-color: red;
    }

    .store_discount {
        padding-top: 20px;
        align-items: center;
    }

    .coupon_info {
        font-size: 22px;
        color: #d2d2d2;
        margin-left: 10px;
        text-overflow: ellipsis;
        lines: 1
    }


</style>