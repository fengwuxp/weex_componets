/**
 * Created by wuxp on 2017/6/5.
 */


export default {
    data(){
        const buttonMap = {};
       // console.log(buttonMap);
        return {
            buttonMap
        }
    },
    methods: {
        buttonIsLock(buttonKey, minInterval = 1000){
            //按钮是否被锁定的了
            //buttonKey 按钮的key (key是可以对应一组按钮);
            //minInterval 间隔时长 默认1000毫秒
            //buttonKey={buttonKey};
            //console.log("初始化数据 key "+JSON.stringify(buttonKey));
           // console.log(this.buttonMap);
            if (this.buttonMap[buttonKey]===undefined) {
                console.log("初始化数据 key "+JSON.stringify(buttonKey));
                this.buttonMap[buttonKey]= {
                    style: {},
                    lastClickTime: 0
                };
            }

            let time = new Date().getTime();
            let button = this.buttonMap[buttonKey];
            if (time <= button.lastClickTime + minInterval) {
                console.log("这个按钮被锁定了!");
                return true;
            }

            button.lastClickTime = time;
            this.buttonMap[buttonKey]=button;
            return false;
        },
    }
}