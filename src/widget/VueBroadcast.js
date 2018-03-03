/**
 * broadcast
 */
const broadcast = weex.requireModule('broadcast');
const Broadcast = Object.create(null);

Broadcast.install = (Vue, options) => {
    Vue.prototype.$broadcast = {
        // 扫一扫
        register(params) {
            broadcast.register(...params);
        },
        send(params) {
            broadcast.send(...params);
        }
    }
};

Vue.use(Broadcast);
