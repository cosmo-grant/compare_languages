const arr = [];

for (let i = 0; i < 3; i++) {
    arr.push(() => i);
}

console.log(arr[0]());
console.log(arr[1]());
console.log(arr[2]());
