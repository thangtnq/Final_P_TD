import React, { useContext, useState } from 'react'
import Login from './Login'
import Logout from './Logout'
import Register from './Register'
import { StateContext } from '../context'
import CreateTodo from '../CreateTodo'
import { Button } from 'react-bootstrap'
import { Link } from "react-navi"; 


export default function UserBar() {
    const {state} = useContext(StateContext)
    const {user} = state

    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)

    if (user.username) {
        return <Logout />
    } else {
        return (
            <div>
                <Button variant="primary" onClick={(e) => setShowLogin(true)}>Login</Button>
                <Login show={showLogin} handleClose={() => setShowLogin(false) }/>
                <Button variant="secondary" onClick={(e) => setShowRegister(true)}>Register</Button>
                <Register show={showRegister} handleClose={() => setShowRegister(false)}/>
                <Link href={'/users'}>Users</Link>
            </div>
        )
    }
}
