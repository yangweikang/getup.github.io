import React, {Component} from 'react';
import { BrowserRouter as Router,Route, Link} from 'react-router-dom';

class OldSchoolMenuLink extends Component{
    render(){
        return (
            <Route path={this.props.path} children={(props)=>{
                console.log(props)
                return <li>
                    {props.match ? ">" : ""}
                    <Link
                        to={this.props.path}>
                        {this.props.label}
                    </Link>
                </li>
            }} />
        )
    }
}

class App extends Component {
    
    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <OldSchoolMenuLink exact={true} path="/home" label="Home"/>
                        <OldSchoolMenuLink path="/about" label="About"/>
                    </ul>
                    <hr/>
                    <Route path="/home" component={Home} />
                    <Route path="/about" component={About} />
                    <em>Route组件是核心，它有一个children属性，这个属性会根据Route组件的路径匹配情况，做不同的东西，它会有一个参数，接受一个props</em>
                </div>
            </Router>
        );
    }
}

class Home extends Component{
    render(){
        return (
            <h1>Home</h1>
        )
    }
}
class About extends Component{
    render(){
        return (
            <h1>About</h1>
        )
    }
}

export default App;