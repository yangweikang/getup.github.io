import React from "react";

function NumberList() {
    let numberList = [1, 2, 3, 4, 7];
    let listItems = numberList.map(item => (
        <li key={item.toString()}>{item}</li>
    ));
    return <ul>{listItems}</ul>;
}

function ListItem(props) {
    //error key={props.num.toString()}
    return <li>{props.num}</li>;
}

// function KeyList() {
//     let numberList = [8, 5, 6, 55, 66];
//     let listItems = numberList.map(item => (
//         <ListItem key={item.toString()} num={item} />
//     ));
//     return (
//         <div>
//             <NumberList />
//             <ul>{listItems}</ul>
//         </div>
//     );
// }

function KeyList() {
    let numberList = [8, 5, 6, 55, 66]; 
    return (
        <div>
            <NumberList />
            <ul>
                {numberList.map(item => (
                    //正确key位置
                    <ListItem key={item.toString()} num={item} />
                ))}
            </ul>
        </div>
    );
}

export default KeyList;
