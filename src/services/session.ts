const setUser = (user:any, tokens: any) => {
    user.tokens = tokens;
    localStorage.setItem('user', JSON.stringify(user));
}

const getUser = () => {
    let u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
}

const clearSession = () => {
    localStorage.clear();
}


export const sessionService = {
    setUser,
    clearSession,
    getUser,
}


