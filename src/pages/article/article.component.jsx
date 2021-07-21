import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

// import ArticleComments from '../../components/articleComments/articleComments.component';
import { getArticle } from '../../Services/apiServices';

import './article.styles.scss'


const Article = () => {
    
    const { id } = useParams();
    const [ article, setArticle ] = useState({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {

        getArticle(id)
        .then(res => {
            console.log(res.data.article)
            setArticle(res.data.article);
            setLoaded(true);
        })
        .catch(err => {
            console.log(err)
        })
        
        return () => {
            setArticle([]);
        }
    }, [])

    return (
        <div>            
            {
                loaded ? 
                <div>
                    <div className="banner-article-container d-flex justify-content-between flex-column">
                            <h1>{article.title}</h1>
                            <small>{article.author.username} | {new Date(article.createdAt).toDateString()}</small>
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
        </div>
    )
}

export default Article
