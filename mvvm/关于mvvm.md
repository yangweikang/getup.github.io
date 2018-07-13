## MVVM
从mvc->mvp->mvvm 告别了操作DOM的思维，换上了数据驱动页面的思想。
```bash
MVVM 双向数据绑定 在Angular1.x版本的时候通过的是脏值检测来处理，而现在无论是React还是Vue还是最Angular，
其实实现方式都更相近了，【数据劫持】+【发布订阅模式】，其实底层实现是ES5中提供的Object.defineProperty，
导致MVVM框架只能支持IE8+ 
```