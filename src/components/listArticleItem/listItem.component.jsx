import React from 'react';
import { useHistory } from 'react-router-dom';

import { useAuthState } from '../../context/context';

import './listItem.styles.scss';


function ListItem(article) {

    const state = useAuthState();

    const history = useHistory();
    const route = (article) => {
        history.push(`/article/${article.slug}`)
    }

    const editArticle = () => {
        history.push(`/editArticle/${article.slug}`)
    }
    const deleteArticle = () => {

    }

    return (
        <div>
            <div key={article.slug} className="card card-container mb-3 w-75">
                        <div className="card-body">
                            <div style={{ cursor: 'pointer' }} onClick={() => route(article)}>
                                <h3 className="card-title">{article.title}</h3>
                                <p className="card-text">{article.description}</p>
                            </div>
                            <hr />
                            <div>
                                <small className="d-flex justify-content-between flex-row">
                                    <span>
                                    Author : {article.author.username} | {new Date(article.createdAt).toDateString()}
                                    </span>
                                    {
                                        state.user.username === article.author.username 
                                        ?   <span>
                                                <i onClick={editArticle} className="bi bi-pencil text-primary"></i>
                                                <i onClick={deleteArticle} className="bi bi-trash mx-3 text-danger"></i>
                                            </span>
                                        : ''
                                    }
                                </small>
                            </div>
                        </div>
                    </div>
        </div>
    )
}

export default ListItem
