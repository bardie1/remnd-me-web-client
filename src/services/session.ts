const setUser = (user:any) => {
    localStorage.setItem('user', JSON.stringify(user));
}

const clearSession = () => {
    localStorage.clear();
}


export const sessionService = {
    setUser,
    clearSession
}


