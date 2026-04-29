type TPromiseResolve<T> = (value: T) => void;
type TPromiseReject<T> = (reason: T) => void;
type TPromiseExecutor<T, K> = (resolve: TPromiseResolve<T>, reject: TPromiseReject<K>) => void;
type TPromiseThenCallBack<T> = (value: T | undefined) => void;
type TPromiseCatchCallBack<K> = (reason: K | undefined) => void;
type TPromiseFinallyCallBack = () => void;

enum PromiseState {
    PENDING = 'pending',
    FULFILLED = 'fulfilled',
    REJECTED = 'rejected'
}

class myPromise<T, K> {
    private _state = PromiseState.PENDING;
    private _successCallbackHandlers: TPromiseThenCallBack<T>[] = [];
    private _failureCallbackHandlers: TPromiseCatchCallBack<K>[] = [];
    private _finallyCallbackHandlers: TPromiseFinallyCallBack | undefined = undefined;
    private _value: T | undefined = undefined;
    private _reason: K | undefined = undefined;

    constructor(executor: TPromiseExecutor<T, K>) {
        executor(
            this._promiseResolver.bind(this),
            this._promiseRejector.bind(this)
        );
    }
    public then(handlerFn: TPromiseThenCallBack<T>) {
        if (this._state === PromiseState.FULFILLED) {
            handlerFn(this._value);
        } else {
            this._successCallbackHandlers.push(handlerFn);
        }
        return this;
    }
    
    public catch(handlerFn: TPromiseCatchCallBack<K>) {
        if (this._state === PromiseState.REJECTED)
            handlerFn(this._reason);
        else
            this._failureCallbackHandlers.push(handlerFn);

        return this;
    }

    public finally(handlerFn: TPromiseFinallyCallBack) {
        if (this._state !== PromiseState.PENDING) return handlerFn();
        this._finallyCallbackHandlers = handlerFn;
        return this;
    }

    private _promiseResolver(value: T) {
        if (this._state === PromiseState.FULFILLED) return;
        this._state = PromiseState.FULFILLED;
        this._value = value
        this._successCallbackHandlers.forEach(cb => cb(value));
        if (this._finallyCallbackHandlers)
            this._finallyCallbackHandlers();
    }
    private _promiseRejector(reason: K) {
        if (this._state === PromiseState.REJECTED) return;
        this._state = PromiseState.REJECTED;
        this._reason = reason;
        this._failureCallbackHandlers.forEach(cb => cb(reason));
        if (this._finallyCallbackHandlers)
            this._finallyCallbackHandlers();
    }
}