### webpack基础
```js
module.exports = {
    entry: {
        'main': ['babel-polyfill', './scripts/main.js', './scripts/polyfill.js'],
        'vendor': ['jquery']
    },
    /*
        1. entry是配置模块的入口，可抽象成输入，Webpack 执行构建的第一步将从入口开始搜寻及递归解析出所有入口依赖的模块。 
         string array object:

        2. Chunk 名称
         Webpack 会为每个生成的 Chunk 取一个名称，Chunk 的名称和 Entry 的配置有关：
            如果 entry 是一个 string 或 array，就只会生成一个 Chunk，这时 Chunk 的名称是 main；
            如果 entry 是一个 object，就可能会出现多个 Chunk，这时 Chunk 的名称是 object 键值对里键的名称。
        3. 动态配置
            假如项目里有多个页面需要为每个页面的入口配置一个 Entry ，但这些页面的数量可能会不断增长，则这时 Entry 的配置会受到到其他因素的影响导致不能写成静态的值。其解决方法是把 Entry 设置成一个函数去动态返回上面所说的配置，代码如下：
                // 同步函数
                entry: () => {
                return {
                    a:'./pages/a',
                    b:'./pages/b',
                }
                };
                // 异步函数
                entry: () => {
                return new Promise((resolve)=>{
                    resolve({
                    a:'./pages/a',
                    b:'./pages/b',
                    });
                });
                };
    */
   output: {
       
        filename: '[name].[chunkhash:8].bundle.js',
         /*
            id	Chunk 的唯一标识，从0开始
            name	Chunk 的名称
            hash	Chunk 的唯一标识的 Hash 值
            chunkhash	Chunk 内容的 Hash 值
            其中 hash 和 chunkhash 的长度是可指定的，[hash:8] 代表取8位 Hash 值，默认是20位。
         */
        chunkFilename: '[name].[chunkhash:8].bundle.js',
        /*
            配置无入口的 Chunk 在输出时的文件名称。
            chunkFilename 和上面的 filename 非常类似，但 chunkFilename 只用于指定在运行过程中生成的 Chunk 在输出时的文件名称。 
            常见的会在运行时生成 Chunk 场景有在使用 CommonChunkPlugin、使用 import('path/to/module') 动态加载等时。
             chunkFilename 支持和 filename 一致的内置变量。
        */
        path: path.join(process.cwd(), 'dist'),
        /*
            output.path 配置输出文件存放在本地的目录，必须是 string 类型的绝对路径。通常通过 Node.js 的 path 模块去获取绝对路径：
            path: path.resolve(__dirname, 'dist_[hash]')
        */
        publicPath: './',
        /*
            在复杂的项目里可能会有一些构建出的资源需要异步加载，加载这些异步资源需要对应的 URL 地址。
            output.publicPath 配置发布到线上资源的 URL 前缀，为string 类型。 默认值是空字符串 ''，即使用相对路径。
            这样说可能有点抽象，举个例子，需要把构建出的资源文件上传到 CDN 服务上，以利于加快页面的打开速度。配置代码如下：
            filename:'[name]_[chunkhash:8].js'
            publicPath: 'https://cdn.example.com/assets/'

            这时发布到线上的 HTML 在引入 JavaScript 文件时就需要：
            <script src='https://cdn.example.com/assets/a_12345678.js'></script>
            使用该配置项时要小心，稍有不慎将导致资源加载404错误。
            output.path 和 output.publicPath 都支持字符串模版，内置变量只有一个：hash 代表一次编译操作的 Hash 值。
        */


       /*
       crossOriginLoading
            Webpack 输出的部分代码块可能需要异步加载，而异步加载是通过 JSONP 方式实现的。 JSONP 的原理是动态地向 HTML 中插入一个 <script src="url"></script> 标签去加载异步资源。 output.crossOriginLoading 则是用于配置这个异步插入的标签的 crossorigin 值。

            script 标签的 crossorigin 属性可以取以下值：

            anonymous(默认) 在加载此脚本资源时不会带上用户的 Cookies；
            use-credentials 在加载此脚本资源时会带上用户的 Cookies。
            通常用设置 crossorigin 来获取异步加载的脚本执行时的详细错误信息。

        libraryTarget 和 library
            当用 Webpack 去构建一个可以被其他模块导入使用的库时需要用到它们。

            output.libraryTarget 配置以何种方式导出库。
            output.library 配置导出库的名称。
            它们通常搭配在一起使用。

        output.libraryTarget 是字符串的枚举类型，支持以下配置。

            var (默认)
                编写的库将通过 var 被赋值给通过 library 指定名称的变量。

                假如配置了 output.library='LibraryName'，则输出和使用的代码如下：

                // Webpack 输出的代码
                    var LibraryName = lib_code;

                // 使用库的方法
                    LibraryName.doSomething();
                    假如 output.library 为空，则将直接输出：

            lib_code
                其中 lib_code 代指导出库的代码内容，是有返回值的一个自执行函数。

            commonjs
                编写的库将通过 CommonJS 规范导出。

            假如配置了 output.library='LibraryName'，则输出和使用的代码如下：

                // Webpack 输出的代码
                exports['LibraryName'] = lib_code;

                // 使用库的方法
                require('library-name-in-npm')['LibraryName'].doSomething();
                其中 library-name-in-npm 是指模块发布到 Npm 代码仓库时的名称。

            commonjs2
                编写的库将通过 CommonJS2 规范导出，输出和使用的代码如下：

                // Webpack 输出的代码
                module.exports = lib_code;

                // 使用库的方法
                require('library-name-in-npm').doSomething();
                CommonJS2 和 CommonJS 规范很相似，差别在于 CommonJS 只能用 exports 导出，而 CommonJS2 在 CommonJS 的基础上增加了 module.exports 的导出方式。

                在 output.libraryTarget 为 commonjs2 时，配置 output.library 将没有意义。

            this
                编写的库将通过 this 被赋值给通过 library 指定的名称，输出和使用的代码如下：

                // Webpack 输出的代码
                this['LibraryName'] = lib_code;

                // 使用库的方法
                this.LibraryName.doSomething();
            window
                编写的库将通过 window 被赋值给通过 library 指定的名称，即把库挂载到 window 上，输出和使用的代码如下：

                // Webpack 输出的代码
                window['LibraryName'] = lib_code;

                // 使用库的方法
                window.LibraryName.doSomething();
            global
                编写的库将通过 global 被赋值给通过 library 指定的名称，即把库挂载到 global 上，输出和使用的代码如下：

                // Webpack 输出的代码
                global['LibraryName'] = lib_code;

                // 使用库的方法
                global.LibraryName.doSomething();
            libraryExport
                output.libraryExport 配置要导出的模块中哪些子模块需要被导出。 它只有在 output.libraryTarget 被设置成 commonjs 或者 commonjs2 时使用才有意义。

                假如要导出的模块源代码是：

                export const a=1;
                export default b=2;
                现在你想让构建输出的代码只导出其中的 a，可以把 output.libraryExport 设置成 a，那么构建输出的代码和使用方法将变成如下：

                // Webpack 输出的代码
                module.exports = lib_code['a'];

                // 使用库的方法
                require('library-name-in-npm')===1;
       */
    },
    context: path.join(process.cwd(), 'app'),
    /*
        Webpack 在寻找相对路径的文件时会以 context 为根目录，context 默认为执行启动 Webpack 时所在的当前工作目录。 如果想改变 context 的默认配置，则可以在配置文件里这样设置它：
        注意， context 必须是一个绝对路径的字符串。 除此之外，还可以通过在启动 Webpack 时带上参数 webpack --context 来设置 context。
    */
    resolve: {
    /*
        Webpack 在启动后会从配置的入口模块出发找出所有依赖的模块，Resolve 配置 Webpack 如何寻找模块所对应的文件。 Webpack 内置 JavaScript 模块化语法解析功能，默认会采用模块化标准里约定好的规则去寻找，但你也可以根据自己的需要修改默认的规则。
    */
        modules: [
            'node_modules',
            path.resolve(process.cwd(), 'app')
        ],
        /*
            resolve.modules 配置 Webpack 去哪些目录下寻找第三方模块，默认是只会去 node_modules 目录下寻找。
             有时你的项目里会有一些模块会大量被其它模块依赖和导入，由于其它模块的位置分布不定，针对不同的文件都要去计算被导入模块文件的相对路径， 这个路径有时候会很长，就像这样 import '../../../components/button' 这时你可以利用 modules 配置项优化，假如那些被大量导入的模块都在 ./src/components 目录下，把 modules 配置成
            modules:['./src/components','node_modules']
            后，你可以简单通过 import 'button' 导入。
        
        */
        alias: {
            'jquery': path.resolve(process.cwd(), './node_modules/jquery/dist/jquery.min.js'),
            'md5': path.resolve(process.cwd(), './node_modules/md5/md5.js'),
            'vue': path.resolve(process.cwd(), './node_modules/vue/dist/vue.min.js'),
            'vue-router': path.resolve(process.cwd(), './node_modules/vue-router/dist/vue-router.min.js'),
            'vuex': path.resolve(process.cwd(), './node_modules/vuex/dist/vuex.min.js')
        },
        /*
        resolve.alias 配置项通过别名来把原导入路径映射成一个新的导入路径。例如使用以下配置：
            // Webpack alias 配置
            resolve:{
                alias:{
                    components: './src/components/'
                }
            }
            当你通过 import Button from 'components/button' 导入时，实际上被 alias 等价替换成了 import Button from './src/components/button'。

            以上 alias 配置的含义是把导入语句里的 components 关键字替换成 ./src/components/。

            这样做可能会命中太多的导入语句，alias 还支持 $ 符号来缩小范围到只命中以关键字结尾的导入语句：

            resolve:{
                alias:{
                    'react$': '/path/to/react.min.js'
                }
            }
            react$ 只会命中以 react 结尾的导入语句，即只会把 import 'react' 关键字替换成 import '/path/to/react.min.js'。
        */
        extensions: ['.vue', '.js', '.css', '.less']
        /*
            在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在。 resolve.extensions 用于配置在尝试过程中用到的后缀列表，默认是：
            extensions: ['.js', '.json']
            也就是说当遇到 require('./data') 这样的导入语句时，Webpack 会先去寻找 ./data.js 文件，如果该文件不存在就去寻找 ./data.json 文件， 如果还是找不到就报错。

            假如你想让 Webpack 优先使用目录下的 TypeScript 文件，可以这样配置：

            extensions: ['.ts', '.js', '.json']
        
        */


        /*
        mainFields
            有一些第三方模块会针对不同环境提供几分代码。 例如分别提供采用 ES5 和 ES6 的2份代码，这2份代码的位置写在 package.json 文件里，如下：

                {
                "jsnext:main": "es/index.js",// 采用 ES6 语法的代码入口文件
                "main": "lib/index.js" // 采用 ES5 语法的代码入口文件
                }
            Webpack 会根据 mainFields 的配置去决定优先采用那份代码，mainFields 默认如下：

                mainFields: ['browser', 'main']
                Webpack 会按照数组里的顺序去package.json 文件里寻找，只会使用找到的第一个。

                假如你想优先采用 ES6 的那份代码，可以这样配置：

                mainFields: ['jsnext:main', 'browser', 'main']
        
        */

       /*
            descriptionFiles
            resolve.descriptionFiles 配置描述第三方模块的文件名称，也就是 package.json 文件。默认如下：

            descriptionFiles: ['package.json']
            enforceExtension
            resolve.enforceExtension 如果配置为 true 所有导入语句都必须要带文件后缀， 例如开启前 import './foo' 能正常工作，开启后就必须写成 import './foo.js'。

            enforceModuleExtension
            enforceModuleExtension 和 enforceExtension 作用类似，但 enforceModuleExtension 只对 node_modules 下的模块生效。 enforceModuleExtension 通常搭配 enforceExtension 使用，在 enforceExtension:true 时，因为安装的第三方模块中大多数导入语句没带文件后缀， 所以这时通过配置 enforceModuleExtension:false 来兼容第三方模块。
       */
    },
    module: {
        rules: [{
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
            }
        ]
        /*
            rules 配置模块的读取和解析规则，通常用来配置 Loader。其类型是一个数组，数组里每一项都描述了如何去处理部分文件。 配置一项 rules 时大致通过以下方式：
                条件匹配：通过 test 、 include 、 exclude 三个配置项来命中 Loader 要应用规则的文件。
                应用规则：对选中后的文件通过 use 配置项来应用 Loader，可以只应用一个 Loader 或者按照从后往前的顺序应用一组 Loader，同时还可以分别给 Loader 传入参数。
                重置顺序：一组 Loader 的执行顺序默认是从右到左执行，通过 enforce 选项可以让其中一个 Loader 的执行顺序放到最前或者最后。
            rules: [
                        {
                            // 命中 JavaScript 文件
                            test: /\.js$/,
                            // 用 babel-loader 转换 JavaScript 文件
                            // ?cacheDirectory 表示传给 babel-loader 的参数，用于缓存 babel 编译结果加快重新编译速度
                            use: ['babel-loader?cacheDirectory'],
                            // 只命中src目录里的js文件，加快 Webpack 搜索速度
                            include: path.resolve(__dirname, 'src')
                        },
                        {
                            // 命中 SCSS 文件
                            test: /\.scss$/,
                            // 使用一组 Loader 去处理 SCSS 文件。
                            // 处理顺序为从后到前，即先交给 sass-loader 处理，再把结果交给 css-loader 最后再给 style-loader。
                            use: ['style-loader', 'css-loader', 'sass-loader'],
                            // 排除 node_modules 目录下的文件
                            exclude: path.resolve(__dirname, 'node_modules'),
                        },
                        {
                            // 对非文本文件采用 file-loader 加载
                            test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
                            use: ['file-loader'],
                        },
                    ]
            在 Loader 需要传入很多参数时，你还可以通过一个 Object 来描述，例如在上面的 babel-loader 配置中有如下代码：
                use: [
                        {
                            loader:'babel-loader',
                            options:{
                            cacheDirectory:true,
                            },
                            // enforce:'post' 的含义是把该 Loader 的执行顺序放到最后
                            // enforce 的值还可以是 pre，代表把 Loader 的执行顺序放到最前面
                            enforce:'post'
                        },
                        // 省略其它 Loader
                ]
                上面的例子中 test include exclude 这三个命中文件的配置项只传入了一个字符串或正则，其实它们还都支持数组类型，使用如下：

                {
                    test:[
                        /\.jsx?$/,
                        /\.tsx?$/
                    ],
                    include:[
                        path.resolve(__dirname, 'src'),
                        path.resolve(__dirname, 'tests'),
                    ],
                    exclude:[
                        path.resolve(__dirname, 'node_modules'),
                        path.resolve(__dirname, 'bower_modules'),
                    ]
                }
                数组里的每项之间是或的关系，即文件路径符合数组中的任何一个条件就会被命中。
        noParse
                noParse 配置项可以让 Webpack 忽略对部分没采用模块化的文件的递归解析和处理，这样做的好处是能提高构建性能。 原因是一些库例如 jQuery 、ChartJS 它们庞大又没有采用模块化标准，让 Webpack 去解析这些文件耗时又没有意义。

                noParse 是可选配置项，类型需要是 RegExp、[RegExp]、function 其中一个。

                例如想要忽略掉 jQuery 、ChartJS，可以使用如下代码：

                // 使用正则表达式
                noParse: /jquery|chartjs/

                // 使用函数，从 Webpack 3.0.0 开始支持
                noParse: (content)=> {
                // content 代表一个模块的文件路径
                // 返回 true or false
                return /jquery|chartjs/.test(content);
                }
                注意被忽略掉的文件里不应该包含 import 、 require 、 define 等模块化语句，不然会导致构建出的代码中包含无法在浏览器环境下执行的模块化语句。
        parser
                因为 Webpack 是以模块化的 JavaScript 文件为入口，所以内置了对模块化 JavaScript 的解析功能，支持 AMD、CommonJS、SystemJS、ES6。 parser 属性可以更细粒度的配置哪些模块语法要解析哪些不解析，和 noParse 配置项的区别在于 parser 可以精确到语法层面， 而 noParse 只能控制哪些文件不被解析。 parser 使用如下：

                rules: [
                        {
                        test: /\.js$/,
                        use: ['babel-loader'],
                        parser: {
                        amd: false, // 禁用 AMD
                        commonjs: false, // 禁用 CommonJS
                        system: false, // 禁用 SystemJS
                        harmony: false, // 禁用 ES6 import/export
                        requireInclude: false, // 禁用 require.include
                        requireEnsure: false, // 禁用 require.ensure
                        requireContext: false, // 禁用 require.context
                        browserify: false, // 禁用 browserify
                        requireJs: false, // 禁用 requirejs
                        }
                    },
                 ]
        */

       
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new ExtractTextPlugin('[name].[contenthash:8].bundle.css'),
        /*
            注意 ExtractTextWebpackPlugin 插件是使用 contenthash 来代表哈希值而不是 chunkhash， 原因在于 ExtractTextWebpackPlugin 提取出来的内容是代码内容本身而不是由一组模块组成的 Chunk。
        */
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
            // favicon: './favicon.ico',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }),
        new webpack.HashedModuleIdsPlugin()

    ]
}
```