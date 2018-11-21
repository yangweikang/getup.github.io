/* eslint-disable */
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const PEEPS = [
    { id: 0, name: "Michelle", friends: [1, 2, 3] },
    { id: 1, name: "Sean", friends: [0, 3] },
    { id: 2, name: "Kim", friends: [0, 1, 3] },
    { id: 3, name: "David", friends: [1, 2] }
];

const find = id => PEEPS.find(p => p.id == id);

const RecursiveExample = () => (
    <Router>
        <Person match={{ params: { id: 0 }, url: "" }} />
    </Router>
);

const Person = ({ match }) => {
    const person = find(match.params.id);
    if (person) {
        return (
            <div>
                <h3>{person.name}’s Friends</h3>
                <ul>
                    {person.friends.map(id => (
                        <li key={id}>
                            <Link to={`${match.url}/${id}`}>
                                {find(id).name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <Route path={`${match.url}/:id`} component={Person} />
            </div>
        );
    } else {
        return (
            <div> 
                <em>
                    官方文档是这样描述children属性的——有些时候，我们需要根据匹配的当前路径的不同，展示不同的dom，这个时候就是children属性出场的时候。
                    在上面的Person组件中，它自身调用了自己，形成了路径递归的视图展示效果！
                    也就是Person中展示的视图包含Link组件，Link组件链接的Route又展示的Person
                </em>
            </div>
        );
    }
};

export default RecursiveExample;
