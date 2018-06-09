## Vue2.0实现自定义指令jquery-datetimeticket双向绑定
```bash
在网上找到很久都没有找到跟原有项目相匹配的需求时间控件，就沿用原有，但是不能触发双向绑定，写了个自定义指令支持双向绑定：
```

```js
import 'jquery-datetimepicker';

Vue.directive('datetimepicker', {
    bind(el,binding,vnode) { 
        var _el=$(el);
        $.datetimepicker.setLocale('ch');
        _el.datetimepicker({
             value: _el._value, 
             timepicker: true,
             format: 'Y/m/d H:i',
             formatDate: 'Y/m/d',
             step: 60,
             onChangeDateTime(ct){ 
                var reg= /\[(\d+)\]/;//正则取得数值
                 for(let item of vnode.data.directives){ 
                    var expression=item.expression;//取得相应的v-model变量
                    var arr = reg.exec(expression); //取得数组相应索引 
                    if(item.name==='model'&&arr){//判断是否是数组
                        let key=expression.replace(arr[0],'');//数组变量名
                        vnode.context.$set(vnode.context.$data[key],arr[1],formDate(ct,'yyyy/MM/dd hh:00'));//数组变量名，索引，时间值
                    }else if(item.name==='model'){//取得变量名
                        vnode.context.$set(vnode.context.$data,item.expression,formDate(ct,'yyyy/MM/dd hh:00'));//变量名，时间值
                    }
                 }
             }
         });
     },
     unbind() { 
        $(el).datetimepicker('destroy')
    }
});
```