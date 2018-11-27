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

##### 4.1.1 get

```js
xhr.open("GET", URL?pageCount=100&&pageIndex=1, true);
xhr.send();
```

##### 4.1.2 post

```js
xhr.open("POST", URL, true);
xhr.send("pageCount=100&&pageIndex=1");
```

### 一、fetch

```js
//GET
fetch("https://www.baidu.com/search/error.html?a=1&b=2", {
    // 在URL中写上传递的参数
    method: "GET"
})
    .then(res => {
        return res.text();
    })
    .then(res => {
        console.log(res);
    });

fetch(
    "https://nbrecsys.4paradigm.com/api/v0/recom/recall?requestID=oj5poqejrl&sceneID=594&userID=sov36u9ok1&timestamp=1543303846448",
    {
        method: "POST",
        body: JSON.stringify({
            itemID: "6a55cb19d23db8409734b50d564f5255",
            page: 0,
            itemTitle: "fetch，终于认识你 - 个人文章 - SegmentFault 思否"
        }) // 传递的参数
    }
)
    .then(res => {
        return res.json();
    })
    .then(res => {
        console.log(res);
    });

//Post
```

#### 设置请求的头信息

在 POST 提交的过程中，一般是表单提交，可是，经过查询，发现默认的提交方式是：Content-Type:text/plain;charset=UTF-8，这个显然是不合理的。下面咱们学习一下，指定头信息：

```js
fetch(
    "https://nbrecsys.4paradigm.com/api/v0/recom/recall?requestID=oj5poqejrl&sceneID=594&userID=sov36u9ok1&timestamp=1543303846448",
    {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/x-www-form-urlencoded" // 指定提交方式为表单提交
        }),
        body: JSON.stringify({
            itemID: "6a55cb19d23db8409734b50d564f5255",
            page: 0,
            itemTitle: "fetch，终于认识你 - 个人文章 - SegmentFault 思否"
        }) // 传递的参数
    }
)
    .then(res => {
        return res.json();
    })
    .then(res => {
        console.log(res);
    });
```

#### 通过接口得到 JSON 数据

```js
fetch(
    "https://www.baidu.com/rec?platform=wise&ms=1&rset=rcmd&word=123&qid=11327900426705455986&rq=123&from=844b&baiduid=A1D0B88941B30028C375C79CE5AC2E5E%3AFG%3D1&tn=&clientWidth=375&t=1506826017369&r=8255",
    {
        // 在URL中写上传递的参数
        method: "GET",
        headers: new Headers({
            Accept: "application/json" // 通过头指定，获取的数据类型是JSON
        })
    }
)
    .then(res => {
        return res.json(); // 返回一个Promise，可以解析成JSON
    })
    .then(res => {
        console.log(res); // 获取JSON数据
    });
```

#### 强制带 Cookie

默认情况下, fetch 不会从服务端发送或接收任何 cookies, 如果站点依赖于维护一个用户会话，则导致未经认证的请求(要发送 cookies，必须发送凭据头).

```js
fetch("https://www.baidu.com/search/error.html", {
    method: "GET",
    credentials: "include" // 强制加入凭据头
})
    .then(res => {
        return res.text();
    })
    .then(res => {
        console.log(res);
    });
```

