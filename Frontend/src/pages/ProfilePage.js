import React, { useContext, useEffect } from 'react'
import { useResource } from 'react-request-hook'
import TodoList from '../TodoList'
import { StateContext } from '../context';

export default function ProfilePage({userId}) {

    console.log(userId)
    const {state, dispatch} = useContext(StateContext)
    const {user} = state
    const [ todos, getTodos ] = useResource(() => ({
        url: `/user/${userId}`,
        method: 'get'
    }))

    useEffect(() => { getTodos() }, [])

    useEffect(() => {
        if (todos && todos.isLoading === false && todos.data) {
            dispatch({ type: 'FETCH_TODOS', todos: todos.data.todos })
        }
    }, [todos])

    return (
        <TodoList />
    )
}