import React,{Component} from "react";
import {BrowserRouter as Router, Route,Link} from 'react-router-dom';
import demo1 from "./demo1/demo1";
import demo2 from "./demo2/demo2";
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
                       
                    </ol>
                    <Route exact path="/demo1" component={demo1} />
                    <Route exact path="/demo2" component={demo2} />
                    
                     
                </div>
            </Router>
        );
    }
}

export default App;