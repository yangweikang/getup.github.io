import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom';


class demo6 extends Component {
    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/old-match">Old Match, to be redirected</Link></li>
                        <li><Link to="/will-match">Will Match</Link></li>
                        <li><Link to="/will-not-match">Will Not Match</Link></li>
                        <li><Link to="/also/will/not/match">Also Will Not Match</Link></li>
                    </ul>
                    <hr/>
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Redirect from="/old-match" to="/will-match"/>
                        <Route path="/will-match" component={WillMatch}/>
                        <Route component={NoMatch}/>
                    </Switch>
                    <hr/>
            <em>使用Switch组件，匹配第一个符合条件的Route，然后把一个无path的Route组件，写在Switch的最后一项，这样就能在匹配不到合适的组件的时候，总能匹配到最后一个Route对应的组件。</em>
                </div>
            </Router>
        );
    }
}

class Home extends Component{
    render(){
        return (
            <h1>
                Switch组件返回第一个匹配成功的Route路由。但是还有一个Route组件没有path，它能够被任何路径匹配到！！！
            </h1>
          
        )
    }
}
class WillMatch extends Component{
    render(){
        return (
            <h1>Matched</h1>
        )
    }
}
class NoMatch extends Component{
    render(){
        return (
            <h1>NoMatch for {this.props.location.pathname}</h1>
        )
    }
}

export default demo6;
 