Array.prototype.myMap = function(cb){
    const result = [];
    for(let i = 0; i < this.length; i++){
        if(i in this){
            result.push(cb(this[i], i, this));
        }
    }
    return result;
}

Array.prototype.myFilter = function(cb){
    const result = [];
    for(let i = 0; i < this.length; i++){
        if(i in this && cb(this[i], i, this)){
            result.push(this[i]);
        }
    }
    return result;
}

Array.prototype.myReduce = function(cb, initialValue){
    let acc = initialValue;
    let startIndex = 0;

    if(acc == undefined){
        acc = this[0];
        startIndex=1;
    }
    for(let i = startIndex; i < this.length; i++){
        if(i in this){
            acc = cb(acc, this[i], i, this);
        }
    }
    return acc;
}

Array.prototype.myForeach = function(cb){
    for(let i = 0; i < this.length; i++){
        if(i in this)
            cb(this[i], i, this);
    }
}

Array.prototype.myFind = function(cb){
    for(let i = 0; i< this.length; i++){
        if(i in this && cb(this[i], i, this))
            return this[i];
    }
    return undefined;
}

Array.prototype.myFindIndexOf = function(cb){
    for(let i = 0; i< this.length; i++){
        if(i in this && cb(this[i], i, this))
            return i;
    }
    return undefined;
}

Array.prototype.mySome = function(cb){
    for(let i = 0; i< this.length; i++){
        if(i in this && cb(this[i], i, this))
            return true;
    }
    return false;
}

Array.prototype.myEvery = function(cb){
    for(let i = 0; i< this.length; i++){
        if(i in this && !cb(this[i], i, this))
            return false;
    }
    return true;
}

Array.prototype.myFlat = function(depth = 1){
    const result = [];
    function flatten(arr, d){
        for(let i = 0; i< arr.length; i++){
            if(i in this){
                const val = arr[i];
                if(Array.isArray(val) && d > 0){
                    flatten(val, d-1);
                }else{
                    result.push(val);
                }
            }
        }
    }
    flatten(this, depth);
    return result;
}

Array.prototype.myFlatRec = function(depth = 1){
    const stack =[];
    for(let i = this.length-1; i >= 0; i--){
        if(i in this)
            stack.push([this[i], depth - 1]);
    }
    const result = [];
    while(stack.length){
        const [currVal, currDepth] = stack.pop();
        if(Array.isArray(currVal) && currDepth > 0 )
            stack.push([currVal, currDepth -1])
        else
            result.push(currVal);
    }
    return result.reverse();
}

Array.prototype.myFlatMap = function(cb){
    const result = [];
    for(let i = 0; i < this.length; i++){
        if(i in this){
            const val = cb(this[i], i, this);
            if(Array.isArray(val))
                result.push(...val);
            else
                result.push(val);
        }
    }
    return result;
}
const arr = [1, 2, 3, 4, 5]
let ans = arr.myMap(e => e * 2);
console.log(ans);
ans = arr.myFilter(e => e % 2 === 0);
console.log(ans);
