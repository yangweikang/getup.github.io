// function after(kk, cb) {
//     console.log(kk, cb);
//     return function() {
//         console.log(kk);
//         if (--kk === 0) {
//             cb();
//         }
//     };
// }

// let fun = after(3, function() {
//     console.log("00000");
// });

// console.log(fun.toString());

// fun();
// fun();
// fun();

// let kk = after.prototype;
// console.log(typeof kk);

// for (var index = 0; index < 6; index++) {
//     (function name(params) {
//         var j = index;
//         console.log(j);
//     })();
// }

for (let index = 0; index < 8; index++) {
    setTimeout(function(params) {
        console.log(index);
    }, 1000 * index);
}

// for (var index = 0; index < 8; index++) {
//     setTimeout(function(params) {
//         console.log(index);
//     }, 1000 * index);
// }

// var foo = "foo";
// (function bob(foo) {
//     foo = "foo2";
//     console.log(foo);
// })(foo);
// console.log(foo);

var name = "The Window";
var object = {
    name: "My Object",
    getNameFunc: function() {
        var that = this;
        return function() {
            return that.name;
        };
    }
};
console.log(object.getNameFunc()());

var name = "The Window";
var object = {
    name: "My Object",
    getNameFunc: function() {
        return function() {
            return this.name;
        };
    }
};
let kk=object.getNameFunc();
console.log(kk());

var name = "The Window";
var object = {
    name: "My Object",
    getNameFunc: function() {
        this.name="dfsdfs";
        return (function(){
            return this.name;
        })();
    }
};

console.log(object.getNameFunc());

var add = (function() {
    return function() {
        var count = 0;
        return (count += 1);
    };
})();
console.log(add());
console.log(add());
console.log(add());

var add = (function(count) {
    return function() {
        return (count += 1);
    };
})(0);
console.log(add());
console.log(add());
console.log(add());

// 变量重名
var animal = "dog";
function sayAanimal() {
    animal = "cat";
    function animal() {}
    console.log(animal.toString());
}
sayAanimal();

//未声明变量
b;
console.log(b);
a = 1;
console.log(a);

//未定义 不赋值 不执行
ff();
var ff;
ff();
function ff() {
    console.log(2);
}

var ff = function() {
    console.log(1);
};
ff();

// 作用域 代码执行的空间、环境 ====栈内存
//全局作用域：一打开浏览器就会形成全局作用域，window
//私有作用域：一个函数的执行就会形成一个私有作用域
//块级作用域：es6新增，{} console.log(eval('{a:1,b:1}')); -->eval('({a:1,b:1})')

//var：只是提前声明
//function:即声明又定义
console.log(a);
var a = 10;
console.log(ywkangfun);
function ywkangfun(params) {}

//私有作用域
var num = 10;
function func() {
    alert(num); //undefined
    var num = 20;
    alert(num); //20
}
func();
alert(num); //10

//私有作用域
var num = 10;
function func() {
    alert(num); //20
    num = 20;

    function func1() {
        alert(num); //undefined
        var num = 40;
        alert(num); //30
    }
    func1();
    alert(num); //20
}
func();
alert(num); //10

//私有作用域

var func = function() {
    alert("abc");
};
function func1() {
    func(); //func is not a function
    var func = function() {
        alert("123");
    };
    func();
}
func1();

//私有作用域
var func = function() {
    alert("abc");
};

function func1() {
    func(); //123
    function func() {
        alert("123");
    }
    func(); //123
}
func1();

//私有作用域
var func = function() {
    alert("abc");
};

function func1() {
    func(); //abc
    func = function() {
        alert("123");
    };
    func(); //123
}
func1();

//私有作用域

var func1 = function() {
    return true;
};
var func2 = function() {
    return false;
};
(function() {
    if (func2()) {
        function func1() {
            return false;
        }
        function func2() {
            return true;
        }
    }
})();
console.log(func1());

var func1 = function() {
    return true;
};
var func2 = function() {
    return false;
};
(function() {
    if (func2()) {
        func1 = function() {
            return false;
        };
        var func2 = function() {
            return true;
        };
    }
})();

func1();
func2();
console.log(innerVar1);
console.log(innerVar2);
function func1() {
    innerVar1 = 1;
}
function func2() {
    var innerVar2 = 2;
}
//1.自执行函数没有变量提升
name()((function name(params) {})());

//2:等号右边没有变量提升
name();
var f = function name(params) {};
//3 不管条件是否成立都要变量提升，但是var和function都是只是声明 不定义，当条件成立第一步先给函数赋值
console.log(a); //undefined
console.log(F); //undefined
if (false) {
    console.log(a); //undefined
    console.log(F);
    var a = 1;
    function F(params) {}
}

//es6
//let const 没有变量提升,
//let const 不可以重复定义
//let const 定义的变量不会给window
//const 没有变量提升，不允许未定义，不允许修改

console.log(a);
let a;
console.log(b);
const b = 2;

let t = "xx";
function name() {
    let t = "ywk";
    function ywkang() {
        let t = "kk";
    }
}
name();

function func1() {
    for (var i = 0; i < 5; i++) {
        setTimeout(function() {
            console.log(i);
        }, 3 * 1000);
    }
}
func1();

function func2() {
    var counter = 0;
    setTimeout(function() {
        console.log(counter);
    }, 3 * 1000);
}
func2();

//闭包
function func3() {
    var counter = 0;
    function getCounter(counter) {
        return counter++;
    }
    return getCounter;
}
func3()(2);

//闭包
function func4() {
    var counter = 0;
    function addCounter() {
        return counter++;
    }
    addCounter();
}
func4();

//引用类型
var obj = { a: 1 };
var obj1 = obj;
obj1.b = obj = { x: 1 };
console.log(obj.b);
console.log(obj1.b);

function personChange(person) {
    person.age = 50;
    person = {
        name: "ywk",
        age: 33
    };
    return person;
}
var person = {
    name: "ywkang",
    age: 28
};
console.log(person);
console.log(personChange(person));

//function name
function fn() {}
console.log(fn.name);
console.log(function() {}.name);
console.log(new Function("res", "return res").name);
var ff = new Function("res", "return res");
console.log(ff.name);
function f1() {}
var f2 = f1.bind(null);
console.log(f2.name);

function name(x, y) {}
name(1, 2, 3);
console.log(name.length);

function name(x = "你好", y) {}
name(1, 2, 3);
console.log(name.length);

function name(x, y = "你好") {}
name(1, 2, 3);
console.log(name.length);

// 默认值是否执行 x是否是undefined
function name(
    x = (function(params) {
        return 10;
    })()
) {}

//ajax
let xhr = XMLHttpRequest();
xhr.open("GET", URL, true); //1
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
        //2
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            //3
            var data = xhr.responseText;
            console.log(data);
        }
    }
};

xhr.onerror = function() {
    console.log("Oh, error");
};
xhr.send(); //4

//作用域链
var a = 10;
function name(params) {
    console.log(a);
}
name();

function foo() {
    var max = 10;
    return function bar(x) {
        if (x > max) {
            console.log(x);
        }
    };
}
var fa = foo();
var max = 100;
fa(15);

//上级作用域，当前的作用域的地址在哪一个作用域下定义，上一级就是谁；
var counter = 100;
function fn() {
    var counter = 0;
    fn.count = function(params) {
        console.log(++counter);
    };
    window.print = function(params) {
        console.log(--counter);
    };
    function plus(params) {
        console.log(++counter);
    }
    return plus;
}
var foo = fn();
foo();
print();
fn.count();
foo.count();

var a = 10;
function fn() {
    var a = 1;
    return fn;
    function fn() {
        console.log(a);
    }
}
var f = fn();
f();

//冒泡排序
function bubleSort(arr) {
    var sz = arr.length;
    for (var i = 0; i < sz; i++) {
        for (var j = 0; j < sz - i - 1; j++) {
            if (arr[j] < arr[j + 1]) {
                var tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }
    return arr;
}
console.log(bubleSort([5, 4, 3, 1]));

//选择排序
function selectSort(arr) {
    var min;
    var sz = arr.length;
    for (var i = 0; i < sz; i++) {
        min = i;
        for (var j = i + 1; j < sz; j++) {
            arr[j] < arr[min] && (min = j);
        }
        if (min != i) {
            var tmp = arr[i];
            arr[i] = arr[min];
            arr[min] = tmp;
        }
    }
    return arr;
}
console.log(selectSort([5, 4, 3, 1]));

