<!--tabbar view 且底部导航带背景图片-->
<template>
    <div class="flex_cell default_bg_color">
        <div class="flex_cell" v-if="web">
            <div v-for="(item,i ) in pageItems"
                 v-if="item.targetType===NavItemType.VIEW"
                 v-show="i===currentViewIndex"
                 class="flex_cell">
                <slot :name="'view_'+i"></slot>
            </div>
        </div>
        <div class="flex_cell"
             v-else>
            <embed class="view_content"
                   v-for="(item,index) in pageItems"
                   v-if="item.targetType===NavItemType.VIEW"
                   :key="index"
                   :style="item.style"
                   :src="item.url"
                   type="weex"></embed>
        </div>
        <tabbar-nav :pageItems="pageItems"
                    :defaultViewIndex="defaultViewIndex"
                    :itemSelectedColor="itemSelectedColor"
                    :navItemContainerStyle="navItemContainerStyle"
                    :navItemBgImage="navItemBgImage"
                    :navItemBgImageStyle="navItemBgImageStyle"
                    :centerIconStyle="centerIconStyle"
                    :navItemStyle="navItemStyle"
                    :navIconStyle="navIconStyle"
                    :numberIconStyle="numberIconStyle"
                    :getNavIcon="getNavIcon"
                    @changeNav="changeNav"/>
    </div>
</template>
<script>
    import TabbarNav from "./tabbar-nav";

    import {NavItemType} from "./NavItemType";
    import DefaultNavProps from "./DefaultNavProps";

    export default {
        //组件
        components: {TabbarNav},

        //属性
        props: {

            web: {default: false},
            ...DefaultNavProps
        },
        //初始化数据
        data() {
            return {
                currentViewIndex:0,
                NavItemType
            }
        },
        //方法列表
        methods: {
            changeNav(params){
                this.currentViewIndex=params.index;
                this.$emit("changePage",params );
            }
        },

        /*
        * 在挂载开始之前被调用
        * */
        beforeMount() {
            this.currentViewIndex=this.defaultViewIndex;
        }
    }
</script>
<style scoped>
    .view_content {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .flex_cell {
        flex: 1;
    }


</style>
