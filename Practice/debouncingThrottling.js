function debounce(callback, delay = 1000){
    let timer = 0;
    return function(...args){
        clearTimeout(timer);
        timer = setTimeout(()=>{
            callback.apply(this, args);
        }, delay)
    };
}

function throttle(callback, delay = 1000) {
    let throt = false;
    return function(...args){
        if(!throt){
            callback.apply(this, args);
            throt = true;
            setTimeout(()=> throt = false, delay)
        }
    };
}

function throttling(cb, delay){
    let throt = 0;
    return function(...args){
        let now = Date.now();
        if(throt-now <= delay){
            cb.apply(this,args);
            throt = Date.now();
        }
    }
}
