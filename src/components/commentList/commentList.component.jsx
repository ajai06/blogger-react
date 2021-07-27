import React from 'react';

import { useHistory } from 'react-router';

import './commentList.styles.scss';

function CommentList(comment) {

    const history = useHistory();

    const authorClick = () => {
        history.push(`/authorArticles/${comment.author.username}`);
    }

    return (
        <>
            <div className="card comment-card-container my-2 w-75">
                <div className="card-body comment-body">
                    <div>
                        <p className="card-text">{comment.body}</p>
                    </div>
                    <hr className="hr-line"/>
                    <div>
                        <small className="d-flex justify-content-between flex-row">
                            <span onClick={authorClick} className="authorClick">
                                Author : {comment.author.username} | {new Date(comment.createdAt).toDateString()}
                            </span>
                            {/* {
                                state.isLoggedIn && state.user.username === article.author.username
                                    ? <span>
                                        <i onClick={editArticle} className="bi bi-pencil text-primary"></i>
                                        <i onClick={deleteArticle} className="bi bi-trash mx-3 text-danger"></i>
                                    </span>
                                    : ''
                            } */}
                        </small>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CommentList
