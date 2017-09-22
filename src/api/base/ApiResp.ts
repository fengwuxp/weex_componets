/**
 * Created by wuxp on 2017/5/4.
 * 统一下响应对象
 */
export abstract class ApiResp<T> {

    private readonly code: number = 0  ;

    private readonly message: String = "操作成功";

    private readonly detailMessage: String;

    private readonly data: T;
}
