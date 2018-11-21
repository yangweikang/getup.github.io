import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const routes = [
    {
        path: "/",
        exact: true,
        sidebar: () => <div>home!</div>,
        main: () => <h2>Home</h2>
    },
    {
        path: "/bubblegum",
        sidebar: () => <div>bubblegum!</div>,
        main: () => <h2>Bubblegum</h2>
    },
    {
        path: "/shoelaces",
        sidebar: () => <div>shoelaces!</div>,
        main: () => <h2>Shoelaces</h2>
    }
];

class demo8 extends Component {
    render() {
        return (
            <Router>
                <div>
                    <div style={{ display: "flex" }}>
                        <div
                            style={{
                                width: "200px",
                                backgroundColor: "#cccccc"
                            }}
                        >
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/bubblegum">Bubblegum</Link>
                                </li>
                                <li>
                                    <Link to="/shoelaces">Shoelaces</Link>
                                </li>
                            </ul>
                            {routes.map((item, index) => {
                                return (
                                    <Route
                                        exact={item.exact}
                                        key={index}
                                        path={item.path}
                                        component={item.sidebar}
                                    />
                                );
                            })}
                        </div>
                        <div style={{ flex: 1 }}>
                            {routes.map((item, index) => {
                                return (
                                    <Route
                                        exact={item.exact}
                                        key={index}
                                        path={item.path}
                                        component={item.main}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <hr />
                    <em>
                        Route的展示是通过对routes数组进行两次map遍历得到的！
                    </em>
                </div>
            </Router>
        );
    }
}

export default demo8;
