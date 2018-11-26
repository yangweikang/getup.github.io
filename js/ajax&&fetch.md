### 一、AJAX

```js
//get
let xhr = XMLHttpRequest();
xhr.open("GET", URL, true); //1
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
        //2
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            //3
            let data = xhr.responseText;
            console.log(data);
        }
    }
};
xhr.onerror = function() {
    console.log("error");
};
xhr.send(); //4
```

```js
xhr.open("GET", URL, true); //methods,URL,async
```

#### 1.1 methods:post/get

##### GET 与 POST 区别

```bash
    GET在浏览器回退时是无害的，而POST会再次提交请求
    GET请求会被浏览器主动缓存，而POST不会，除非手动设置
    GET请求参数会被完整保留在浏览器历史记录里，而POST中的参数不会被保留
    GET请求在URL中传送的参数是有长度限制的，而POST没有限制
    GET参数通过URL传递，POST放在Request body中
```

#### 2.1 xhr.readyState

```js
var xhr = new XMLHttpRequest();
console.log("UNSENT", xhr.readyState); // readyState 为 0

xhr.open("GET", "/api", true);
console.log("OPENED", xhr.readyState); // readyState 为 1

xhr.onprogress = function() {
    console.log("LOADING", xhr.readyState); // readyState 为 3
};

xhr.onload = function() {
    console.log("DONE", xhr.readyState); // readyState 为 4
};

xhr.send(null);
```

#### 3.1 Http 状态码
```bash
    状态代码有三位数字组成，第一个数字定义了响应的类别，共分五种类别:
    1xx：指示信息--表示请求已接收，继续处理
    2xx：成功--表示请求已被成功接收、理解、接受
    3xx：重定向--要完成请求必须进行更进一步的操作
    4xx：客户端错误--请求有语法错误或请求无法实现
    5xx：服务器端错误--服务器未能实现合法的请求
    **注意*：304为缓存地址
```
#### 4.1 send
#####  4.1.1 get
```js
xhr.open("GET", URL?pageCount=100&&pageIndex=1, true);
xhr.send(); 
```

#####  4.1.2 post
```js
xhr.open("POST", URL, true);
xhr.send('pageCount=100&&pageIndex=1'); 
```