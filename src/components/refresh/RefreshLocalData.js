/*
* 刷新本地数据
* */

export default {

    methods: {
        /**
         * 刷新本地数据
         * @param data
         * @param list
         * @param handler 数据处理
         * @return {*}
         */
        refreshLocalData(data, list, handler) {
            let index = -1;
            list.some((item, i) => {
                if (item.id === data.id) {
                    //找到要刷新的记录
                    index = i;
                    return true;
                }
                return false;
            });

            console.log("需要更新的位置->: "+index);
            if (index === -1) {
                return;
            }

            if (typeof handler === "function") { //数据处理
                //传入的处理者
                list = handler(data);
            } else {
                //默认使用刷新策略
                list[index] = data;
            }

            return Object.assign([], list);
        }
    }
}