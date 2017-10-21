<template>
    <div class="broadcast-container flex_cell" :style="marqueeStyle">
        <div class="broadcast-left flex_cell">
            <image :src="logo" class="logo"></image>
            <div class="vertical_line"></div>
            <image :src="hornIconURL" class="horn-icon"></image>
        </div>
        <div style="flex:1">
            <marquee ref="marquee"
                     :duration="1500"
                     :interval="3000"
                     :step="height"
                     :count="items.length"
                     :marqueeStyle="marqueeStyle"
                     @change="marqueeChange">
                <div class="text-info" v-for="(item,i) in items" @click="openPage(i)">
                    <text class="text-overflow text-title" lines="1">{{item.name}}</text>
                    <text class="text-overflow text-info" lines="1">{{item.description}}</text>
                </div>
            </marquee>
        </div>
    </div>
</template>
<script>
    import Marquee from "../../../src/components/home/marquee.vue";
    import weexUtils from "wxp_weex_componets/src/utils/WeexUtils";
    import callNative from "wxp_weex_componets/src/mixins/CallNative";
    import mixins from "wxp_weex_componets/src/mixins/index";
    import memberSession from "../../mixins/MemberSession";

    export  default{
        components: {Marquee},
        mixins:[mixins,callNative,memberSession],
        props: {
            items: {default: {}},
            logo: {default: weexUtils.getResourcesURL("images/logo.png",weex)},
            hornIconURL: {default: weexUtils.getResourcesURL("images/horn_icon.png",weex)},
        },
        data(){
            const height=70;
            return {
                height,
                marqueeStyle:{height:height+"px"}
            }
        },
        methods: {
            openPage(i){
                let item=this.items[i];
                const {actionType,actionValue,needLogin}=item;
                this.openActivity({
                    actionType:actionType,
                    actionValue: actionValue,
                    needLogin:needLogin
                });
            }
        },
        mounted(){
        },
        created(){

        }
    }
</script>
<style scoped>
    .broadcast-container{
        flex-direction: row;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 5px;
        padding-bottom: 5px;
        justify-content: center;
        background-color: #ffffff;
        overflow: hidden;
    }
    .flex_cell{
        justify-content: center;
        align-items: center;
    }
    .broadcast-left {
        flex-direction: row;
        height: 70px;
        width: 150px;
    }
    .logo{
        width: 70px;
        height: 70px;
        margin-right: 15px;
    }
    .vertical_line{
        border-right-width: 1px;
        border-right-color: #e6e6e6;
        border-right-style: solid ;
        height: 50px;
    }
    .horn-icon{
        width: 40px;
        height: 40px;
        margin-left: 15px;
    }
    .text-overflow{
        font-size: 30px;
        line-height: 35px;
        height: 35px;
        text-overflow: ellipsis;
        lines:1
    }
    .text-title{
        color: red;
    }
    .text-info{
        color: #3c3c3c;
    }
</style>