import {weexModule} from "typescript_api_sdk/src/utils/ExportWeexSdkModel.js";


/**
 * 自定义wheel picker
 */
if (weexModule.config.env.platform.toLowerCase() === 'web') {
    let Vue = window['Vue'];
    const VuePicker = require("../components/picker/picker.vue");

    const wheelPicker = {

        /**
         * 显示选择器
         * @param {string} param  {startIndex:0,endIndex:10,startDates:["item_1","item_2"]}
         * @param {() => any} callback
         */
        showPicker(param: string, callback = (result: any) => {
        }) {
            let {startIndex, endIndex, startDates} = JSON.parse(param);
            let items = [];
            startDates.forEach((item, i) => {
                items.push({
                    text: item.toString(),
                    value: i
                })
            });
            //console.log(items)
            let selectData: any = {
                columns: 1, // picker的列数
                // 第一列的数据结构
                pData1: items,
                link: false
            };

            const component = new Vue({
                render(h) {
                    return h(VuePicker, {
                        props: {
                            show: true,
                            selectData
                        },
                        on: {
                            cancel() {
                            },
                            confirm(select) {
                                const {select1, select2} = select;
                                callback({
                                    result: "success",
                                    data: {
                                        startIndex: select1.value,
                                        endIndex: select2 ? null : select2.value
                                    }
                                });
                            }
                        }
                    }, []);
                },

            }).$mount();
            document.body.children[0].appendChild(component.$el);
        }
    };
    console.log("注册自定义模块 wheelPicker");
    weexModule.registerModule('wheelPicker', wheelPicker);
}