<template>
    <div class="footer">
        <text class="copyright">{{copyright}}</text>
    </div>
</template>

<script>
    import  GlobalApiConfig from "../../api/config/GlobalAipConfig";
    const appHeaderConfig = GlobalApiConfig.APP_FOOTER_CONFIG;
    //©Coryright福州华威菜多多电子商务有限公司
    export default{
        name:"app-footer",
        data(){
            return appHeaderConfig.data;
        },
        methods: {}
    }
</script>

<style scoped>
    .footer {
        align-items: center;
        padding-top: 25px;
        padding-bottom: 25px;
        background-color: #f2f2f2;
    }
    .copyright{
        font-size: 28px;
        color: #999999;
        text-align: center;
    }
</style>