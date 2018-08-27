let arr = [0, 1.2, 1.3];
let arrResult = arr.filter(function (item) {
    return item > 1;
})
console.log(arrResult);


let arr = [0, 1.2, 1.3];
let arrResult = arr.map(function (item) {
    return parseInt(item);
})
console.log(arrResult);

let arr = [{
    key: 1,
    name: 1
}, {
    key: 1,
    name: 1
}, {
    key: 1,
    name: 1
}];
let arrResult = arr.map(function (item) {
    return item.key;
})
console.log(arr);
console.log(arrResult);


let arr = [0, 1.2, 1.3];
for (let v in arr) {
    console.log(v)
}




let arr = [{
    key: 1,
    name: 1
}, {
    key: 1,
    name: 1
}, {
    key: 1,
    name: 1
}];
for (let v of arr) {
    console.log(v)
}


let obj = {
    key: 1,
    name: 1
};

for (let v in obj) {
    console.log(v)
}

let obj = {
    key: 1,
    name: 1
};

let arr = [{
    key: 1,
    name: 1
}, {
    key: 1,
    name: 1
}, {
    key: 1,
    name: 1
}];
arr.forEach(function (index, item) {
    console.log(index)

})