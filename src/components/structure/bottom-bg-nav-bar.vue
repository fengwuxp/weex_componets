<!--带背景图和icon数值标记的的底部导航条-->
<template>
    <div class="bottom_nav_container" :style="navStsyle">
        <image v-if="navBgImage" :src="navBgImage" class="nav_bg"></image>
        <div class="nav_list">
            <div v-for="(item,index) in navItems" class="nav-item" @click="navItemOnClick(index)">
                <image class="nav-item-image" :src="item.icon"></image>
                <text class="nav-item-text" :style="item.textColor">{{item.text}}</text>
                <text class="number-icon"
                      v-if="item.number>0 && item.number<=99"
                      :value="item.number"></text>
                <text class="number-icon"
                      v-if="item.number>99"
                      :value="item.number">...</text>
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
        height: 120px;
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
        justify-content: center;
        align-items: center;
        position: relative;
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
        max-height: 100px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        top: 20px;
    }

    .number-icon {
        width: 40px;
        height: 40px;
        font-size: 22px;
        border-radius: 40px;
        background-color: red;
        color: #ffffff;
        text-align: center;
        line-height: 40px;
        font-weight: 700;
        position: absolute;
        right: 36px;
        top: 7px;
    }
</style>