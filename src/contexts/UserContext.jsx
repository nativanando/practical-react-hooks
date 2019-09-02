import React from 'react'
/*
Create an empty object. It will be in charge with user credentials and permissions
Userprovider is responsible to update the context values
UserConsumer is responsible to get the context values
*/
let UserContext = React.createContext({ name: 'User', loggedIn: true })

export const UserProvider = UserContext.Provider
export const UserConsumer = UserConsumer.Consumer
export default UserContext