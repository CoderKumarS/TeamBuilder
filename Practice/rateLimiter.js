class RateLimiter {
    constructor(limit, intervalMs) {
        this.limit = limit;           // Max requests allowed in the interval
        this.intervalMs = intervalMs; // The time window (e.g., 1 minute)
        this.users = new Map();       // Stores { tokens, lastRefillTime } per IP
    }

    isAllowed(userId) {
        const now = Date.now();

        if (!this.users.has(userId)) {
            this.users.set(userId, { tokens: this.limit - 1, lastRefill: now });
            return true;
        }

        const userData = this.users.get(userId);

        // 1. Calculate how many tokens to add based on time passed
        const timePassed = now - userData.lastRefill;
        const tokensToAdd = Math.floor(timePassed / (this.intervalMs / this.limit));

        if (tokensToAdd > 0) {
            userData.tokens = Math.min(this.limit, userData.tokens + tokensToAdd);
            userData.lastRefill = now;
        }

        // 2. Check if user has tokens to spend
        if (userData.tokens > 0) {
            userData.tokens--;
            return true;
        }

        return false;
    }
}

// Usage: 5 requests per 10 seconds
const limiter = new RateLimiter(5, 10000);
console.log(limiter.isAllowed("user_1")); // true


class SlidingWindowLimiter {
    constructor(limit, windowMs) {
        this.limit = limit;
        this.windowMs = windowMs;
        this.requests = new Map(); // Map<UserId, Array<Timestamps>>
    }

    isAllowed(userId) {
        const now = Date.now();
        if (!this.requests.has(userId)) this.requests.set(userId, []);

        let timestamps = this.requests.get(userId);

        // 1. Remove timestamps outside the current window
        while (timestamps.length > 0 && timestamps[0] <= now - this.windowMs) {
            timestamps.shift();
        }

        // 2. Check capacity
        if (timestamps.length < this.limit) {
            timestamps.push(now);
            return true;
        }

        return false;
    }
}
