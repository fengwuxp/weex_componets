/**
 * Created by wuxp on 2017/5/26.
 */

const promisePrototype = Promise.prototype as any;
/**
 * Promise对象的回调链，不管以then方法或catch方法结尾，要是最后一个方法抛出错误，
 * 都有可能无法捕捉到（因为Promise内部的错误不会冒泡到全局）。因此，我们可以提供一个done方法，总是处于回调链的尾端，保证抛出任何可能出现的错误。
 * @param onFulfilled
 * @param onRejected
 */
promisePrototype.done = function (onFulfilled, onRejected) {
    this.then(onFulfilled, onRejected)
        .catch(function (reason) {
            // 抛出一个全局错误
            setTimeout(() => {
                throw reason
            }, 0);
        });
};

/**
 * finally方法用于指定不管Promise对象最后状态如何，都会执行的操作。它与done方法的最大区别，它接受一个普通的回调函数作为参数，该函数不管怎样都必须执行。
 * @param callback
 * @return {Promise<TResult>|PromiseLike<TResult>|Promise<T>|PromiseLike<TResult|T>|PromiseLike<TResult2|TResult1>|Promise<TResult|T>|any}
 */
promisePrototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(
        value => P.resolve(callback(value)).then(() => value),
        reason => P.resolve(callback(reason)).then(() => {
            throw reason
        })
    );
};