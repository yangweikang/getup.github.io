## Object.defineProperty() 
```bash
方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
```
```js
Object.defineProperty(obj, prop, descriptor);
/*
参数:
    obj:要在其上定义属性的对象。
    prop:要定义或修改的属性的名称。
    descriptor:将被定义或修改的属性描述符。
返回值：
    被传递给函数的对象。
*/
``` 
 
|| configurable | enumerable| value | writable | get | set |
|:-------------:|:-------------:|:-------------:|:-------------:|:-------------:|
| 默认值 | false | false | undefined | false | undefined | undefined |
| 数据描述符 | Yes | Yes | Yes | Yes | No | No |
| 存取描述符 | Yes | Yes | No | No | Yes | Yes |

### Configurable 特性
configurable特性表示对象的属性是否可以被删除，以及除writable特性外的其他特性是否可以被修改。

### Enumerable 特性
 enumerable定义了对象的属性是否可以在 for...in 循环和 Object.keys() 中被枚举。

### Writable 属性
当writable属性设置为false时，该属性被称为“不可写”。它不能被重新分配。

### 通用属性
```js
var o = {};

o.a = 1;
// 等同于 :
Object.defineProperty(o, "a", {
  value : 1,
  writable : true,
  configurable : true,
  enumerable : true
});


// 另一方面，
Object.defineProperty(o, "a", { value : 1 });
// 等同于 :
Object.defineProperty(o, "a", {
  value : 1,
  writable : false,
  configurable : false,
  enumerable : false
});
```