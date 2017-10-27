/**
 * 自定义common 模块
 */
if (weex.config.env.platform.toLowerCase() === 'web') {
    const commonModal = {
        /**
         * 打开第三方应用
         * @param packageName 包名：ios则是schemes,并且需要提前配置白名单
         * @param downloadURL 对方应用下载地址
         * @param succ
         * @param fail
         */
        openApp(packageName, downloadURL, succ = () => {
        }, fail = () => {
        }) {
            console.log("web环境暂不支持 openApp");
        },
        /**
         * 获取客户端版本信息
         * Map<String,Object> map= new HashMap<String, Object>();
         * map.put("versionName",versionName);
         * map.put("versionCode",versionCode);
         * map.put("packageName",getPackageName());
         * @param succ
         * @param fail
         */
        getAppVersionInfo(succ = () => {
        }, fail = () => {
        }) {
            console.log("web环境暂不支持 getAppVersionInfo");
        },

        /**
         * 设置页面激活回调
         * @param callback
         */
        setOnActCallback(callback=()=>{}){
            console.log("web环境暂不支持 setOnActCallback");
        },



        /**
         * 设置安卓顶部状态栏背景色
         * @param color
         */
        // setGlobalTopStatusBar(color){
        //     console.log("仅支持android环境!");
        // }


    };
    console.log("注册自定义模块 common");
    weex.registerModule('common', commonModal);
}