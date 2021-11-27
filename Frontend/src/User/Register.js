import React, { useContext, useEffect, useState } from 'react';
import { useResource } from 'react-request-hook';
import { StateContext } from '../context';
import { Form, Button, Modal } from "react-bootstrap";

export default function Register({show, handleClose}) {

    const {dispatch} = useContext(StateContext)

    const [ formData, setFormData ] = useState({
        username: "",
        password: "",
        passwordRepeat: ""
    })

    const [ user, registerUser ] = useResource(( username, password ) => ({
        url: '/auth/register',
        method: 'post',
        data: { username, password, 'passwordConfirmation': password }
    }))

    useEffect(() => {
        if (user && user.data) {
            dispatch({type:"REGISTER", username: user.data.username });
        }
    }, [user])

    return (
        <Modal show={show} onHide={handleClose}>
        <Form onSubmit={
            e => {
                e.preventDefault();
                registerUser(formData.username, formData.password)
                handleClose()
            }}>
            <Modal.Header closeButton>
                <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Label htmlFor="register-username">Username: </Form.Label>
                <Form.Control type="text" value={formData.username} onChange={e => setFormData({
                    ...formData,
                    username: e.target.value
                })} name="register-username" id="register-username" />
                <Form.Label htmlFor="register-password">Password: </Form.Label>
                <Form.Control type="password" value={formData.password} onChange={e => setFormData({
                    ...formData,
                    password: e.target.value
                })} name="register-password" id="register-password" />
                <Form.Label htmlFor="register-password-repeat">Repeat password: </Form.Label>
                <Form.Control type="password" value={formData.passwordRepeat} onChange={e => setFormData({
                    ...formData,
                    passwordRepeat: e.target.value
                })} name="register-password-repeat" id="register-password-repeat" />
            </Modal.Body>  
            <Modal.Footer>
                <Button type="submit" value="Register" disabled={
                    formData.username.length === 0 ||
                    formData.password.length === 0 ||
                    formData.passwordRepeat !== formData.password
                }>Register</Button>
            </Modal.Footer>
        </Form>
        </Modal>
    )
}
