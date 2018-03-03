<!--加载结束提示，必须配合list 组件使用-->
<template>
    <cell v-if="queryEnd" class="no_data">
        <image v-if="notDataIcon && resultSize===0" :src="notDataIcon" :style="imageStyle"></image>
        <text v-if="resultSize>0" :style="textStyle">{{noMoreTip}}</text>
        <text v-if="resultSize===0" :style="noDataStyle">{{noDataTip}}</text>
    </cell>
</template>
<script>
    export default {
        props: {
            queryEnd: {default: false},
            resultSize: {default: 0},
            noMoreTip: {default: "没有更多数据了"},
            noDataTip: {default: "暂无数据"},
            notDataIcon: {defualt: ""},
            textStyle: {
                default: {
                    fontSize: "30px",
                    color: "#999999",
                    marginTop: "25px",
                    marginBottom: "25px"
                }
            },
            noDataMargin: {
                default: 70
            },
            imageStyle: {
                default: {
                    width: "200px",
                    height: "200px",
                    marginTop:"50px"
                }
            }
        },
        data() {
            return {
                noDataStyle: {}
            }
        },
        created() {
            this.noDataStyle = Object.assign({}, this.textStyle, {marginTop: this.noDataMargin + "px"});
        }
    }
</script>
<style scoped>
    .no_data {
        justify-content: center;
        align-items: center;
    }
</style>