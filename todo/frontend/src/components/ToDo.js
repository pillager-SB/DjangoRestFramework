import React from 'react'


const ToDoItem = ({todo, delete_todo}) => {
    return (
        <tr>
            <td>{todo.id}</td>
            <td>{todo.text}</td>
            <td>{todo.create}</td>
            <td>{todo.project}</td>
            <td>{todo.creator}</td>
            <td></td>
            <td>
                <button onClick={()=>delete_todo(todo.id)} type='button'>Delete</button>
            </td>
        </tr>
    )
}

const ToDoList = ({todos, delete_todo}) => {
    return (
        <table>
            <tr>
                <th>Id</th>
                <th>Text</th>
                <th>Create</th>
                <th>Project</th>
                <th>Creator</th>
                <th></th>
            </tr>
            {todos.map((todo) => <ToDoItem todo={todo} delete_todo={delete_todo}/>)}
        </table>
    )
}
export default ToDoList