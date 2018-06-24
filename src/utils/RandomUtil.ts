/**
 * 纯数字的数组
 * @type {number[]}
 */
const RANDOM_NUMBER_ARRAY: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

/**
 * 纯字母的数组
 * @type {string[]}
 */
const RANDOM_ALPHABETIC_ARRAY: Array<string> = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

/**
 * 生成随机字符串
 * @param {Array<string>} datPool 数据池
 * @param {number} count  生成的个数
 * @return {string}
 */
const randomStrByDataPool = (datPool: Array<string | number>, count: number): string => {
    let result: Array<any> = [];
    let max: number = datPool.length;
    for (; count--; count > 0) {
        //如果index小于0 则从数组的最后开始获取数据
        let index: number = RandomUtil.nextInt(max) - 1;
        console.log(index);
        result.push(datPool[index]);
    }
    return result.join("");
};

export {
    randomStrByDataPool
}

/**
 * 随机工具类
 */
export default class RandomUtil {

    /**
     * 生成一个随机的字符串串,包括数数字和字母
     * @param {number} count
     * @return {string}
     */
    public static randomAlphabetic = (count: number = 0): string => {
        return randomStrByDataPool([...RANDOM_NUMBER_ARRAY, ...RANDOM_ALPHABETIC_ARRAY], count)

    };

    /**
     * 生成一个纯数字的字符串
     * @param {number} count
     * @return {string}
     */
    public static randomNumberStr = (count: number = 0): string => {
        return randomStrByDataPool(RANDOM_NUMBER_ARRAY, count)
    };

    /**
     * 生成一个随机的数值 (0-max)
     * @param {number} max
     * @return {number}
     */
    public static nextInt = (max: number): number => {
        return RandomUtil.nextIntRange(max);

    };

    /**
     * 生成某个范围内的随机数
     * @param {number} max
     * @param {number} min
     * @return {number}
     */
    public static nextIntRange = (max: number, min: number = 0): number => {
        return Math.round(Math.random() * (max - min)) + min;
    }
}
