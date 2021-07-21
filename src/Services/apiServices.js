import axios from "axios";

const ROOT_API = 'https://conduit.productionready.io/api';

//articles

export const getAllArticles = () => {
    return axios.get(`${ROOT_API}/articles`)
}

export const getArticle = (slug) => {
    return axios.get(`${ROOT_API}/articles/${slug}`);
}

//user 

export const userLogin = ({email, password}) => {
    return axios.post(`${ROOT_API}/users/login`, { user: { email, password } })
}

export const userRegister = ({username, email, password}) => {

    return axios.post(`${ROOT_API}/users`, {user: {username, email, password }})
}