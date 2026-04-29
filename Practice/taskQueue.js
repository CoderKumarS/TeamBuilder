class taskQueue {
    constructor(limit) {
        this.limit = limit;
        this.queue = [];
        this.count = 0;
    }
    add(task) {
        return new Promise((resolve, reject) => {
            const temp = { task, resolve, reject };
            this.queue.push(temp);
            this.run();
        })
    }
    run() {
        while(this.queue.length && this.count < this.limit) {
            const { task, resolve, reject } = this.queue.shift();
            this.count++;
            task()
                .then(resolve)
                .catch(reject)
                .finally(() => {
                    this.count--;
                    this.run();
                });
        }

    }
}


class taskScheduler{
    constructor(limit){
        this.limit = limit
        this.queue = [];
        this.count = 0;
    }
    add(task){
        return new Promise((resolve, reject) => {
            this.queue.push({task, resolve, reject});
            this.run();
        })
    }
    run(){
        while(this.queue.length && this.count < this.limit){
            const {task, resolve, reject} = this.queue.shift();
            this.count++;
            task()
            .then(resolve)
            .catch(reject)
            .finally(()=>{
                this.count--;
                this.run();
            })
        }
    }
}
const task = (id, time) => () =>
    new Promise(r => {
        console.log("start", id);
        setTimeout(() => {
            console.log("end", id);
            r(id);
        }, time);
    });

const scheduler = new taskScheduler(2);

scheduler.add(task(1, 2000)).then(console.log);
scheduler.add(task(2, 1000)).then(console.log);
scheduler.add(task(3, 1500)).then(console.log);
scheduler.add(task(4, 500)).then(console.log);