import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { useAuthState } from '../../context/context';

import { createNewArticle, getArticle, updateArticle } from '../../Services/apiServices';

import './createArticle.styles.scss';

function CreateArticle(props) {

    const [editMode, setEditMode] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const { handleSubmit, register, formState: { errors }, setValue } = useForm();

    const state = useAuthState();


    useEffect(() => {

        if(!state.isLoggedIn) props.history.push('/signin') 

        // !state.isLoggedIn ? p
        const id = props.match.params.id;

        if (id) {
            setEditMode(true)
            getArticle(id)
                .then(res => {
                    console.log(res);
                    patchValues(res.data.article);
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            setEditMode(false);
            setLoaded(true);
        }

    }, [])

    const patchValues = (data) => {
        setValue("title", data.title);
        setValue("description", data.description);
        setValue("body", data.body);
        setLoaded(true)
    }

    const submitArticle = (data) => {
        setLoaded(false);
        createNewArticle(data)
            .then(res => {
                setLoaded(true);
                props.toast("success", "Success", "Article created successfully");
                props.history.push(`/article/${res.data.article.slug}`)
            })
            .catch(err => {
                console.log(err.response);
            })
    }

    const articleUpdate = (data) => {
        setLoaded(false)
        updateArticle(props.match.params.id, data)
            .then(res => {
                props.toast("success", "Success", "Article updated successfully");
                props.history.push(`/article/${res.data.article.slug}`)
                setLoaded(true);
            })
            .catch(err => {
                console.log(err)
            })
    }

    const goBack = () => {
        props.history.goBack();
    }

    return (
        <>
            {
                loaded ?
                    <div className="col-6 create-article">
                        {
                            editMode ? <h2 className="title">Edit your blog</h2>
                                : <h2 className="title">Create your blog</h2>
                        }

                        <form>

                            <div className="form-group my-4">
                                <label htmlFor="exampleInputTitle">Title</label>
                                <input type="text" className="form-control" {...register("title", { required: true })}
                                    id="exampleInputTitle" aria-describedby="emailHelp" placeholder="Enter Title" />
                                {errors.title ? <small className="error-msg">Title required</small> : ''}
                            </div>

                            <div className="form-group my-4">
                                <label htmlFor="exampleInputDesc">Description</label>
                                <input type="text" className="form-control" {...register("description", { required: true })}
                                    id="exampleInputDesc" aria-describedby="emailHelp" placeholder="Enter description" />
                                {errors.description ? <small className="error-msg">Required</small> : ''}

                            </div>

                            <div className="form-group mb-4">
                                <label htmlFor="exampleInputContent">Content</label>
                                <textarea type="text" className="form-control" {...register("body", { required: true })}
                                    id="exampleInputContent" placeholder="Enter Content" />
                                {errors.body?.type === "required" ? <small className="error-msg">Required</small> : ''}

                            </div>

                            <div>
                                {
                                    editMode
                                        ? <button type="button" onClick={() => handleSubmit(articleUpdate)()} className="btn btn-color">UPDATE</button>
                                        : <button type="button" onClick={() => handleSubmit(submitArticle)()} className="btn btn-color">CREATE</button>

                                }
                                <button type="button" className="btn btn-primary back-btn" onClick={goBack}>BACK</button>
                            </div>
                        </form>
                    </div>

                    : <div className="text-center mt-5">Loading ...</div>
            }
        </>
    )
}

export default CreateArticle
