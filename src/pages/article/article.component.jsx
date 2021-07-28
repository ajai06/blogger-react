import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { confirmAlert } from 'react-confirm-alert'; // Import

import { useAuthState } from '../../context/context';
import { useToastDispatch } from '../../context/toastContext';

import ArticleComments from '../../components/articleComments/articleComments.component';

import { getArticle, delArticle} from '../../Services/apiServices';

import './article.styles.scss';


const Article = (props) => {

    const { id } = useParams();

    const [article, setArticle] = useState({});
    const [loaded, setLoaded] = useState(false);

    const state = useAuthState();
    const toastDispatch = useToastDispatch()

    useEffect(() => {

        getArticle(id)
            .then(res => {
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
        props.history.push(`/editArticle/${article.slug}`)
    }

    const deleteArticle = () => {
        confirmAlert({
            message: 'Are you sure to delete this blog?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    setLoaded(false);
                    delArticle(article.slug)
                    .then(res=> {
                        console.log(res);
                        props.history.push('/myArticles');
                        toastDispatch("success", "Success", "Deleted Successfully")
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
              },
              {
                label: 'No'
              }
            ]
          });
    }

    // console.log(article);

    return (
        <>
            {
                loaded && article !== [] ?
                    <div className="col-8 m-auto">
                        <div className="banner-article-container d-flex justify-content-between flex-column">

                                <h4>{article.title}</h4>

                                <span className="d-flex justify-content-between">
                                    <small>{article.author.username} | {new Date(article.createdAt).toDateString()}</small>
                                    {
                                        state.isLoggedIn && state.user.username === article.author.username 
                                        ?   <span>
                                                <i onClick={editArticle} className="bi bi-pencil icons text-white"></i>
                                                <i onClick={deleteArticle} className="bi bi-trash icons mx-3 text-dark"></i>
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
                        <ArticleComments {...props} slug={article.slug}/>
                    </div>

                    : <div className="text-center mt-5">Loading ...</div>
            }
        </>
    )
}

export default Article
