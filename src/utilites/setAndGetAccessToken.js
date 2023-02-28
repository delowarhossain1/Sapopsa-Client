
const setAccessToken = (token) =>{
    localStorage.setItem('access-token', token);
}

const getAccessToken = () =>{
    const token = localStorage.getItem('access-token');
    return token;
}

export {setAccessToken, getAccessToken}