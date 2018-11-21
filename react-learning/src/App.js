import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import reactRouter from "./reactRouter/reactRouter";
import reactDemo from "./react/reactDemo";
class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <ol>
                        <li>
                            <Link to="/reactDemo">react demos</Link>
                        </li>
                        <li>
                            <Link to="/reactRouter">reactRouter demos</Link>
                        </li>
                    </ol>
                    <Route exact path="/reactDemo" component={reactDemo} />
                    <Route exact path="/reactRouter" component={reactRouter} />
                    
                </div>
            </Router>
        );
    }
}

export default App;
