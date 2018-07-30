
# 前端工程化 
![工程化](./img/工程化.png)

#  npm
```bash
    1. 通过cnpm使用
    npm install - g cnpm--registry = https://registry.npm.taobao.org

    2. 常用框架指令
    npm install  //根据当前目录下package.json下载相关依赖
    npm run start/build //运行 package.json script 
```
```json
// package.json
{
    "name": "cms-frame",
    "version": "1.3.0",
    "private": false,
    "scripts": {//执行
        "start": "cross-env NODE_ENV='development' webpack-dev-server --inline --progress  --port 8082",
        "build": "rimraf dist && cross-env NODE_ENV='production' node   webpack.config.js"
    },
    "license": "ISC",
    "devDependencies": {//开发依赖
        "babel-core": "^6.25.0",
        "babel-helper-vue-jsx-merge-props": "^2.0.3",
        "babel-loader": "^7.1.0",
        "babel-plugin-component": "^1.1.0",
        "babel-plugin-syntax-jsx": "^6.18.0",
        "babel-plugin-transform-runtime": "^6.23.0",
        "babel-plugin-transform-vue-jsx": "^3.7.0",
        "babel-polyfill": "^6.26.0",
        "babel-preset-env": "^1.6.1",
        "babel-preset-es2015": "^6.24.1",
        "babel-preset-stage-2": "^6.24.1",
        "cross-env": "^5.0.5",
        "css-loader": "^0.28.5",
        "element-theme-chalk": "^2.3.6",
        "expose-loader": "^0.7.3",
        "express": "^4.15.4",
        "extract-text-webpack-plugin": "^3.0.0",
        "file-loader": "^0.10.1",
        "friendly-errors-webpack-plugin": "^1.7.0",
        "html-webpack-plugin": "^2.30.1",
        "inline-manifest-webpack-plugin": "^3.0.1",
        "less": "^2.7.2",
        "less-loader": "^4.0.5",
        "node-less": "^1.0.0",
        "rimraf": "^2.6.1",
        "style-loader": "^0.16.0",
        "to-string-loader": "^1.1.5",
        "uglifyjs-webpack-plugin": "^0.4.6",
        "url-loader": "^0.5.8",
        "vue-loader": "^12.2.1",
        "vue-template-compiler": "^2.4.2",
        "webpack": "^3.6.0",
        "webpack-dev-server": "^2.6.1",
        "webpack-merge": "^4.1.0"
    },
    "dependencies": {//生产依赖
        "axios": "^0.16.2",
        "echarts": "^4.0.4",
        "element-ui": "^2.3.6",
        "jquery": "^3.2.1",
        "md5": "^2.2.1",
        "popper.js": "^1.12.9",
        "qs": "^6.5.1",
        "vue": "^2.4.2",
        "vue-router": "^2.7.0",
        "vue2-highcharts": "^1.1.9",
        "vuex": "^2.4.0"
    }
}
```
# webpack 构架工具
1. 性能 代码分割，公共代码提取，提取有效代码,缓存持久化
2. 效率 自动化编译刷新（liveReload），代码有效性检验，自动化测试（karma），css预编译，js/css编译压缩提取（babel）（E6+）
3. 质量 cssint eslint htmlint 代码规范性，有效性，单元测试、ui测试
4. 安全

```js
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');

module.exports = {
    entry: {//入口
        'main': ['babel-polyfill', './scripts/main.js', './scripts/polyfill.js'],
        'vendor': ['jquery']
    }, 
    resolve: {//Resolve 配置 Webpack 如何寻找模块所对应的文件
        modules: [
            'node_modules',
            path.resolve(process.cwd(), 'app')
        ] 
        extensions: ['.vue', '.js', '.css', '.less']//引用过程中用到的后缀列表
    },
    module: {
        rules: [{//加载的load 浏览器只识别js html css 压缩、编译、执行、预处理等
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|swf)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1000,
                        name: './images/[name].[ext]'
                    }
                }]
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader'
                    }, {
                        loader: 'less-loader'
                    }]
                })
            },
            {
                test: /\.css$/,
                exclude: path.resolve(process.cwd(), 'app', 'scripts'),
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: true //css压缩
                        }
                    }]
                })
            }
        ]
    },
    plugins: [//插件篇幅 提取公共模块，持久化，自动构建html等
        new ExtractTextPlugin('[name].[contenthash:8].bundle.css'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
            minChunks: Infinity
        }),
        new InlineManifestWebpackPlugin({
            name: 'webpackManifest'
        }),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }),
        new HtmlWebpackPlugin({
            template: 'index.html', 
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }),
        new webpack.HashedModuleIdsPlugin()
    ]，
    output: {//hash输出
        path: path.join(process.cwd(), 'dist'),
        publicPath: '/',
        filename: '[name].[hash:8].bundle.js',
        chunkFilename: '[name].[hash:8].chunk.js'
    },
    devtool: 'inline-source-map',//编译调试
    devServer: {//中间件 解决开发跨域问题,webpackserver 
        host: 'localhost',//站点地址
        port: '8082',//端口
        stats: 'minimal',
        quiet: true,
        overlay: {
            errors: true
        },
        proxy: [//代理转发
            {
                context: ['/'],//api规则匹配
                target: 'http://10.48.186.92/wnjzyh/api_test/',//访问地址
                changeOrigin: true
            } 
        ]
    }
}
```

# Webapck启动执行顺序

```bash
npm run start -->webpackconfog.js
                -->webpack.dev.js webpack.entry.main
                    -->app/scripts/main.js
```
```js
//main.js
import Vue from 'vue';
import App from './components/app.vue'; 
import store from './store/store';  //vuex
import router from './routers/router';  //vueRoutr
export var myApp = new Vue({//实例
    store,
    router: router,
    render: h => h(App)//jsx?
})
myApp.$mount("#app");//挂载
```
```html 
<!-- index.html -->
<body>
    <div id="app"></div> 
</body>
```
```html
<!--app.vue -->
<template>
<div>
    <transition>
        <router-view></router-view>
    </transition>
    <loading></loading>
</div>
</template>
```



# Vue-Router

### 两种地址格式(hash，history) 地址格式
```bash
 hash: (http://localhost:8082/#/main/video)
 history: (http://localhost:8082/main/video) //404
```
#### 网站根目录web.config 文件，内容如下：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="Handle History Mode and custom 404/500" stopProcessing="true">
          <match url="(.*)" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

### Vue-Router访问顺序 
```bash
http://localhost:8082/ == {main.vue} 
    -->redirect：http://localhost:8082/#/main/video   == {video.vue}  
```

```js
import Vue from 'vue'; 
import axios from 'axios'; 
import main from './../components/main/main.vue'; 
import videoRouter from './video/videoRouter'; 
    //路由嵌套
const routes = [{
        path: '/',//地址
        component: main,//模块
        children: [{
                path: '/',
                redirect: '/main/video'//重定向
            },
            ...videoRouter 
        ]
    } 
];
```

```html
<!-- main.vue -->
<template>
<div id="fjMoPageWrap">
    <nav-list></nav-list> 
    <div id="moMainBodyCon">
        <div class="exportLocatCon"> 
            <div class="exportType" style="left:48%;"> 
                <router-link to="/main/video"  :class="{'selA':url.includes('/main/video')}">八闽视频</router-link>
                <router-link to="/main/data"  :class="{'selA':url.includes('/main/data')}">视频大数据</router-link>
                <router-link to="/main/assess"  :class="{'selA':url.includes('/main/assess')}">感知评估</router-link> 
            </div>
        </div>
        <transition>
            <!-- children -->
            <router-view></router-view>
        </transition>
    </div> 
</div>
</template> 
```

```js
//videoRouter.js
import video  from './../../components/video/video.vue';     
const videoRouter=[
    {path:'/main/video',component:video,meta: {scrollToTop: true}} 
]
export default videoRouter;
```


# Vue
```js
//业务层.js
import 'jquery-datetimepicker'; 
import { formDate } from './../../util/core'; 
import { mapState,mapGetters} from 'vuex';
import { DatePicker,Dialog} from 'element-ui';
export default {
    mixins: [commtable], //混入tabele表头隐藏，格式化等方法
    data() {//变量存放
        return {
            ywkang:''
        }
    },
    computed: {//计算属性 
        ...mapState({//直接拉取
            dataTime: state => state.cityViewModule.dataTime,//拉取时间展现 
        }),
        ...mapGetters({//异步计算拉取
            endTime: 'cityViewModule/endTime'
        }),
        content() {//依赖计算
            return `【八闽视频】查询审核：{uName},{time},审核原因:${this.msg};验证码:{smsCode}`;
        }
    },
    created() {//创建后
        this.$store.dispatch("mainModule/loginInfo", {}).then(res => {})
    },
    mounted() {//实例化
        $.datetimepicker.setLocale('ch');
        $('.sfTimeIn').datetimepicker(); 
        this.commonfn();//混入方法调用
    },
     methods: {//方法
        fileExp(){  
            this.$store.dispatch("mainModule/fileExp", {"btime":_b,"etime":_e,PAGE_TYPE: this.selected });
        }
    },
    filters: {//自定义局部过滤器
        //单位转换
        conversionUnit(value, fileDir) {
            if (fileDir === 1 || fileDir === 2) return "";
            var decimal = 2; //两位小数
            var v = value;
            if (v < 1024) return 1 + "KB";
            if ((v = parseFloat((value / 1024 / 1024 / 1024 / 1024))) >= 1) {
                return v.toFixed(decimal) + "TB";
            } else if ((v = parseFloat((value / 1024 / 1024 / 1024))) >= 1) {
                return v.toFixed(decimal) + "GB";
            } else if ((v = parseFloat((value / 1024 / 1024))) >= 1) {
                return v.toFixed(decimal) + "MB";
            } else if ((v = parseFloat((value / 1024))) >= 1) {
                return v.toFixed(decimal) + "KB";
            }
        } 
    },
    directives: { //自定义局部指令
        focus: {
            //当被绑定元素插入到DOM中时获取焦点
            inserted(el) {
                el.focus();
                //IE兼容性
                let l = el._value.length;
                el.selectionStart = l;
                el.selectionEnd = l;
            }
        }
    },
    components: { //自定义局部组件注册
        'el-date-picker': DatePicker,
        'el-dialog': Dialog
    }
}
```
# Vue[mixins]
```js
// commtable.js
export default { 
    methods: {//方法
        commonfn(){  
            this.$store.dispatch("mainModule/fileExp", {"btime":_b,"etime":_e,PAGE_TYPE: this.selected });
        }
    }
}
```

# Vuex（redux）
![vuex](./img/vuex.png)
```js
//vuex代码
import { post, get, all, formDate, upload } from './../../../util/core.js';
import axios from 'axios';
const state = {//声明
    dataTime: "",
    dataSurveyTime: [],
    dataGetSurvey: [],
    selected: 'min',
    county:''  ,
    active:''
}
const getters = {//依赖计算
    endTime(state) {//分钟，小时粒度截止时间计算
        return formDate(new Date(new Date(state.dataTime).getTime()+ {'min':0.25,'hour':1}[state.selected]* 60 * 60 * 1000),'hh:mm');
    }
}

//vuex状态记录未使用！！！！！
const actions = {//action
    getData: async ({ }, getParam) => {  
        getParam.hasOwnProperty('county')&&(state.county=getParam.county);
        state.selected = getParam.PAGE_TYPE;
        //拉取具体时间粒度
        let getTime = await get('/apiN/XHAPI/GetSurveyTime', getParam);//一个
        state.dataTime = getTime.data.Data; 
        getParam.SCAN_START_TIME = state.dataTime;
        
        //根据拉取具体时间粒度，获取数据列表
        let result = await all([get('/apiN/XHAPI/GetSurvey', getParam), get('/apiN/XHAPI/GetPoiList', getParam)]);//多个
        let dataSurveyTime = result[0].data;
        let dataGetSurvey = result[1].data;
        dataSurveyTime.IsSuccess&&(state.dataSurveyTime = dataSurveyTime.Data);
        dataGetSurvey.IsSuccess&&(state.dataGetSurvey = dataGetSurvey.Data);
    },
     getActive({ commit, state }, params) {
        commit("GET_ACTIVE", params);//提交改变
    }
}

const mutations = {//记录每次变化
    ["GET_ACTIVE"](state, data) {
        state.active = data;
    }
}
const cityViewModule = {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
};
export default cityViewModule;
```

# Axios

```js
//业务层调用methods，异步接口
this.$store.dispatch('assessModule/getTableData', expParam).then((res) => {
        this.$message.success('查询成功');
    }).catch((error) => { 
        this.$message.error('短信验证码错误或者过期！');
});
```

```js
//异步接口vuex-> Module
import { post, get, all} from './../../util/core.js';
import axios from 'axios';
const state = {
    dataDataEvent: [],
    dataDataGoal: []
}

const actions = {
    //获取表格数据
    getTableData: async ({}, getParam = { beginTime: '', endTime: '' }) => {
        state.param = getParam;
        let result = await all([get('/api/fmcc/perceive/goal', getParam), get('/api/fmcc/perceive/event', getParam)]);//等待异步回调
        state.dataDataGoal = result[0].data;
        state.dataDataEvent = result[1].data;
    } 
}
const assessModule = {
    namespaced: true,
    state,
    actions 
};
export default assessModule;
```
# ES6+（依赖Babel/chrome62+） 
1. 异步请求：async,await，eg如上；
2. 解构如下
```js 
//Array
    let [a,b]=arr[0,1];
   console.log(a,b);//0,1
//Objcet
    let {name,age}={name:'YWKANG',age:'xxx',pag:'yy'};
    let param={name,age};//{name:'YWKANG',age:'xxx',pag:'yy'};
    console.log(name,age);//YWKANG,xxx
//... jquery:$.extend ,浅拷贝
    let startTime={time:'2018/05/12'};
    let ctiy={name:'福州',id：'0591'};
   
    //ES6:Object.assign() 
    let exParam=Object.assign(startTime,ctiy);
    console.log(exParam);//{time:'2018/05/12',name:'福州'，id：'0591'}
    //...
    let exParam={...startTime,...ctiy};
    console.log(exParam);//{time:'2018/05/12',name:'福州'，id：'0591'}
```
3. 是否含有：
```js
    ES5-:string.indexOf('xx')!=-1//Bool
    ES6-:string.include('xx')//Bool
```
4. 默认传参：
```js
    function fnSetTimeout(dleay=30){
        console.log(dleay)
    }
    fnSetTimeout()//30
    fnSetTimeout(60)//60
```
5. =>箭头函数
```js
    var sum=function(a,b){
        return a+b
    } 
    sum(0,1);

    var sumES6=(a,b)=>a+b;
    sumES6(1,2);
```
 

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
    objPratent.obj.getName();//ywkang
    var objWindow=objPratent.obj.getName;
    objWindow();//ywkang

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
    objPratent.obj.getName();//ywkang
    var objWindow=objPratent.obj.getName;
    objWindow();//ywkang

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
```js
//实例解决
5.6.1.   //实例 that暂存
    var obj = {
        func: function() {
                console.log('func')
        },  
        getThis: function () {
                var that=this;
                setTimeout(function(){
                        that.func()
                });
            }
    }
    obj.getThis(); // func


5.6.2  //实例 bind绑定
    var obj = {
        func: function() {
                console.log('func')
        },  
        getThis: function () {
                setTimeout(function(){
                      this.func()
                }.bind(this));
            }
        }
    obj.getThis(); // func

 
5.6.3  //实例 箭头函数
    var obj = {
        func: function() {
                console.log('func')
        },  
        getThis: function () {
                setTimeout(() => { 
                    this.func()
                });
            }
        }
    obj.getThis(); // func 
```
  6.模板字符串
```js
    var obj={
        name:'ywkang',
        age:'xx'
    }
    console.log(`姓名:${obj.name}年龄:${obj.age}`);//姓名:ywkang年龄:xx
```

# Vue-jsx（react.js）智能路测
```js
    renderHeader(createElement, { column}) {//隐藏列表头渲染，事件绑定
            return createElement(
                'div', [
                    '文本节点',
                    createElement('a', {
                        class: {
                            plusTwo: true //样式
                        },
                        on: {
                            click: () => {//触发事件
                                this.showcol(column)
                            }
                        }
                    })
                ]
            );
        }
 ```
# 工具方法
 ```bash
# util/tools.js //请求/时间转换/参数转换
# util/core.js //数据校验
# routers/router.js 
1. 拦截校验
2. 权限校验
3. 请求头部设置
4. * 公共请求链接设置
# filter/filter.js//数据转换显示
# directives/directive.js//dom操作
 ```

 
 # Element-ui
```bash
详细见八闽视频开发;
```

# 注意
 * 编辑器推荐vscode，集成node环境便于开发，插件资源丰富推荐插件：
    1. 语法高亮：vetur。
    2. 路径提示补齐： path intellisense。
    3. 编译器调试：Debugger for Chrome js。
 * js开发规范
    1. 文件名，变量名注意命名规范。
    2. js中尽量少抒写id操作dom，减少dom操作，按照业务方式命名避免重复。
    3. 代码中on事件在组件生命周期结束时请自行销毁，避免全局污染。
    4. 异步请求统一存放[name]Moulde.js。
 * css开发规范
    1. css中避免大量的死代码，无效的图片路径，内联样式，影响性能及后期维护成本。
    2. css原则上禁止id选择器。
    3. html body标签避免出现类或者样式选择器。
    4. 引入字体、样式；非独立组件，独立样式作用域，引入请在polyfill.js。
 * vue开发规范
    1. 禁止v-for与v-if在同一节点上使用
    2. v-for中必须:key
    
    
 * PS：纯属个人理解如有错误，请及时指正谢谢！
 * @Author: ywkang 
 * @Date: 2018-07-27 17:32:48 
 * @Last Modified by: ywkang
 * @Last Modified time: 2018-07-27 17:34:15
 
 


