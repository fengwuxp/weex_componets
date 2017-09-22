/**
 * 获取路径
 * 支持相对地址和绝对地址的写法
 * Created by wuxp on 2017/6/4.
 */
class WeexGetPathUtils {


    constructor() {
    }

    /**
     * 获取native 下的go to url
     * @param targetURL
     * @param weex
     * @return {string}
     */
    getNativeGoToURL = (targetURL: string, weex: any) => {

        const bundleUrl = weex.config.bundleUrl;

        const array = bundleUrl.split("://");  //分割bundleUrl
        let path = array.pop();                //弹出最后一个url
        let root = array.join("://") + "://";  //根路径

        return this.getTargetURL(targetURL, root, path);
    }

    /**
     * 获取 web下的go to url
     * @param targetURL
     * @param weex
     * @return {string}
     */
    getWebGoToURL = (targetURL: string, weex: any) => {
        const bundleUrl = window.location.href;
        const urls = bundleUrl.split("#");
        const root = urls[0];
        let path = urls[1];
        return this.getTargetURL(targetURL, root, path);
    };

    private getTargetURL(targetURL: string, root: string, path: string) {
        let newURL = "";
        if (targetURL.indexOf("/") === 0) {
            //是否为根路径
            newURL = root + targetURL;
        } else {
            if (path === "") {
                path = "/"
            }

            let s = path.split("?")[0].split("/");
            s.pop();   //强制移除数组最后一个元素
            let array = targetURL.split("/");
            array.forEach((item, index) => {
                if (item.trim() === "..") {
                    s.pop();
                } else {
                    s.push(item);
                }
            });
            newURL = root + s.join("/");
        }
        return newURL;
    }
}

export  default new WeexGetPathUtils();