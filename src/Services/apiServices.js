import axios from "axios";

const ROOT_API = 'https://conduit.productionready.io/api';

const user = JSON.parse(localStorage.getItem("currentUser"));

let headers;
if(user){
    headers = {

        headers: {
            authorization: `Token ${user.token}`,
            "Content-Type": "application/json",
            },
    }
}



//articles

export const getAllArticles = (page) => {
    return axios.get(`${ROOT_API}/articles?limit=10&offset=${page}`)
}

export const getArticle = (slug) => {
    return axios.get(`${ROOT_API}/articles/${slug}`);
}

export const createNewArticle = (article) => {
    return axios.post(`${ROOT_API}/articles`, {article}, headers);
}

export const updateArticle = (slug,article) => {
    return axios.put(`${ROOT_API}/articles/${slug}`, {article}, headers);
}

export const articlesByAuther = (author,page) => {
    return axios.get(`${ROOT_API}/articles?author=${(author)}&limit=10&offset=${page}`);
}

export const delArticle = (slug) => {
    return axios.delete(`${ROOT_API}/articles/${slug}`, headers);
}

//user 

export const userLogin = ({email, password}) => {
    return axios.post(`${ROOT_API}/users/login`, { user: { email, password } })
}

export const userRegister = ({username, email, password}) => {
    return axios.post(`${ROOT_API}/users`, {user: {username, email, password }})
}