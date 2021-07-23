import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { useAuthState } from '../../context/context'

// import ArticleComments from '../../components/articleComments/articleComments.component';
import { getArticle } from '../../Services/apiServices';

import './article.styles.scss'


const Article = (props) => {

    const { id } = useParams();
    const [article, setArticle] = useState({});
    const [loaded, setLoaded] = useState(false);

    const state = useAuthState();
    // console.log(state);

    useEffect(() => {

        getArticle(id)
            .then(res => {
                // console.log(res.data.article)
                setArticle(res.data.article);
                setLoaded(true);
            })
            .catch(err => {
                console.log(err)
            })

        return () => {
            setArticle([]);
        }
    }, []);

    const editArticle = () => {
        console.log('edit')
        props.history.push(`/editArticle/${article.slug}`)
    }

    const deleteArticle = () => {
        console.log('delete');
    }

    // console.log(article);

    return (
        <>
            {
                loaded && article !== [] ?
                    <div className="col-8 m-auto">
                        <div className="banner-article-container d-flex justify-content-between flex-column">

                                <h1>{article.title}</h1>

                                <span className="d-flex justify-content-between">
                                    <small>{article.author.username} | {new Date(article.createdAt).toDateString()}</small>
                                    {
                                        state.isLoggedIn && state.user.username === article.author.username 
                                        ?   <span>
                                                <i onClick={editArticle} className="bi bi-pencil text-white"></i>
                                                <i onClick={deleteArticle} className="bi bi-trash mx-3 text-dark"></i>
                                            </span>
                                        : ''
                                    }
                                </span>
                        </div>
                        <div className="card article-card-container">
                            <div className="card-body">
                                {
                                    article.body
                                }
                            </div>
                        </div>
                        {/* <ArticleComments /> */}
                    </div>

                    : <div className="text-center mt-5">Loading ...</div>
            }
        </>
    )
}

export default Article
