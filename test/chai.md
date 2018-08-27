## chai
http://www.chaijs.com/


```bash
hai is a BDD[行为驱动开发]] / TDD[测试驱动开发] assertion[断言] library for node and the browser that can be delightfully paired with any javascript testing framework.
```
#### chai-spies监听函数
```js
    //mock
    import chai from 'chai';
    import spies from 'chai-spies';
    chai.use(spies);
    const Constructor= Vue.extend(compent);
    const vm=new Constructor({
        propsData:{
            icon:'settings'
        }
    });
    vm.$mount();
    let spy=chai.spy(function(){});
    vm.$on('click',spy);
    vm.$el.click();
    expect(spy).to.have.been.called();
```
