import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Prompt } from "react-router-dom";

class demo5 extends Component {
    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/home">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                    </ul>
                    <hr />
                    <Route path="/home" component={Home} />
                    <Route path="/about" component={About} />
                    <em>
                        阻止导航也是一个较简单的示例。其核心就是Prompt组件。它有一个message属性，当导航离开当前page的时候，会提示这个message信息。它的另一个重要的属性是when属性，when属性的作用是当它的值为true时，才会触发消息提示，值为false的时候，不会触发消息提示。
                    </em>
                </div>
            </Router>
        );
    }
}

class Home extends Component {
    render() {
        return (
            <h1>
                Home
                <Prompt
                    when={true}
                    message={location =>
                        `Are you sure you want to go to ${location.pathname}`
                    }
                />
            </h1>
        );
    }
}
class About extends Component {
    render() {
        return <h1>About</h1>;
    }
}

export default demo5;
