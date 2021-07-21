import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { getAllArticles } from '../../Services/apiServices';

import './articleList.styles.scss'

function ArticleList() {

    const [articles, setArticles] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {

        getAllArticles()
        .then(res => {
            setArticles(res.data.articles);
            setLoaded(true);
        })
        .catch(err => {
            console.log(err);
        })

        return () => {
            setArticles([]); // This worked for me
          };

    },[])

    console.log(articles);

    const history = useHistory();
    const route = (article) => {
        history.push(`/article/${article.slug}`)
    }

    return (
        <div className="mt-4">
             {
                loaded ? articles.map(article => (
                    <div key={article.slug} className="card card-container mb-3 w-75">
                        <div className="card-body">
                            <div style={{cursor:'pointer'}} onClick={()=>route(article)}>
                                <h3 className="card-title">{article.title}</h3>
                                <p className="card-text">{article.description}</p>
                            </div>
                            <hr />
                            <div className="card-footers">
                                <small>
                                    Author : {article.author.username} | {new Date(article.createdAt).toDateString()}
                                </small>
                            </div>
                        </div>
                    </div>
                ))
                : <div className="text-center mt-5">Loading ...</div>
             }
        </div>
    )
}

export default ArticleList
