<!--带背景图的底部导航条-->
<template>
    <div class="bottom_nav_container" :style="navStsyle">
        <image :src="navBgImage" class="nav_bg"></image>
        <div class="nav_list">
            <div v-for="(item,index) in navItems" class="nav-item" @click="navItemOnClick(index)">
                <image class="nav-item-image" :src="item.icon"></image>
                <text class="nav-item-text" :style="item.textColor">{{item.text}}</text>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        props: {
            navItems: {default: []},
            selectedIndex: {default: 0},
            web: {default: false},
            navStsyle: {
                default: {}
            },
            navBgImage: {default: ""}
        },
        data() {
            return {}
        },
        methods: {
            navItemOnClick: function (index) {
                this.$emit('bottomNavOnclick', index);
            }
        },
        created: function () {
        }
    }
</script>

<style scoped>
    .bottom_nav_container {
        flex-direction: row;
        justify-content: flex-end;
        height: 100px;
        background-color: transparent;
        position: relative;
    }

    .nav_list {
        position: absolute;
        padding-left: 10px;
        padding-right: 10px;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        flex-direction: row;
    }

    .nav-item {
        flex: 1;
        height: 100px;
        justify-content: center;
        align-items: center;
    }

    .nav-item-image {
        height: 66px;
        width: 66px;
    }

    .nav-item-text {
        font-size: 26px;
        line-height: 30px;
    }

    .nav_bg {
        flex: 1;
    }
</style>