import React, { useContext } from "react";
import { StateContext } from "./context";
import User from "./User"

export default function UserList() {

    const {state} = useContext(StateContext)
    const {users} = state

    return (
        <div>
            {users.map((u, i) => <User userId={u._id} username={u.username} key={'user-' + i}/>)}
        </div>
    )
}