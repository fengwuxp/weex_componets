export interface Config {
    /**
     * 协议前缀 http/https
     */
    SCHEMA_PREFIX: string;

    /**
     * 根域名
     */
    ROOT_DOMAIN: string;


    /**
     * 图片服务域名
     * @type {string}
     */
    PIC_SERVICE_DOMAIN: string;

    /**
     * 图片服务地址
     * @type {string}
     */
    PIC_SERVICE_URL: string;


    /**
     *基础域名
     */
    BASE_DOMAIN: string


    /**
     * 请求api的域名
     */
    API_BASE_URL: string;


    /**
     * 客户端id
     * @dataType {string}
     */
    CLIENT_ID: string;

    /**
     * 客户端秘钥
     * @dataType {string}
     */
    CLIENT_SECRET: string;

    //为了方便在本地开发是使用远程的接口
    GLOBAL_USER_DATA_TYPE_JSONP: Boolean;     //开发环境使用远程接口,正式环境使用同域名下的接口 __DEV__

    /**
     * 不需要登陆的url配置
     */
    NO_LOGIN_URL_MAP: any;

    /**
     * WEB 部署目录
     */
    WEB_DEPLOYMENT_DIRECTORY:string;

    /**
     * app-footer头部配置
     */
    APP_HEADER_CONFIG:any;

    /**
     * app-footer 配置
     */
    APP_FOOTER_CONFIG:any;


    /**
     * ios项目名称，在切换远程和本地js是需要用来判别是否是从本地的目录加载的一个标识
     */
    IOS_PROJECT_NAME:string

}