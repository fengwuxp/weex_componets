/**
 * 生成guid
 */
export default class UUIDUtil {

    public static guid = (radix: number = 16): string => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(radix);
        });
    }
}
