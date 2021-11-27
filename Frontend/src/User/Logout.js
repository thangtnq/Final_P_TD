import React, { useContext } from "react";
import { StateContext } from "../context";
import { Form, Button } from "react-bootstrap";

export default function Logout() {
    const {state, dispatch} = useContext(StateContext)
    const {user} = state
    return (
        <Form onSubmit={
            e => {
                e.preventDefault();
                dispatch({type:"LOGOUT"})
            }}>
            <Form.Label htmlFor="Logout"> Logged in as: {user.username}  </Form.Label>
            <br />
            <Button type="submit" value="Logout" >Logout</Button>
        </Form>
    )
}