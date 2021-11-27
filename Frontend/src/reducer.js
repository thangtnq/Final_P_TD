function userReducer (state, action) {
    switch (action.type) {
        case 'LOGIN':
        case 'REGISTER':
            return {
                'username': action.username,
                'access_token': action.access_token
            }
        case 'LOGOUT':
            return {
                'username': undefined,
                'access_token': undefined
            }
        default:
            return state
    }   
}

function todoReducer(state, action) {
    switch (action.type) {
        case 'CREATE':
            const newTodo = {
                title: action.title,
                content: action.content,
                dateCreated: action.dateCreated,
                isComplete: action.isComplete,
                dateCompleted: undefined,
                _id: action.todoId
            }
            return [ newTodo, ...state ]
        case 'TOGGLE':
            return state.map((t) => {
                if (t._id === action.todoId) {
                    t.isComplete = action.isComplete
                    t.dateCompleted = action.dateCompleted
                }
                return t
            })
        case 'DELETE':
            return state.filter((t) => t._id !== action.todoId)
        case 'FETCH_TODOS':
            return action.todos
        default:
            return state
    }
}

function usersReducer (state, action) {
    switch (action.type) {
        case 'FETCH_USERS':
            return action.users
        default:
            return state
    }   
}


export default function appReducer (state, action) {
    return {
        user: userReducer(state.user, action),
        todos: todoReducer(state.todos, action),
        users: usersReducer(state.users, action)
    }
}