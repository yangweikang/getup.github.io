# var let const 
## es6 提供了新的声明方式替代了以前的var let const

# js 作用域

1. 给未定义变量赋值，该变量将提升为【全局作用域】!
```js
(function () {
  for ( i = 0; i < 3; i++) {
     console.log(i);//0 1 2
  }
})();
console.log(i);//3 PS:提升为全局作用域
console.log(window.i);//3 PS:提升为全局作用域
```
***
2. 2将变量定义为var，该变量将为【函数作用域】，由于解析器即浏览器，执行该方法前先读取出var function变量，导致了函数内作用域提升!
```js
(function () {
  console.log(j);//undefined PS:提升为undefined
 // console.log(n);// n is not defined PS:n与i进行对比
  for (var i = 0; i < 3; i++) {
     console.log(i);
  }
  var j=3;
  
})();
console.log(i);
console.log(window.i); //i is not defined
```
***
3. 引发问题: 由于var只存在函数作用域，setTimeout将被推入内存栈队列中，导致输出不为理想0 1 2结果

```js
//问题：
  for(var i = 0; i<3;i++){ 
      setTimeout(function () {
        console.log(i);// 3 3 3
      }, 1000); 
  }
  console.log(i)//3
//早期解决方案：
  for(var i = 0; i<3;i++){
    (function (i) {
      setTimeout(function () {
        console.log(i);//0 1 2
      }, 1000);
    })(i);
  }
  console.log(i)//3
```
***
4. var 

4.1 将变量定义为let，该变量将会为【块级作用域】解决以上var带来的两个问题：

4.1.1 解析器先读取var function提升作用域，未定义变量为undefined
```js
  (function () {
    console.log(j);// j is not defined 
    for (var i = 0; i < 3; i++) { 
      console.log(i);
    }
    //var j=3;
      let j=3;

  })(); 
```
4.1.2 let块级作用域产生解决，函数作用域问题
  ```js
  //for(var i = 0; i<3;i++){ 
  for(let i = 0; i<3;i++){ 
    setTimeout(function () {
      console.log(i);// 0 1 2
    }, 1000); 
  }
```


4.2 let有暂时性死区,如果作用域内,有这样一个变量 那么这个作用域内就会绑定这个变量，不会继续向上查找了。
```js
let a = 1;
{
  console.log(a);
  let a = 2;
}
```
4.3 let禁止重复声明变量,不允许在同一作用域中重复声明let声明过的变量，var中可以重复声明。
```js
(function () {
  var ix='q';
  var ix='nn';
  let oo='xx';// SyntaxError: Identifier 'oo' has already been declared
  let oo='yy';
})();
  ```
 4.4 let不会成为 window全局对象的属性
 ```js
      var a = 'var';
      console.log(window.a); // var
      let b = 'let';
      console.log(window.b); // undefined
  ``` 
总结：解决作用域污染问题和局部作用域的问题
***
5. 通过const声明的变量不能被修改
```js
const a='ywkang'; a='ywk'; //Uncaught TypeError
```
 