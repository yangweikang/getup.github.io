import React, { Component } from "react";

function formatName(user) {
    return user.firstName + user.lastName;
}
const user = {
    firstName: "yang",
    lastName: "wk"
};
const HelloWho = <h1>Hello,{formatName(user)}</h1>;

class HiWho extends Component {
    render() {
        return HelloWho;
    }
}

class Tick extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date().toLocaleTimeString()
        };
    }
    componentDidMount() {
        console.log("组件第一次加载到DOM中的时候执行");
        this.timer = setInterval(() => this.tick(), 1000);
    }
    componentWillUnmount() {
        console.log("DOM被移除的时候执行");
        clearInterval(this.timer);
    }
    tick() {
        this.setState({
            time: new Date().toLocaleTimeString()
        });
    }
    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.time}.</h2>
            </div>
        );
    }
}

class HelloProps extends Component {
    render() {
        return <h1>Hello props ,{this.props.name}</h1>;
    }
}

class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    tick() {
      this.setState({
        date: new Date()
      });
    }
  
    render() {
      return (
        <div>
          <h1>Hello, world!</h1>
          <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>
      );
    }
  }
 
class HelloWorld extends Component {
    render() {
        return (
            <div>
                <h1> Hello World</h1>
                <HiWho />
                <Tick />
                <Clock />
                <HelloProps name="YWKANG this props 1" />
                <HelloProps name="YWKANG this props 2" />
                <HelloProps name="YWKANG this props 3" />
                <Clock />
            </div>
        );
    }
}




setInterval(HelloWorld.render, 1000);

export default HelloWorld;
