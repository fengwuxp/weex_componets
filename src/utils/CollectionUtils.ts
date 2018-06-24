/**
 * 集合相关utils
 */
export default class CollectionUtils {

    /**
     * 从数组中移除一个元素
     * @param {Array<any>} list
     * @param obj
     * @param {string} equalsKey
     */
    public static removeToArray = (list: Array<any>, obj: any, equalsKey = 'key') => {

        let index = -1;
        let b = list.some((item, i) => {

            index = i;
            return item[equalsKey] === obj[equalsKey];
        });

        if (b) {
            list.splice(index, 1);
        }

    }
}
