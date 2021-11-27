import React, { useContext, useEffect, useReducer } from 'react'
import { useResource } from 'react-request-hook'
import TodoList from '../TodoList'
import { StateContext } from '../context'


export default function HomePage() {

    const {state, dispatch} = useContext(StateContext)
    const {user} = state
    const [ todos, getTodos ] = useResource(() => ({
        url: '/todo',
        method: 'get',
        headers: {'Authorization': `${user.access_token}`}
    }))

    useEffect(() => {
        getTodos()
    }, [user.access_token])

    useEffect(() => {
        if (todos && todos.isLoading === false && todos.data) {
            dispatch({ type: 'FETCH_TODOS', todos: todos.data.todos })
        }
    }, [todos])

    return (
        <>
            <TodoList />
        </>
    )
}