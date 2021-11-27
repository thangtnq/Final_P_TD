import React, { useContext, useState, useEffect } from "react";
import { StateContext } from "../context";
import { useResource } from 'react-request-hook'
import { Modal, Form, Button } from 'react-bootstrap';

export default function Login({show, handleClose}) {
    
    const {dispatch} = useContext(StateContext)
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ loginFailed, setLoginFailed ] = useState(false)
    function handleUsername(e) { setUsername(e.target.value) }
    function handlePassword(e) { setPassword(e.target.value) }
    const [ user, loginUser ] = useResource((username, password) => ({
        url: 'auth/login',
        method: 'post',
        data: {username, password}
    }))
    useEffect(() => {
        if (user && user.isLoading === false && (user.data || user.error)) {
            if (user.error) {
                setLoginFailed(true)
            } else {
                console.log(user)
                setLoginFailed(false)
                dispatch({type:"LOGIN", username, access_token: user.data.access_token})
            }
        }
    }, [user])
    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={
                (e) => {
                    e.preventDefault()
                    loginUser(username, password)
                    handleClose()
                }} >
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label htmlFor="login-username">Username: </Form.Label>
                    <Form.Control type="text" value={username} onChange={handleUsername} id="login-username" />
                    <Form.Label htmlFor="login-password">Password: </Form.Label>
                    <Form.Control type="password" value={password} onChange={handlePassword} id="login-password" />
                    {loginFailed && <Form.Text>Invalid username or password</Form.Text>}
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" value="Login" disabled={username.length === 0}>Login</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    ) 
}