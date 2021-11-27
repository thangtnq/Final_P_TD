import React, { useContext, useState } from 'react'
import { Container, Navbar, Button } from 'react-bootstrap'
import { StateContext } from './context'
import UserBar from './User/UserBar'
import CreateTodo from './CreateTodo'

export default function HeaderBar() {

    const {state} = useContext(StateContext)
    const {user} = state

    const [showCreateTodo, setShowCreateTodo] = useState(false)

    return (
        <Navbar>
            <Container>
                <UserBar />
                {user.username && <Button variant="primary" onClick={(e) => setShowCreateTodo(true)}>Create new</Button> }
                <CreateTodo show={showCreateTodo} handleClose={() => setShowCreateTodo(false)} />
            </Container>
        </Navbar>
    )
}