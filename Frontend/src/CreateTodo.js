import React, { useContext, useEffect, useState } from "react"
import { StateContext } from "./context"
import { useResource } from 'react-request-hook'
import { Form, Button, Modal } from "react-bootstrap";

export default function CreateTodo({show, handleClose}) {

    const {state, dispatch} = useContext(StateContext)
    const {user} = state
    const [ title, setTitle ] = useState('')
    const [ content, setContent ] = useState('')
    const isComplete = false
    const dateCompleted = undefined 
    const [ todo, createTodo ] = useResource(({ title, content, dateCreated, isComplete, dateCompleted }) => ({
        url: '/todo',
        method: 'post',
        headers: { "Authorization": `${user.access_token}`},
        data: { title, content, dateCreated, isComplete, dateCompleted }
    }))

    const dateCreated = Date(Date.now())
    function handleTitle(e) { setTitle(e.target.value) }
    function handleContent(e) { setContent(e.target.value) }
    function clearForm() { setTitle(''); setContent('') }
    function handleCreate() {
        createTodo({ title, content, dateCreated, isComplete, dateCompleted })
        clearForm()
    }
    useEffect(() => {
        if (todo && todo.isLoading === false && todo.data) {
            console.log("data")
            console.log(todo.data)
            dispatch({
                type: "CREATE",
                title: todo.data.title,
                content: todo.data.content,
                dateCreated: todo.data.dateCreated,
                isComplete: todo.data.isComplete,
                dateCompleted: todo.data.dateCompleted,
                todoId: todo.data._id,
            })
        }
    }, [todo])

    return (
        <>
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={
                (e) => {
                    e.preventDefault()
                    handleCreate()
                    handleClose()
                }}>
                <Modal.Header closeButton>
                    <Modal.Title>Create new</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label htmlFor="create-title">Title: </Form.Label>
                    <Form.Control type="text" value={title} onChange={handleTitle} name="create-title" id="create-title" />
                    <Form.Label htmlFor="create-content">Content:</Form.Label>
                    <Form.Control type="text" value={content} onChange={handleContent} name="create-content" id="create-content"/>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" value="Create" disabled={title.length === 0} >Create</Button>
                </Modal.Footer>
            </Form>
        </Modal>
        </>
    )
}