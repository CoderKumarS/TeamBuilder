/**
 * @description Deep clone an object
*/
function deepClone(obj) {
    if (typeof obj === 'object' && obj !== null) {
        const clone = Array.isArray(obj) ? [] : {};
        for (const key in obj)
            clone[key] = deepClone(obj[key]);
        return clone;
    }
    return obj;
}

/**
 * @description Deep clone an object with circular references
*/

function deepCloneWithMap(obj, map = new WeakMap()) {
    if (obj === null || typeof obj !== 'object' || typeof obj === 'function') return obj;
    if (map.has(obj)) return map.get(obj);
    if (obj instanceof Date || obj instanceof RegExp || obj instanceof Map || obj instanceof Set)
        return new obj.constructor(obj);

    const clone = Array.isArray(obj) ? [] : {};
    map.set(obj, clone);
    for (const key in obj) clone[key] = deepCloneWithMap(obj[key], map);
    return clone;
}

/**
 * @description Flatten an object
*/

function flattenObject(obj) {
    const result = {};
    for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            const nested = flattenObject(obj[key]);
            for (const nestKey in nested)
                result[key + '.' + nestKey] = nested[nestKey];
        } else {
            result[key] = obj[key];
        }
    }
    return result;
}

function flattenArray(array) {
    const result = [];
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (Array.isArray(element)) {
            const nested = flattenArray(element);
            result.push(...element);
        } else
            result.push(element);
    }
    return result;
}
const obj = {
    name: "Sujal",
    age: 21,
    address: {
        city: "Delhi",
        state: "Delhi"
    },
    s: {
        a: 1,
        b: 2,
        c: {
            d: 3,
            e: 4
        }
    },
    hobbies: ["reading", "coding", "gaming"],
    // func: function () {
    //     console.log("Hello World");
    // },
    // date: new Date(),
    // regex: /^[a-z0-9A-Z]*$/,
    // sym: Symbol("test"),
    // un: undefined,
    // nul: null,
    // bigint: 123n,
    // map: new Map([
    //     ["key1", "value1"],
    //     ["key2", "value2"]
    // ]),
    // set: new Set([
    //     "value1",
    //     "value2"
    // ])
}
const obj2 = {
    name: "Sujal",
    age: 21,
    address: {
        city: "Delhi",
        state: "Delhi"
    },
    s: {
        a: 1,
        b: 2,
        c: {
            d: 3,
            e: 4
        }
    },
    hobbies: ["reading", "coding", "gaming"],
    // func: function () {
    //     console.log("Hello World");
    // },
    // date: new Date(),
    // regex: /^[a-z0-9A-Z]*$/,
    // sym: Symbol("test"),
    // un: undefined,
    // nul: null,
    // bigint: 123n,
    // map: new Map([
    //     ["key1", "value1"],
    //     ["key2", "value2"]
    // ]),
    // set: new Set([
    //     "value1",
    //     "value2"
    // ])
}

function deepCompareObj(obj1, obj2) {
    if (obj1 === obj2) {
        return true;
    }

    if (
        typeof obj1 !== 'object' ||
        typeof obj2 !== 'object' ||
        obj1 === null ||
        obj2 === null
    ) {
        return false;
    }

    let keyOfFirstObject = Object.keys(obj1);
    let keyOfSecondObject = Object.keys(obj2);

    if (keyOfFirstObject.length !== keyOfSecondObject.length)
        return false;
    for (let key of keyOfFirstObject) {
        if (!keyOfSecondObject.includes(key))
            return false;
        if(!deepCompareObj(obj1[key], obj2[key])){
            return false;
        }
    }
    return true;
}
console.log(deepCompareObj(obj, obj2))

const clonedObj = flattenObject(obj);
// console.log(clonedObj);
// clonedObj.func();

function CircularRefdeepCloneWithMap(obj, map = new WeakMap()) {
    if (map.has(obj)) return map.get(obj);
    if (typeof obj === 'object' && obj !== null){
        const clone = Array.isArray(obj) ? [] : {};
        map.set(obj, clone);
        for (const key in obj) clone[key] = deepCloneWithMap(obj[key], map);
        return clone;
    }
    return obj;
}

function CircularRefRemove(obj, seen = new WeakSet()) {
    if (obj !== null && typeof obj === 'object') {
        if (seen.has(obj)) return undefined; // Found a loop
        seen.add(obj);

        const clone = Array.isArray(obj) ? [] : {};
        for (const key in obj) {
            const val = CircularRefRemove(obj[key], seen);
            if (val !== undefined) clone[key] = val;
        }
        return clone;
    }
    return obj;
}
