<template>
    <div :style="style">
        <text class="copyright">©Coryright {{copyright}}</text>
    </div>
</template>

<script>
    import  GlobalApiConfig from "../../api/config/GlobalAipConfig";
    const appHeaderConfig = GlobalApiConfig.APP_FOOTER_CONFIG;
    export default{
        props:{
            style: {
                default:{
                    height:"83px",
                    alignItems: "center",
                    paddingTop: "25px",
                    paddingBottom: "25px",
                    backgroundColor: "#ededed"
                }
            }
        },
        name:"app-footer",
        data(){
            return appHeaderConfig.data;
        },
        methods: {}
    }
</script>

<style scoped>
    .copyright{
        font-size: 28px;
        color: #999999;
        text-align: center;
    }
</style>