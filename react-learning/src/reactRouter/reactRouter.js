import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import demo1 from "./demo1/demo1";
import demo2 from "./demo2/demo2";
import demo3 from "./demo3/demo3";
import demo4 from "./demo4/demo4";
import demo5 from "./demo5/demo5";
import demo6 from "./demo6/demo6";
import demo7 from "./demo7/demo7";
import demo8 from "./demo8/demo8";
import demo9 from "./demo9/demo9";
import demo10 from "./demo10/demo10";
import demo11 from "./demo11/demo11";
import "../styles/App.css";
class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <ol>
                        <li>
                            <Link to="/demo1">demo1 子路由实现的</Link>
                        </li>
                        <li>
                            <Link to="/demo2">demo2 匹配路径参数</Link>
                        </li>
                        <li>
                            <Link to="/demo3">demo3 登录认证</Link>
                        </li>
                        <li>
                            <Link to="/demo4">demo4 自定义链接</Link>
                        </li>

                        <li>
                            <Link to="/demo5">demo5 阻止导航</Link>
                        </li>
                        <li>
                            <Link to="/demo6">demo6 未匹配（404页面）</Link>
                        </li>
                        <li>
                            <Link to="/demo7">demo7 路径递归</Link>
                        </li>

                        <li>
                            <Link to="/demo8">demo8 展示两组Routes</Link>
                        </li>
                        <li>
                            <Link to="/demo9">demo9 模糊匹配</Link>
                        </li>
                        <li>
                            <Link to="/demo10">demo10 路由传参</Link>
                        </li>

                        <li>
                            <Link to="/demo11">demo11 配置路由</Link>
                        </li>
                    </ol>
                    <Route exact path="/demo1" component={demo1} />
                    <Route exact path="/demo2" component={demo2} />
                    <Route exact path="/demo3" component={demo3} />
                    <Route exact path="/demo4" component={demo4} />
                    <Route exact path="/demo5" component={demo5} />
                    <Route exact path="/demo6" component={demo6} />
                    <Route exact path="/demo7" component={demo7} />
                    <Route exact path="/demo8" component={demo8} />
                    <Route exact path="/demo9" component={demo9} />
                    <Route exact path="/demo10" component={demo10} />
                    <Route exact path="/demo11" component={demo11} />
                </div>
            </Router>
        );
    }
}

export default App;
