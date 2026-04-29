class TaskScheduler {
    constructor(concurrency) {
        this.concurrency = concurrency;
        this.runningTask = 0;
        this.waititngQueue = [];
    }
    getNextTask(){
        if(this.runningTask < this.concurrency && this.waititngQueue.length > 0){
            const nextTask = this.waititngQueue.shift();
            nextTask();
        }
    }
    addTask(task){
        return new Promise((resolve, reject) => {
            async function taskRunner() {
                this.runningTask += 1;
                try {
                    const result  = await task();
                    console.log(result);
                    resolve(result);
                } catch (error) {
                    console.log('error', error);
                    reject(error);
                } finally {
                    this.runningTask -= 1;
                    this.getNextTask();
                }
            }
            if (this.runningTask < this.concurrency) {
                taskRunner.call(this);
            } else {
                this.waititngQueue.push(tasRunner.bind(this));
            }
        })
    }
}