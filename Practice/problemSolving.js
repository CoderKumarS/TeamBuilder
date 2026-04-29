/**
 * @description  Remove duplicates from the array.
*/
function removeDuplicate(array){
    const helperSet = new Set();
    for(let i = 0; i < array.length; i++){
        helperSet.add(array[i]);
    }
    return [...helperSet];
}

function removeDuplicateWithIncludes(array){
    const result = [];
    for (let index = 0; index < array.length; index++) {
        if(!result.includes(array[i]))
            result.push(array[i]);
    }
    return result;
}
/**
 * @description Find the second largest number in the array.
*/

function secondLargest(array){
    let largest = -Infinity, secondLargest= -Infinity;
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if(element > largest){
            secondLargest = largest;
            largest = element;
        }
        else if(element > secondLargest && element !== largest)
            secondLargest = element;
    }
    return secondLargest;
}

function secondLargestWithSort(array){
    const helper = [...array].sort((a, b) => b - a );
    return helper[1];
}

/**
 * @description Rotate an array by k steps.
*/

function rotateArray(array, k){
    let n = array.length;

    k = k % n;
    if(k < 0) k = k + n;

    const result = [];

    for(let i = k; i < n; i++)
        result[i-k] = array[i];

    for(let i = 0; i < k; i++)
        result[n - k + i] = array[i];

    return result;
}

function rotateArrayWithReverse(arr, k) {
    const n = arr.length;
    k = k % n;

    reverse(arr, 0, k - 1);
    reverse(arr, k, n - 1);
    reverse(arr, 0, n - 1);

    return arr;
}

function reverse(arr, start, end) {
    while (start < end) {
        [arr[start], arr[end]] = [arr[end], arr[start]];
        start++;
        end--;
    }
}

/**
 * @description Longest pallindrome in a string
*/

function longestPalindronicSubstring(str){
    let maxLength = 0, start = 0;
    for(let left = 0; left < str.length; left++){
        for(let right = 0; right < str.length; right++){
            if(palindrone(str, left, right)){
                let newLength = right - left + 1;
                if(newLength > maxLength){
                    maxLength = newLength;
                    start = left;
                }
            }
        }
    }
    return str.slice(start, start + maxLength);
    
}

function palindrone(str, i, j){
    if(i >= j)
        return true;
    if(str[i] === str[j])
        return palindrone(str, i+1, j-1);
    else
        return false;
}

function longestSubstringWithoutRepeatingCharacters(str){
    let strLength = str.length;
    let result='';
    for(let left = 0; left < strLength; left++){
        let ans = '';
        let right = left;
        while(right < strLength){
            if(ans.includes(str[right]))
                break;
            ans += str[right];
            if(result.length < ans.length)
                result = ans;
            right++;
        }
    }
    return result;
}
	
function longestSubstringWithoutRepeatingCharactersSet(str){
    let set = new Set();
    let maxLength = 0;
    let start = 0;
    let left = 0;
    for(let right = 0; right < str.length; right++){
        while(set.has(str[right]))
            set.delete(str[left++]);
        set.add(str[right]);
        let curLength = right - left + 1;
        
        if(maxLength < curLength){
            maxLength = curLength;
            start = left;
        }
    }
    return str.slice(start, start + maxLength);
}
// console.log(longestSubstringWithoutRepeatingCharactersSet("babacaba"));

// currying
function sum(...args){
    return function(...args2){
        if(args2.length === 0){
            return args[0];
        }else{
            return sum(args.reduce((a, b)=>a+b,0) + args2.reduce((a, b) => a + b, 0));
        }
    };
}

function sumWithSingle(args){
    return function(args2){
        if(args2 === undefined)
            return args;
        else
            return sumWithSingle(args + args2);
    }
}
console.log(sumWithSingle(2)(5)(9)(4)())


/**
 * @description Implement polling
 */
// baisic one
function polling(fn, interval) {
    const timer = setInterval(async ()=>{
        const data = await fn();
        if(data){
            clearInterval(timer);
            console.log("Condition met",data)
        }
    }, interval)
}
polling(async () => {
    const res = await fetch("/status");
    const data = await res.json();
    return data.ready;
}, 2000); 

// optimize one
function pollingOpt(fn, interval, limit){
    let attempt = 0;
    async function execute(){
        try {
            const data = await fn();
            if (data) {
                console.log("Condtiotn met", data);
                return;
            }
            attempt++;
            if(attempt >= limit){
                console.log("max tries reached");
                return;
            }
            setTimeout(execute, interval);
        } catch (error) {
            console.log("Error", error)
        }
    }
    execute();
}


function polling(task, delay, limit) {
    let count = 0;
    async function execute() {
        try {
            const res = await task();
            if (res) {
                console.log(res);
                return;
            }
            count++;
            if (count >= limit) {
                console.log("limit exceed");
                return;
            }
            setTimeout(execute, delay);
        } catch (error) {
            console.log(error);
            count++;
            setTimeout(execute, delay);
        }
    }
    execute();
}

function lengthOfLIS(nums) {
    if (nums.length === 0) return 0;

    // Initialize DP array with 1 (each element is an LIS of length 1)
    let dp = new Array(nums.length).fill(1);
    let maxLen = 1;

    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        maxLen = Math.max(maxLen, dp[i]);
    }
    return maxLen;
}
lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])
// Example: [10, 9, 2, 5, 3, 7, 101, 18] -> Result: 4 ([2, 3, 7, 18])

const taskArray = [
    () => new Promise(res => setTimeout(() => res("First"), 1000)),
    () => new Promise(res => setTimeout(() => res("Second"), 500)),
    () => new Promise(res => setTimeout(() => res("Third"), 100))
];

async function runOneByOne(tasks) {
    for (const task of tasks) {
        // Here, we CALL the function (task()) to create the promise
        // and AWAIT it before the loop moves to the next item.
        const result = await task();
        console.log(result);
    }
}

runOneByOne(taskArray);

function runOneByOneWithoutAsync(tasks) {
    // Start with a dummy promise that is already resolved
    return tasks.reduce((promiseChain, currentTask) => {
        // Return a new chain: wait for the previous, then run current
        return promiseChain.then((chainResults) => {
            return currentTask().then((currentResult) => {
                // Collect results into an array as we go
                return [...chainResults, currentResult];
            });
        });
    }, Promise.resolve([])); // Initial value is a resolved promise with an empty array
}

// Usage
runOneByOneWithoutAsync(taskArray).then(allResults => console.log(allResults));

function runOneByOneWithoutAsync(tasks) {
    const results = [];

    function processNext(index) {
        // Base case: If we've reached the end of the array, return the results
        if (index === tasks.length) {
            return Promise.resolve(results);
        }

        // Execute the current task
        return tasks[index]().then((res) => {
            results.push(res); // Store the result
            return processNext(index + 1); // Move to the next task
        });
    }

    // Start the process from the first index
    return processNext(0);
}

// Usage remains the same
runOneByOneWithoutAsync(taskArray).then(allResults => {
    console.log("Final Results:", allResults);
});
