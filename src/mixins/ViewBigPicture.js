/**
 * 查看大图
 *
 * 默认捕获 ref为 view_big_pictures 的图片控件的src属性
 *
 **/

import {photo} from "../utils/ExportWeexModel";

export default {

    data() {
        return {
            defaultViewBigPictures: []
        }
    },
    methods: {
        /**
         * 查看大图
         * @param src 点击的图片url
         */
        showViewBigPicture(src) {
            let index = this.getImageList(src);
            console.log("index-> " + index);
            if (index <= 0) {
                index = 0;
            }
            photo.showAtlas(
                this.defaultViewBigPictures,
                index,
                () => {
                },
                () => {
                }
            )
        },
        getImageList(targetSrc) {
            let $pictures = this.$refs['view_big_pictures'];
            if ($pictures === undefined || $pictures === null) {
                console.log("ref为 view_big_pictures 的组件未存在!");
                return;
            }
            if ($pictures.constructor !== Array) {
                $pictures = [$pictures];
            }
            let pictures = [];
            let index = -1;
            if (!this.web) {
                $pictures.forEach((item, i) => {
                    let src = item.src;
                    if (src === undefined) {
                        src = item.attr.src;
                    }
                    pictures[i] = src;
                    if (targetSrc === src) {
                        index = i;
                    }
                });
            } else {
                $pictures.forEach((item, i) => {
                    pictures[i] = item.src;
                    if (targetSrc === item.src) {
                        index = i;
                    }
                });
            }
            this.defaultViewBigPictures = pictures;
            console.log("this.defaultViewBigPictures.length-> " + this.defaultViewBigPictures.length);
            return index;
        }

    }
}