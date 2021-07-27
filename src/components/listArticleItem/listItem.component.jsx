import React from 'react';
import { useHistory } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert'; // Import

import { useAuthState } from '../../context/context';

import { delArticle } from '../../Services/apiServices';

import './listItem.styles.scss';

function ListItem(props) {

    const  { article, deleteBlog, loader} = props
    const state = useAuthState();
    const history = useHistory();

    const route = (article) => {
        history.push(`/article/${article.slug}`)
    }

    const editArticle = () => {
        history.push(`/editArticle/${article.slug}`)
    }
  
    const deleteArticle = () => {
        confirmAlert({
            message: 'Are you sure to delete this blog?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    loader();
                    delArticle(article.slug)
                    .then(res=> {
                        deleteBlog();
                        loader();
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

    const authorClick = () => {
        history.push(`/authorArticles/${article.author.username}`)
    }

    return (
        <>
            <div className="card card-container mb-3">
                <div className="card-body">
                    <div style={{ cursor: 'pointer' }} onClick={() => route(article)}>
                        <h3 className="card-title">{article.title}</h3>
                        <p className="card-text">{article.description}</p>
                    </div>
                    <hr />
                    <div>
                        <small className="d-flex justify-content-between flex-row">
                            <span onClick={authorClick} className="authorClick">
                                Author : {article.author.username} | {new Date(article.createdAt).toDateString()}
                            </span>
                            {
                                state.isLoggedIn && state.user.username === article.author.username
                                    ? <span>
                                        <i onClick={editArticle} className="bi bi-pencil icons text-primary"></i>
                                        <i onClick={deleteArticle} className="bi bi-trash icons mx-3 text-danger"></i>
                                    </span>
                                    : ''
                            }
                        </small>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListItem
