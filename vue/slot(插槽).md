## slot(插槽)，solt内容分发
### slot是vue解耦属性项。
1. UI解耦：在父节点暴漏出公开html接口，可自定义封闭子组件中的UI。
2. 作用域解耦：在父节点暴漏出公开数据接口，可自定义封闭子组件中的数据。

### 一、UI解耦（PS:有点类似prop属性）分为

#### 默认slot:
```html
<!-- 这里是父组件 -->
<template>
    <div class="partent">
        <h3>这里是父组件</h3>
        <child>
            <div class="tmpl">
              <span>菜单1</span>
              <span>菜单2</span>
              <span>菜单3</span> 
            </div>
        </child>
    </div>
</template>
```
```html
<!-- 这里是子组件 child-->
<template>
    <div class="child">
        <h3>这里是子组件</h3>
        <slot></slot>
    </div>
</template>
```
```html
<!-- 最终呈现html -->
<template>
     <div class="partent">
        <h3>这里是父组件</h3>
        <div class="child">
            <h3>这里是子组件</h3>
            <!-- slot -->
            <div class="tmpl">
                <span>菜单1</span>
                <span>菜单2</span>
                <span>菜单3</span> 
            </div>
        </div>
    </div>
</template>
```
***
#### 命名slot:

```html
<!-- 这里是父组件 -->
<template>
  <div class="father">
    <h3>这里是父组件</h3>
    <child>
      <div class="tmpl" slot="up">
        <span>菜单1</span> 
      </div>
      <div class="tmpl" slot="down">
        <span>菜单-1</span> 
      </div>
      <div class="tmpl">
        <span>菜单->1</span> 
      </div>
    </child>
  </div>
</template>
```

```html
<!-- 这里是子组件 child-->
<template>
  <div class="child">
    <slot name="up"></slot>

    <h3>这里是子组件</h3>

    <slot name="down"></slot>
    <slot></slot>
  </div>
</template>
```
```html
<!-- 最终呈现html -->
<template>
  <div class="father">
    <h3>这里是父组件</h3>
    <div class="child">
        <div class="tmpl" slot="up">
            <span>菜单1</span> 
        </div>
            <h3>这里是子组件</h3>
        <div class="tmpl" slot="down">
            <span>菜单-1</span> 
        </div>
        <div class="tmpl">
            <span>菜单->1</span> 
        </div>
    </div> 
  </div>
</template>
```
***
### 二、作用域解耦
#### slot-scope:

```html
<!-- 这里是父组件 -->
<template>
  <div class="father">
    <h3>这里是父组件</h3>
    <child>
        <template slot-scope="prop">
        {{prop.data}}
        </template>
    </child>
  </div>
</template>
```
```html
<!-- 这里是子组件 child--> 
<template>
  <div class="child">
    <h3>这里是子组件</h3>
    <slot  :data="data"></slot>
  </div>
</template>
<script>
  export default {
      data: function(){
        return {
          data: ['zhangsan','lisi','wanwu','zhaoliu','tianqi','xiaoba']
        }
      }
  }
</script>
```

```html
<!-- 最终呈现html -->
<template>
  <div class="father">
    <h3>这里是父组件</h3>
    <div class="child">
    <h3>这里是子组件</h3>
     ['zhangsan','lisi','wanwu','zhaoliu','tianqi','xiaoba']
  </div>
  </div>
</template>
```
***