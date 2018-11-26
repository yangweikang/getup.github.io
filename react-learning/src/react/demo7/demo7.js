import React, { Component } from "react";

function BoilingVerdict(props) {
    if (props.celsius > 100) {
        return <p>水会烧开！</p>;
    } else {
        return <p>水不会烧开！</p>;
    }
}

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = { temperature: "" };
    }
    handleChange(e) {
        this.setState({ temperature: e.target.value });
    }
    render() {
        var temperature = this.state.temperature;
        return (
            <fieldset>
                <legend>输入一个摄氏温度</legend>
                <input
                    type="text"
                    value={temperature}
                    onChange={e => this.handleChange(e)}
                />
                { this.state.temperature}
                <BoilingVerdict celsius={parseFloat(temperature)} />
            </fieldset>
        );
    }
}

export default Calculator;
