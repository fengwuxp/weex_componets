<template>
    <div class="bottom_nav_container">
        <div  v-for="(item,index) in navItems" class="nav-item" @click="navItemOnClick(index)">
            <image class="nav-item-image" :src="item.icon"></image>
            <text class="nav-item-text" :style="item.textColor">{{item.text}}</text>
        </div>
    </div>
</template>

<script>

    export default {
        props: {
            navItems: {default: []},
            selectedIndex: {default: 0},
            web: {default: false},
        },
        data() {
            return {
            }
        },
        methods: {
            navItemOnClick: function (index) {
                this.$emit('bottomNavOnclick',index);
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
        padding-left: 10px;
        padding-right: 10px;
        background-color: #fbfbfb;
        border-top-width: 1px;
        border-top-style:solid ;
        border-top-color: #d5d5d5; ;
    }
    .nav-item {
        flex: 1;
        height: 100px;
        justify-content: center;
        align-items: center;
    }

    .nav-item-image {
        height: 40px;
        width: 40px;
        margin-bottom: 5px;
    }

    .nav-item-text {
        font-size: 26px;
        line-height: 35px;
    }
</style>