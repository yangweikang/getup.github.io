import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./home/Home";
import About from "./about/About";
import Topics from "./topics/Topics";

class demo1 extends Component {
    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/">首页</Link>
                        </li>
                        <li>
                            <Link to="/about">关于</Link>
                        </li>
                        <li>
                            <Link to="/topics">主题列表</Link>
                        </li>
                    </ul>
                    <hr />
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/topics" component={Topics} /> 
                    <em>子路由使用到的Topic组件，非常简单，仅仅是用来展示Topics组件传递下来的topicId</em>
                </div>
               
            </Router>
        );
    }
}

export default demo1;
