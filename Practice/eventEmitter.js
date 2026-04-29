class MyEventEmitter {
    constructor() {
        this.eventListener = {}
    }
    emit(eventName, ...args) {
        if (!this.eventListener[eventName]) return false;
        const listeners = this.eventListener[eventName];
        listeners.forEach(listener => listener(...args));
        return true;
    }
    on(eventName, cb) {
        if (!this.eventListener[eventName])
            this.eventListener[eventName] = [];
        this.eventListener[eventName].push(cb);
        return true;
    }
    off(eventName, cb) {
        if (!this.eventListener[eventName]) return false;
        // this.eventListener[eventName] = this.eventListener[eventName].filter(fn => fn !== cb);
        const index = this.eventListener[eventName].indexOf(cb);
        this.eventListener[eventName].splice(index, 1);
        return true;
    }
    once(eventName, cb) {
        const wrappedFn = (...args) => {
            cb(...args);
            this.off(eventName, wrappedFn);
        }
        this.on(eventName, wrappedFn);
        return true;
    }
}


// Example usage:
const myEmitter = new MyEventEmitter();

// Define a listener function
function handleData(data) {
    console.log("Data received:", data);
}

// Register the listener
myEmitter.on("dataReceived", handleData);

// Emit the event
myEmitter.emit("dataReceived", { message: "Hello World" });

// Add a listener that runs only once
myEmitter.once("onceEvent", () => {
    console.log("This will only run once");
});

myEmitter.emit("onceEvent");
myEmitter.emit("onceEvent");

// Remove a listener
myEmitter.off("dataReceived", handleData);
myEmitter.emit("dataReceived", { message: "Hello World" });

