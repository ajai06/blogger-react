import React, { lazy } from "react";

const Homepage = React.lazy(() => import('../pages/homepage/homepage.component'));
const SignInAndSignUp = React.lazy(() => import('../pages/signInAndSignUp/signInAndSignUp.component'));
const Article = React.lazy(() => import('../pages/article/article.component'));
const CreateArticle = React.lazy(()=> import("../pages/createArticle/createArticle.component"));
const Profile = React.lazy(()=>import('../pages/profile/profile.component'));
const MyArticles = React.lazy(()=>import('../components/myArticles/myArticles.component'));

const routes = [ 
    
    {
        path: "/signin",
        component: SignInAndSignUp
    },
    {
        path: "/article/:id",
        component: Article
    },
    {
        path:"/home",
        component:Homepage
    },
    {
        path:"/createArticle",
        component: CreateArticle
    },
    {
        path:"/editArticle/:id",
        component: CreateArticle
    },
    {
        path: '/profile',
        component: Profile
    },
    {
        path: '/myArticles',
        component: MyArticles
    }

]

export default routes;

