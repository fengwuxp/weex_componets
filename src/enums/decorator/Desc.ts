/**
 * Created by wuxp on 2017/5/16.
 */

export default function Desc(desc: string) {
    return function (target: any, key: string) {
        let prop = key + "Desc";
        target[prop] = desc;
    }
}