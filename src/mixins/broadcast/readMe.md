
##### 广播模块

       RegisterBroadcast使用
       
         export default{
             props:{
             onMessage:{
                default:{
                   //事件类型
                   selected: {
                         //事件名称  以及接收到事件的处理
                          member_receive(data) {
                                     this.receive = data;
                            }
                       },
                      refresh: {
                         member_receive(data) {
                         if (commonUtils.isNullOrUndefined(this.receive)) {
                                 return;
                         }
                                            if (typeof data === "string") {
                                                data = JSON.parse(data);
                                            }
                                            const {id, deleted} = data;
                                            if (deleted && this.receive.id.toString() === id.toString()) {
                                                console.log("-----member_receive--->")
                                                this.receive = null;
                                            }
                                        }
                                    }
                                }
                }
             }
             }
         }
       
       
       
       
       
       SendBroadcast
       
        export default{
        
           props:{
                         /**
                          * 发送广播的定义
                          */                    
                         sendMessage: {
                             default: {
                               //事件类型
                                 refresh: {
                                   //事件名称 如果这个值为函数则返回在Vue中调用的函数名称，为其他值则调用函数名称为 事件类型+"_"+事件名称
                                     member_receive: () => {
                                         return "sendUpdateBroadcast"
                                     }
                                 }
                             }
                         },
           }
        }
        
        如 this.sendUpdateBroadcast({}) 或 this.refresh_member_receive({});
