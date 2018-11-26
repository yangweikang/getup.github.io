import React, { Component } from "react";


function UserGreeting(props) {
    return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
    return <h1>Please sign up.</h1>;
}

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting />;
    }
    return <GuestGreeting />;
}

function LoginButton(props) {
    return <button onClick={props.onClick}>Login</button>;
}

function LogoutButton(props) {
    return <button onClick={props.onClick}>Logout</button>;
}
function Warning() {
    return <div>Warning</div>;
}

 
class LoginControl extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoggedIn: false };
    }
    handleLoginClick() {
        this.setState({ isLoggedIn: true });
    }
    handleLogoutClick() {
        this.setState({ isLoggedIn: false });
    }
    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let button = null;
        if (isLoggedIn) {
            button = (
                <LogoutButton
                    onClick={() => {
                        this.handleLogoutClick();
                    }}
                />
            );
        } else {
            button = (
                <LoginButton
                    onClick={() => {
                        this.handleLoginClick();
                    }}
                />
            );
        }

        return (
            <div>
                <Greeting isLoggedIn={isLoggedIn} />
                <Warning/>
                {button}
            </div>
        );
    }
}


export default LoginControl;
