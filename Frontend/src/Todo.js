import React, { useContext, useEffect } from "react";
import { StateContext } from "./context";
import { useResource } from "react-request-hook";

import { Card, Button } from "react-bootstrap";

export default function Todo({title, content, dateCreated, isComplete, dateCompleted, _id}) {

    const {state, dispatch} = useContext(StateContext)
    const {user} = state
    const [ todoToDel, deleteTodo ] = useResource(() => ({
        url: `/todo/${_id}`,
        method: 'delete',
        headers: { "Authorization": `${user.access_token}`}
    }))
    const [ todoToToggle, toggleTodo ] = useResource(() => ({
        url: `/todo/${_id}`,
        method: 'patch',
        headers: { "Authorization": `${user.access_token}`},
        data: { "isComplete": !isComplete, "dateCompleted": Date.now() }
    }))
    function handleDelete() {
        deleteTodo()
    }
    function handleToggle() {
        toggleTodo()
    }
    useEffect(() => {
        if (todoToDel && todoToDel.isLoading === false && todoToDel.data) {
            dispatch({type: "DELETE", todoId: _id})
        }
    }, [todoToDel])
    useEffect(() => {
        if (todoToToggle && todoToToggle.isLoading === false && todoToToggle.data) {
            console.log("Data")
            console.log(todoToToggle.data.todo)
            dispatch({type: "TOGGLE", isComplete: !isComplete, todoId: _id, dateCompleted: Date.now()})
        }
    }, [todoToToggle])

	
    return(
        <Card>
        <Card.Body>
            <Card.Title><input type="checkbox" checked={isComplete} onChange={handleToggle} /> {title}</Card.Title>
            <Card.Text>{content}</Card.Text>
            <p>Date created: {new Date(dateCreated).toLocaleDateString('en-us')}</p>
            {dateCompleted && <label>Date completed: {new Date(dateCompleted).toLocaleDateString('en-us')}</label>}
            {dateCompleted && <br/>}
            <Button onClick={handleDelete}>Delete</Button>
            <br/><br/>
        </Card.Body>
        </Card>
    )
}