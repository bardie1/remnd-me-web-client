import React, {createContext, useState} from 'react'

export const UserContext = createContext<any>(null);


export function UserProvider(props:any) {

    const [user, setUser] = useState<any>(null);

    const login = (user:any) => {
        console.log(user);
        setUser(user);
    }

    const logout = () => {
        setUser(null);
    }


    return (
        <UserContext.Provider value={{user, login, logout}}>
            {props.children}
        </UserContext.Provider>
    )
}


