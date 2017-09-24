

if (weex.config.env.platform.toLowerCase() === 'web') {

    const qrCode={

        /**
         * zbar扫码
         * @param success
         * @param error
         */
        scanWithZXing:(success=()=>{},error=()=>{})=>{
            console.log("调用扫码模块!,web暂不支持");
        },

        /**
         * 使用zbar扫码
         * @param success
         * @param error
         */
        scanWithZbar:(success=()=>{},error=()=>{})=>{
            console.log("调用扫码模块!,web暂不支持");
        }
    };

    console.log("注册自定义模块 qrcode");
    weex.registerModule('qrcode', qrCode);
}