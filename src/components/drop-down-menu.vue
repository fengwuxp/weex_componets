<template>
    <div class="drop-down-container">
        <div class="drop-down-mask" @click="changeStatus(true)"></div>
        <div class="drop-down-list">
            <div v-for="(item,index) in menus" class="drop-down-item border_bottom"
                 @click="selectedMenu(index)">
                <div v-if="selected===index"
                     style="flex-direction: row;justify-content: space-between;">
                    <text style="flex:4;font-size: 32px;" :style="selectedStyle">{{item.text}}</text>
                    <div style="flex: 1;justify-content: flex-end;flex-direction: row;">
                        <image :src="selectedImage" class="selected-icon"></image>
                    </div>
                </div>
                <div v-else @click="selectedMenu(index)">
                    <text style="font-size: 32px;">{{item.text}}</text>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import weexUtils from "../utils/WeexUtils";
    export default{
        props: {
            menus: {
                type: Array,
                default: []
            },

            selectedImage: {
                type: String,
                default: weexUtils.getResourcesURL("/images/tick_icon.png",weex)
            },
            selected: {
                type: Number,
                default: 0
            }
        },
        data(){
            return {
                selectedStyle: {
                    color: "#4FB57A",
                }
            };
        },
        methods: {
            selectedMenu(index){
                if (this.selected === index) {
                    this.changeStatus(true);
                    return;
                }
               // let menu = this.menus[index];
                this.$emit("changDropMenuSelected", index);
            },
            changeStatus(isShow){
                this.$emit("dropMenuIsShow", isShow);
            }

        }

    }
</script>

<style scoped>
    .drop-down-container {
        position: fixed;
        top: 100px;
        right: 0;
        left: 0;
        bottom: 0;
    }

    .drop-down-item {
        padding: 25px;

    }

    .drop-down-list {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        background-color: #ffffff;
    }

    .drop-down-mask {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, .4);
    }

    .selected-icon {
        width: 40px;
        height: 40px;
    }

    .border_bottom {
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-bottom-color: #e6e6e6;
    }
</style>