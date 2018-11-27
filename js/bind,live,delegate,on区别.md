### 一、bind,live,delegate,on 区别

```js
$(selector).bind("click", function() {
    $("p").slideToggle();
});
//  jquery1.9版本以下支持，jquery1.9及其以上版本删除了此方法，jquery1.9以上版本用on()方法来代替
$("div button").live("click", function() {
    $("p").slideToggle();
});

// jquery1.4.2及其以上版本；
$("div").delegate("button", "click", function() {
    $("p").slideToggle();
});

// jquery1.7及其以上版本；jquery1.7版本出现之后用于替代bind()，live()绑定事件方式；
$(document).on("click", "div button", function() {
    alert("xxx");
});
```

#### 1. bind

```bash
.bind()是直接绑定在元素上，也很好的解决了浏览器在事件处理中的兼容问题。如果不人为的设置stopPropagation(Moder Browser), cancelBubble(IE)，那么它的所有父元素，祖宗元素都会受之影响;
event：必需项；添加到元素的一个或多个事件，例如 click,dblclick等；
　　　 单事件处理：例如 $(selector).bind("click",data,function);
　　　 多事件处理： 1.利用空格分隔多事件，例如 $(selector).bind("click dbclick mouseout",data,function);
　　　　　　　　　  2.利用大括号灵活定义多事件，例如 $(selector).bind({event1:function, event2:function, ...})　
                  3.空格相隔方式：绑定较为死板，不能给事件单独绑定函数,适合处理多个事件调用同一函数情况；
                  大括号替代方式：绑定较为灵活，可以给事件单独绑定函数；　　　
data：可选；需要传递的参数；

function：必需；当绑定事件发生时，需要执行的函数；适用所有版本，但是根据官网解释，自从jquery1.7版本以后bind()函数推荐用on()来代替。
```

```js
$("#add").bind("click", function() {
    $("div").append("<button>请点击这里</button>");
});

$("#add").bind("click mouseout", function() {
    $("div").append("<button>请点击这里</button>");
});

$("#add").bind({
    click: function() {
        $("div").append("<button>请点击这里</button>");
    },
    mouseout: function() {
        $("div").append("<button>zzz</button>");
    }
});
```

##### 1.1 当我们在 a 上面点击的时候，首先会触发它本身所绑定的 click 事件，然后会一路往上，触发它的父元素，祖先元素上所有绑定的 click 事件

```js
/* The .bind() method attaches the event handler directly to the DOM 
   element in question ( "#members li a" ). The .click() method is 
   just a shorthand way to write the .bind() method. */

$("#members li a").bind("click", function(e) {});
$("#members li a").click(function(e) {});
```

```bash

.click(), .hover()...这些非常方便的事件绑定，都是bind的一种简化处理方式。对于利用ID选出来的元素是非常好的，不仅仅是很快的可以hook上去(因为一个页面只有一个id),而且当事件发生时，handler可以立即被执行(相对于后面的live, delegate)实现方式

缺点：
它会绑定事件到所有的选出来的元素上
它不会绑定到在它执行完后动态添加的那些元素上
当元素很多时，会出现效率问题
当页面加载完的时候，你才可以进行bind()，所以可能产生效率问题
```

#### 2. live

```bash
.live()则是通过冒泡的方式来绑定到元素上的。更适合列表类型的，绑定到document DOM节点上。一旦事件冒泡到document上，jQuery将会查找selector/event metadata,然后决定那个handler应该被调用。当handler在执行的时候，因为有冒泡的参与，确实会有一些延迟，但是绑定的时候是特别的快。和.bind()相比的时候有一个好处就是我们不需要在每个元素上再去绑定事件，而只在document上绑定一次就可以了。尽管这个不是最快的方式，但是确实是最少浪费的。

优点：
这里仅有一次的事件绑定，绑定到document上而不像.bind()那样给所有的元素挨个绑定
那些动态添加的elemtns依然可以触发那些早先绑定的事件，因为事件真正的绑定是在document上
你可以在document ready之前就可以绑定那些需要的事件
缺点：

从1.7开始已经不被推荐了，所以你也要开始逐步淘汰它了。
Chaining没有被正确的支持
当使用event.stopPropagation()是没用的，因为都要到达document
因为所有的selector/event都被绑定到document, 所以当我们使用matchSelector方法来选出那个事件被调用时，会非常慢
当发生事件的元素在你的DOM树中很深的时候，会有performance问题
```

#### 3. delegate
```bash
.delegate()则是更精确的小范围使用事件代理，性能优于.live()。它不会把所有的 event 全部绑定到 document,而是由你决定把它放在哪儿。而和.live()相同的地方在于都是用 event delegation.

优点：
你可以选择你把这个事件放到那个元素上了
chaining 被正确的支持了
jQuery 仍然需要迭代查找所有的 selector/event data 来决定那个子元素来匹配，但是因为你可以决定放在那个根元素上，所以可以有效的减小你所要查找的元素。
可以用在动态添加的元素上
缺点：

需要查找那个那个元素上发生了那个事件了，尽管比 document 少很多了，不过，你还是得浪费时间来查找
```
#### 4. on
```bash
.on()则是最新的1.9版本整合了之前的三种方式的新事件绑定机制。.bind(), .live(), .delegate()都是通过.on()来实现的，.unbind(), .die(), .undelegate(),也是一样的都是通过.off()来实现的。
```