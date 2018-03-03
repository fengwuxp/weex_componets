/**
 * 当广播的category 和 eventName由外部调用者传入时的参数名称
 * @type {string}
 */
const R_CATEGORY: string = "R_CATEGORY";

const R_EVENT_NAME: string = "R_EVENT_NAME";


/**
 * 广播结果
 * @param {any} data  发送的数据
 * @param {boolean} isSuccess 结果是否成功
 * @param {string} message    结果消息
 */
// const broadcastIsSuccess=(data:any,isSuccess:boolean=true,message="")=>{
//
//     return {
//         data,
//         success:isSuccess,
//         message
//     }
// };

export {
    R_CATEGORY,
    R_EVENT_NAME,

}