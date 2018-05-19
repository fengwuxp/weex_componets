import {isWeb, isIphoneX} from "typescript_api_sdk/src/utils/WeexEnvUtil";

const getPageHeight = () => {
    const {env} = weex.config;
    const navHeight = isWeb() ? 0 : (isIphoneX() ? 176 : 132);
    return env.deviceHeight / env.deviceWidth * 750 - navHeight;
};

export {
    getPageHeight
}