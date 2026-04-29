function josephusArray(n, k) {
    let people = Array.from({ length: n }, (_, i) => i + 1);
    let index = 0;

    while (people.length > 1) {
        // Find the index of the person to be killed
        index = (index + k - 1) % people.length;
        people.splice(index, 1); // Remove the person
    }

    return people[0];
}

console.log(josephusArray(7, 3)); // Result: 4