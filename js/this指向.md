
```js
    5.1  //this 谁调用指向谁
    var  name='ywkang'
    var obj={
        name:'ywk',
        getName:function(){
            console.log(this.name)
        }
    }
    obj.getName();//ywk
    var objWindow=obj.getName;
    objWindow();//ywkang

5.2. //this 指向父执行上下文
    var  name='ywkang'
    var obj={
        name:'ywk',
        getName:()=>console.log(this.name)
    }
    obj.getName();//ywkang
    var objWindow=obj.getName;
    objWindow();//ywkang

5.3.  //this 谁调用指向谁
    var name = 'windowname';
    var objPratent  = {
        name: 'objPratent',  
        obj: {
            name: 'obj',
            getName:function(){
                console.log(this.name)
            }
        }
    }
    objPratent.obj.getName();//obj
    var objWindow=objPratent.obj.getName;
    objWindow();//windowname

5.4.  //this是指向函数作用域，对象嵌套的形式，不存在函数作用域，因此定义箭头函数的时候还是指向window
    var name = 'windowname';
    var objPratent  = {
        name: 'objPratent',  
        obj: {
            name: 'obj',
            getName: () => {
                console.log(this.name);
            }
        }
    }
    objPratent.obj.getName();//windowname
    var objWindow=objPratent.obj.getName;
    objWindow();//windowname

5.5. //这里是外部作用域 this指向window，即最终console中的this指向window
    var name ='ywkang';
    var obj = {
        name:'ywk', 
        getName:()=>{
            //这里是外部作用域,因为本身又是箭头函数，继续向上找
            setTimeout(() => {
                console.log(this.name);  //this指向外部作用域中this
            });
        }
    }
    obj.getName();   //ywkang

```