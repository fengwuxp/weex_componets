

import {Enum} from "./Enum";

class TestStatus{

    public static readonly CANCEL:Enum={
        name:"CANCEL",
        ordinal:0,
        desc:"张三"
    }
}
console.log(TestStatus);
console.log(TestStatus.CANCEL);