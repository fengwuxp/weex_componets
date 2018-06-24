/**
 *
 * @author wxup
 * @create 2018-06-24 14:51
 **/

export default {
    pageItems: {
        default: []
    },

    /**
     * 默认选中的视图
     **/
    defaultViewIndex: {
        default: 0
    },

    /**
     * 导航item选中颜色
     **/
    itemSelectedColor: {
        default: "#66af3d"
    },
    /**
     * 导航item默认颜色
     **/
    itemDefaultColor: {
        default: "#929292"
    },
    /**
     * 导航栏样式
     **/
    navItemContainerStyle: {
        default() {
            return {
                backgroundColor: "#ffffff",
                height: "100px",
                borderWidth: "1px",
                borderColor: "#e6e6e6",
                borderStyle: "sloid"
            };
        }
    },
    /**
     * 导航栏背景图
     **/
    navItemBgImage: {
        default: ""
    },
    /**
     * 导航栏背景图样式
     **/
    navItemBgImageStyle: {
        default: {
            height: "100px",
            top: "0"
        }
    },
    /**
     * 居中iconStyle
     **/
    centerIconStyle: {
        default: {
            height: "120px",
            width: "120px",
            position: "absolute",
            left: "315px",
            bottom: 15
        }
    },

    /**
     * 导航项样式
     **/
    navItemStyle: {
        default: {}
    },
    /**
     * 导航图片样式
     **/
    navIconStyle: {
        default: {
            height: "40px",
            width: "40px",
            marginBottom: "9px"
        }
    },
    numberIconStyle: {
        default: {
            right: "48px",
            top: "-8px"
        }
    },
    /**
     * 获取导航icon的方法
     **/
    getNavIcon: {
        default: function () {
            return (icon, isSelected) => {
                icon = icon.replace("nav/activate_", "nav/");
                if (isSelected) {
                    return icon.replace("nav/", "nav/activate_");
                } else {
                    return icon;
                }
            }
        }
    }
}
