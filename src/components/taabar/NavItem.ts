import {NavItemType} from "./NavItemType";
import {NavShowType} from "./NavShowType";

/**
 * 导航item配置
 */
export interface NavItem {

    /**
     * 导航item 文本
     */
    text?: string;

    /**
     * 导航item图标
     */
    icon: string;

    /**
     * 导航目标js URL
     */
    url?: string;

    /**
     * 导航显示类型
     */
    showType?: NavShowType,

    /**
     * 导航item 目标类型
     */
    targetType: NavItemType;

    /**
     * 导航上显示的标记数量
     */
    number?: number;

}