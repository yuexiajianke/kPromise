class kPromise {

    static PENDING = 'PENDING'
    static RESOLVE = 'RESOLVE'
    static REJECT = 'REJECT'

    constructor (handler) {
        if (typeof handler !== 'function') {
            throw new TypeError('xx')
        }

        this.resolvedQueues = []
        this.rejectedQueues = []

        handler(this._resolve.bind(this), this._reject.bind(this))
    }

    _resolve () {
        window.addEventListener('message', _=> {
            if (this.status !== kPromise.PENDING) return
            this.status = kPromise.RESOLVE
        })
    }
    _reject () {

        window.addEventListener('message', _=> {
            if (this.status !== kPromise.PENDING) return
            this.status = kPromise.REJECT

            let handler
            while ( handler = this.rejectedQueues.shift() ) {
                handler()
            }
        })
        window.postMessage('')

    }
    then (resolvedHandler, rejectedHander) {

        return new kPromise((resolve, reject) => {
            function newResolvedHandler () {
                let result = resolvedHandler()
                
                if (result instanceof kPromise) {
                    result.then(resolve, reject)
                } else {
                    resolve(result)
                }
                resolve(result)
            }
            function newRejectedHandler () {
                let result = rejectedHander()
                reject(result)
            }

            this.resolvedQueues.push(newResolvedHandler)
            this.rejectedQueues.push(newRejectedHandler)
        })

    
    }
}