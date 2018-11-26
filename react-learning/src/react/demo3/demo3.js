import React, { Component } from "react";
//事件处理
class Popper extends Component {
    constructor() {
        super();
        this.state = { name: "Hello world!" };
    }

    preventPop(name, e) {
        //事件对象e要放在最后
        // e 是一个合成事件。React 根据 W3C spec 来定义这些合成事件，所以你不需要担心跨浏览器的兼容性问题。查看 SyntheticEvent 参考指南来了解更多。
        e.preventDefault();
        alert(name);
    }

    render() {
        return (
            <div>
                <p>hello</p>
                {/* Pass params via bind() method. */}
                <a
                    href="https://reactjs.org"
                    onClick={this.preventPop.bind(this, this.state.name)}
                >
                    Click
                </a>
            </div>
        );
    }
}

class Toggle extends Component {
    constructor(props) {
        super(props);
        this.state = { isToggleOn: true };
        //解决方法一
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    render() {
        return (
            // 你必须谨慎对待 JSX 回调函数中的 this，类的方法默认是不会绑定 this 的。
            //如果你忘记绑定 this.handleClick 并把它传入 onClick, 当你调用这个函数的时候 this 的值会是 undefined。
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? "ON" : "OFF"}
            </button>
        );
    }
}

class ToggleArrow extends Component {
    constructor(props) {
        super(props);
        this.state = { isToggleOn: true }; 
    }

    handleClick(name,e) {
        console.log(name,e);
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    render() {
        return (
             //解决方法二
            <button onClick={e => this.handleClick('name',e)}>
                {this.state.isToggleOn ? "ON" : "OFF"}
            </button>

           
        );
    }
}

class EventComponent extends Component {
    render() {
        return (
            <div>
                <Popper />
                <Toggle />
                <ToggleArrow/>
            </div>
        );
    }
}

export default EventComponent;
