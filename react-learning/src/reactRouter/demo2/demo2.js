import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import child from "./child/child";

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <h2>账号</h2>
                    <ul>
                        <li>
                            <Link to="/react-router">React Router</Link>
                        </li>
                        <li>
                            <Link to="/leoashin">LeoAshin</Link>
                        </li>
                        <li>
                            <Link to="/justjavac">justjavac</Link>
                        </li>
                        <li>
                            <Link to="/reacttraining">React Training</Link>
                        </li>
                    </ul>
                    <hr />
                    <Route path="/:id" component={child} />
                    <hr/>
                    <em>
                        这样的路由设置中，多个Link组件对应一个组件——Child组件。
                        匹配的参数是通过 path=’/:id’ 的方式来实现的。
                        在子页面是这样获取的：var id =this.props.match.params.id;
                    </em>
                </div>
            </Router>
        );
    }
}

export default App;
