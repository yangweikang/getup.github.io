## Long term cache ：Webpack针对第三方js库的持久化缓存解决方案:

#### 背景：
``` bash
    架构：Vue+Webpcak+Jquery+Echars单页应用
    前提：项目开发中应用过多的第三方插件库，如Echars,Jquery，这种第三方库，至于为什么项目中引入这些库有些事历史原因有些则是需求原因；
    导致：由于页面采用单页形式导致一个，js过大；
    解决：分离出第三方库；
```
#### webpack分离第三方库,部分配置webpack@3.6.0如下：
```js
module.exports = {
    entry: {
        'vendor': ['jquery']
    },   
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
            minChunks: Infinity
        })
    ]
}
```
#### 触发问题
    1. Webpack每次打包出的第三方库（vendor.[hash].js）js总是在变化不利于缓存！
    
##### 解决：
>为什么我没有改动库的源码hash值为什么会改变呢？

* 这样就浮出webpack三种hash值输出：

    1.1 hash：该hash计算方式是计算所有chunks的 hash->适用于dev环境;

    1.2 chunkhash：为每个chunk计算hash->适用于prod环境；
    
    1.3 contenthash：根据文件内容计算hash->适用于css文件；
>总结：综上选择1.2解决hash变动问题；
* 配置：
```js
     output: {
        filename: '[name].[chunkhash:8].bundle.js',
        chunkFilename: '[name].[chunkhash:8].bundle.js',
    }
```
    注意：不能和热编译模块一起使用该hash；

#### 触发问题      
    2. 采用manifest解决了，异动的js变化但是，多了manifest.js增加web请求！
##### 解决
    因为这个代码manifest量并不是很大所以，内联进index.html，需要两个插件：
    1. html-webpack-plugin@2.30.1
    2. inline-manifest-webpack-plugin@3.0.1
* 配置：
```js
     new InlineManifestWebpackPlugin({
        name: 'webpackManifest'
    }),
    new HtmlWebpackPlugin({
        template: 'index.html', 
        inject: true
    })
```

>扩展前端部署：https://www.zhihu.com/question/20790576/answer/32602154
    