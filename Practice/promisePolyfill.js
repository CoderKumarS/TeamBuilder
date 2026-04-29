const STATUS = {
	FULFILLED: "fulfilled",
	REJECTED: "rejected",
	PENDING: "pending"
}
class MyPromise {
	#value = ""; 			// these are private
	#state = STATUS.PENDING;
	#thenCbs = [];
	#catchCbs = [];

	constructor(callback) {
		try {
			// Using .bind or arrow functions ensures 'this' context
			callback(this.#onSuccess, this.#onFail);
		} catch (error) {
			this.#onFail(error);
		}
	};

	#runCallbacks = () => {
		queueMicrotask(() => {
			if (this.#state == STATUS.PENDING) return;

			if (this.#state == STATUS.FULFILLED) {
				this.#thenCbs.forEach((cb) => {
					cb(this.#value);
				});

				this.#thenCbs = []; // in case multiple then calls reset previous
			}
			if (this.#state == STATUS.REJECTED) {
				this.#catchCbs.forEach((cb) => {
					cb(this.#value);
				});

				this.#catchCbs = []; // in case multiple catch calls reset previous
			}
		});
	};

	// resolve
	#onSuccess = (value) => {
		if (this.#state !== STATUS.PENDING) return;
		this.#value = value;
		this.#state = STATUS.FULFILLED;

		this.#runCallbacks();
	}

	// reject
	#onFail = (value) => {
		if (this.#state !== STATUS.PENDING) return;

		if (!this.#catchCbs.length) {
			throw new Error("Uncaught Promise Error");
		}

		this.#value = value;
		this.#state = STATUS.REJECTED;

		this.#runCallbacks();
	}
	//second option using then in catch
	then = (thenCb, catchCb) => {
		return new MyPromise((resolve, reject) => {
			this.#thenCbs.push((value) => {
				if (thenCb == null) {
					resolve(value);
					return;
				}
				const res = thenCb(value);
				resolve(res);
			});
			this.#catchCbs.push((result) => {
				if (catchCb == null) {
					reject(result);
					return;
				}
				resolve(catchCb(result));
			});

		});
	};

	catch = (catchCb) => {
		return this.then(undefined, catchCb);
	}

	static resolve = (data) => {
		return new MyPromise(function (resolve) {
			resolve(data);
		});
	};

	static reject = (data) => {
		return new MyPromise(function (_, resolve) {
			reject(data);
		});
	};
}
const STATE = {
	PENDING: "pending",
	FULFILLED: "fulfilled",
	REJECTED: "rejected"
};

class MyPromise2 {
	constructor(executor) {
		this.state = STATE.PENDING;
		this.value = undefined;
		this.thenCbs = [];
		this.catchCbs = [];

		const resolve = (value) => {
			if (this.state !== STATE.PENDING) return;

			if (value instanceof MyPromise) {
				return value.then(resolve, reject);
			}

			this.state = STATE.FULFILLED;
			this.value = value;
			this.runCallbacks();
		};

		const reject = (reason) => {
			if (this.state !== STATE.PENDING) return;

			this.state = STATE.REJECTED;
			this.value = reason;
			this.runCallbacks();
		};

		try {
			executor(resolve, reject);
		} catch (err) {
			reject(err);
		}
	}

	runCallbacks() {
		queueMicrotask(() => {
			if (this.state === STATE.FULFILLED) {
				this.thenCbs.forEach(cb => cb(this.value));
				this.thenCbs = [];
			}

			if (this.state === STATE.REJECTED) {
				this.catchCbs.forEach(cb => cb(this.value));
				this.catchCbs = [];
			}
		});
	}

	then(onFulfilled, onRejected) {
		return new MyPromise((resolve, reject) => {

			this.thenCbs.push((value) => {
				try {
					if (!onFulfilled) {
						resolve(value);
						return;
					}

					const result = onFulfilled(value);

					if (result instanceof MyPromise) {
						result.then(resolve, reject);
					} else {
						resolve(result);
					}
				} catch (err) {
					reject(err);
				}
			});

			this.catchCbs.push((value) => {
				try {
					if (!onRejected) {
						reject(value);
						return;
					}

					const result = onRejected(value);

					if (result instanceof MyPromise) {
						result.then(resolve, reject);
					} else {
						resolve(result);
					}
				} catch (err) {
					reject(err);
				}
			});

			this.runCallbacks();
		});
	}

	catch(onRejected) {
		return this.then(null, onRejected);
	}

	finally(cb) {
		return this.then(
			(val) => MyPromise.resolve(cb()).then(() => val),
			(err) => MyPromise.resolve(cb()).then(() => { throw err; })
		);
	}

	static resolve(value) {
		return new MyPromise((res) => res(value));
	}

	static reject(reason) {
		return new MyPromise((_, rej) => rej(reason));
	}
}

//first option declaring both seprate
/**
then = (cb, errCb) => {
	this.#thenCbs.push(cb);
	
	if(errCb){
		this.#catchCbs(errCb); //we can pass two arguments in then first for success and second for error instead of .catch()
	}
	
	this.#runCallbacks(); //in case resolve is directly invoked
};
	
catch = (cb) => {
	this.#catchCbs.push(cb);
	
	this.#runCallbacks();//in case reject is directly invoked
};
*/

class PromiseFlavour {
	all(promises) {
		return new Promise((resolve, reject) => {
			const result = [];
			let completed = 0;
			if (promises.length === 0) resolve([]);
			promises.forEach((promise, index) => {
				Promise.resolve(promise)
					.then((value) => {
						result[index] = value
						completed++;
						if (completed === promises.length) {
							resolve(result);
						}
					})
					.catch(reject)
			})
		})
	}

	allSettled(promises) {
		return new Promise((resolve, reject) => {
			const result = [];
			let count = 0;
			if (promises.length === 0) resolve([]);
			promises.forEach((promise, index) => {
				Promise.resolve(promise)
					.then((value) => {
						result[index] = {
							status: 'fulfilled',
							value
						}
					})
					.catch((reason) => {
						result[index] = {
							status: 'rejected',
							reason
						}
					})
					.finally(() => {
						count++;
						if (count === promises.length) {
							resolve(result);
						}
					})
			})
		})
	}

	any(promises) {
		return new Promise((resolve, reject) => {
			let count = 0;
			const errors = [];
			if (promises.length === 0) resolve([]);
			promises.forEach((promise, index) => {
				Promise.resolve(promise)
					.then(resolve)
					.catch((err) => {
						errors[index] = err;
						count++;
						if (count === promises.length) {
							reject(new AggregateError(errors, 'All promises were rejected'));
						}
					})
			})
		})
	}

	race(promises) {
		return new Promise((resolve, reject) => {
			promises.forEach(promise => {
				Promise.resolve(promise).then(resolve).catch(reject);
			})
		})
	}

	retry(fn, limit) {
		return new Promise((resolve, reject) => {
			function attempt(count) {
				fn()
					.then(resolve)
					.catch((err) => {
						if (count === 0)
							reject(err);
						else
							attempt(count - 1);
					})
			}
			attempt(limit);
		})
	}
}