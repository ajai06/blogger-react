import React, { useEffect, useState, useRef } from 'react';

import { useAuthState } from '../../context/context';

import { getComments, addAComment } from '../../Services/apiServices';

import CommentList from '../commentList/commentList.component';


function ArticleComments(props) {

    const state = useAuthState();
    const [comments, setComments] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const commentRef = useRef();


    useEffect(() => {
        getAllComments();
    }, [])

    const getAllComments = () => {
        getComments(props.slug)
            .then(res => {
                setComments(res.data.comments);
                setLoaded(true)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const addComment = (e) => {
        e.preventDefault();

        if (!state.isLoggedIn) {
            props.history.push("/signin");
            return;
        };

        const commentInput = commentRef.current.value;

        if (!commentInput) return;

        setLoaded(false);
        addAComment(props.slug, { body: commentInput })
            .then(res => {
                props.toast("success", "Success", "Comment added")
                getAllComments();
                commentRef.current.value = "";
                setLoaded(true);
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    return (
        <>
            {
                loaded
                    ?
                    <div className="mt-4">
                        <h5>Add Comment</h5>
                        <textarea ref={commentRef} className="form-control w-75" name="" id="" cols="" rows="2" />
                        <button type="button" onClick={addComment} className="btn btn-success btn-sm btn-float-right mt-2 mb-3">
                            SUBMIT
                        </button>
                        {
                            comments.length > 0
                                ?
                                <div>
                                    <h5>Comments</h5>
                                    {
                                        comments.map(comment => (
                                            <CommentList key={comment.id} {...comment} />
                                        ))
                                    }
                                </div>
                                : ''
                        }

                    </div>
                    : <div className="mt-5 text-center">Loading</div>
            }
        </>
    )
}

export default ArticleComments
