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
class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <ol>
                        <li>
                            <Link to="/demo1">demo1 三子棋</Link>
                        </li>
                        <li>
                            <Link to="/demo2">Hello World</Link>
                        </li>
                        <li>
                            <Link to="/demo3">事件行为</Link>
                        </li>
                        <li>
                            <Link to="/demo4">条件渲染</Link>
                        </li>
                        <li>
                            <Link to="/demo5">列表&Keys</Link>
                        </li>
                        <li>
                            <Link to="/demo6">表单</Link>
                        </li>
                        <li>
                            <Link to="/demo7">状态提升</Link>
                        </li>
                        <li>
                            <Link to="/demo8">组合 vs 继承</Link>
                        </li>
                        <li>
                            <Link to="/demo9">开发理念</Link>
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
                </div>
            </Router>
        );
    }
}

export default App;
