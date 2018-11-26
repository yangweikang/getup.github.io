import React, { Component } from "react";

// class NameForm extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { value: "", textarea: "", selected: "coconut" };
//     }
//     handleChange(event) {
//         // 由于 value 属性是在我们的表单元素上设置的，因此显示的值将始终为 React数据源上this.state.value 的值。
//         // 由于每次按键都会触发 handleChange 来更新当前React的state，所展示的值也会随着不同用户的输入而更新。
//         this.setState({ value: event.target.value });
//     }
//     textareaChange(event) {
//         // 由于 value 属性是在我们的表单元素上设置的，因此显示的值将始终为 React数据源上this.state.value 的值。
//         // 由于每次按键都会触发 handleChange 来更新当前React的state，所展示的值也会随着不同用户的输入而更新。
//         this.setState({ textarea: event.target.value });
//     }
//     selectChange(event){
//         this.setState({ selected: event.target.value });
//     }
//     handleSubmit(event) {
//         alert("A name was submitted: " + JSON.stringify(this.state));
//         event.preventDefault();
//     }
//     render() {
//         return (
//             <form
//                 onSubmit={e => {
//                     this.handleSubmit(e);
//                 }}
//             >
//                 <label>
//                     Name:
//                     <input
//                         type="text"
//                         value={this.state.value}
//                         onChange={e => this.handleChange(e)}
//                     />
//                     <textarea
//                         value={this.state.textarea}
//                         cols="30"
//                         rows="10"
//                         onChange={e => this.textareaChange(e)}
//                     />
//                     <select
//                         value={this.state.selected}
//                         onChange={e => this.selectChange(e)}
//                     >
//                         <option value="grapefruit">grapefruit</option>
//                         <option value="lime">Lime</option>

//                         <option value="coconut">Coconut</option>
//                     </select>
//                 </label>
//                 <input type="submit" value="Submit" />
//             </form>
//         );
//     }
// }

//优化多个change事件

class NameForm extends Component {
    constructor(props) {
        super(props);
        this.state = { value: "", textarea: "", selected: "coconut",isGoing:true };
    }
    handleChange(event) {
        // 由于 value 属性是在我们的表单元素上设置的，因此显示的值将始终为 React数据源上this.state.value 的值。
        // 由于每次按键都会触发 handleChange 来更新当前React的state，所展示的值也会随着不同用户的输入而更新。
        const target = event.target;
        //checkbox 值为target.checked 
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }
    handleSubmit(event) {
        alert("A name was submitted: " + JSON.stringify(this.state));
        event.preventDefault();
    }
    render() {
        return (
            <form
                onSubmit={e => {
                    this.handleSubmit(e);
                }}
            >
                <label>
                    Name:
                    <input
                        name="value"
                        type="text"
                        value={this.state.value}
                        onChange={e => this.handleChange(e)}
                    />
                    <textarea
                        name="textarea"
                        value={this.state.textarea}
                        cols="30"
                        rows="10"
                        onChange={e => this.handleChange(e)}
                    />
                    <select
                        name="selected"
                        value={this.state.selected}
                        onChange={e => this.handleChange(e)}
                    >
                        <option value="grapefruit">grapefruit</option>
                        <option value="lime">Lime</option>

                        <option value="coconut">Coconut</option>
                    </select>
                    <input
                        name="isGoing"
                        type="checkbox"
                        checked={this.state.isGoing}
                        onChange={e => this.handleChange(e)}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default NameForm;
