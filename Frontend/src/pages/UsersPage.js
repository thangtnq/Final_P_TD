import React, { useContext, useEffect, useState } from 'react'
import { useResource } from 'react-request-hook'
import { StateContext } from '../context'
import UserList from '../UserList'

export default function UsersPage () {

    const {state, dispatch} = useContext(StateContext)
    const {user} = state

    const [ users, getUsers ] = useResource(() => ({
        url: '/user',
        method: 'get',
    }))

    useEffect(() => {
        getUsers()
    }, []) 

    useEffect(() => {
        if (users && users.isLoading === false && users.data) {
            console.log(users.data)
            dispatch({ type: 'FETCH_USERS', users: users.data.users })
        }
    }, [users])

    return(
        <>
            <h2>Users</h2>
            {users && <UserList />}
        </>
    )
}