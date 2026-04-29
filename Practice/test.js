function greet(cb) {
    console.log("hello");
    cb();
}

const test = function () {
    console.log("test");
    console.log(__dirname);
}

// greet(test);

class Person {
    #name = "";
    #age = 0;
    #gender = "";

    constructor(name, age, gender) {
        this.#name = name;
        this.#age = age;
        this.#gender = gender;
    }

    get name() {
        return this.#name;
    }

    get age() {
        return this.#age;
    }

    get gender() {
        return this.#gender;
    }

}
class BankAccount extends Person {
    #accountNumber;
    #balance = 0;
    #history = [];

    constructor(name, age, gender, accountNumber) {
        super(name, age, gender);
        this.#accountNumber = accountNumber;
    }

    deposit(amount) {
        this.#balance += amount;
        this.#history.push({ type: 'deposit', amount });
    }

    withdraw(amount) {
        this.#balance -= amount;
        this.#history.push({ type: 'withdraw', amount });
    }

    get balance() {
        return this.#balance;
    }

    get history() {
        return this.#history;
    }

    get accountDetails() {
        debugger;
        return {
            name: super.name,
            age: super.age,
            gender: super.gender,
            accountNumber: this.#accountNumber,
            currentBalance: this.#balance
        };
    }
}

const personAccount = new BankAccount("Sujal", 22, "Male", "123456789");
personAccount.deposit(100);
personAccount.withdraw(50);
console.log(personAccount.accountDetails);
console.log(personAccount.history);


class tryPoly {
    // test() {
    //     console.log("test");
    // }
    test(n) {
        if (n) {
            console.log("test", n);
        }else{
            this.test(1);
            console.log(this);
        }
    }
}

const tryPolyObj = new tryPoly();
tryPolyObj.test(1);  //test undefined
tryPolyObj.test(1); //test 1
