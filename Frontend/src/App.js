import React, { useReducer } from 'react'
import { StateContext } from './context';
import HeaderBar from "./HeaderBar";
import appReducer from './reducer';
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage'
import UsersPage from './pages/UsersPage';
import ProfilePage from './pages/ProfilePage';
import { mount, route } from 'navi';
import { Router, View } from 'react-navi';

function App() {

  const [ state, dispatch ] = useReducer(appReducer, {
    user: {},
    todos: [],
    users: []
  })

  const myRoutes = mount({
    '/': route({ view: <HomePage />}),
    '/users': route({ view: <UsersPage />}),
    '/users/:userId': route(req => {
      return { view: <ProfilePage userId={req.params.userId} /> }
    })
  })

  return (
    <div>
      <StateContext.Provider value={{state: state, dispatch: dispatch}}>
        <Router routes={myRoutes}>
          <Container>
            <HeaderBar />
            <View />
          </Container>
        </Router>
      </StateContext.Provider>
    </div>
  )
}

export default App;

