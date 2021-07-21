import React from "react";

const Homepage = React.lazy(() => import('../pages/homepage/homepage.component'));
const SignInAndSignUp = React.lazy(() => import('../pages/signInAndSignUp/signInAndSignUp.component'));
const Article = React.lazy(() => import('../pages/article/article.component'));
const PageNotFound = React.lazy(() => import('../pages/pageNotFound/pageNotFound.component'));

const routes = [ 
    {
        path:"/",
        component:Homepage
    },
    {
        path: "/signin",
        component: SignInAndSignUp
    },
    {
        path: "/article/:id",
        component: Article
    },
    {
        path:"*",
        component: PageNotFound
    },
]

export default routes;

