import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { createNewArticle, getArticle, updateArticle } from '../../Services/apiServices';

import './createArticle.styles.scss';

function CreateArticle(props) {

    const [editMode, setEditMode] = useState(false);
    const { handleSubmit, register, formState: { errors }, setValue } = useForm();

    useEffect(() => {
        console.log(props);
        const id = props.match.params.id
        id ? setEditMode(true) : setEditMode(false);

        if (id) {
            getArticle(id)
                .then(res => {
                    console.log(res);
                    patchValues(res.data.article);
                })
                .catch(err => {
                    console.log(err);
                })
        }

    }, [])

    const patchValues = (data) => {
        setValue("title", data.title);
        setValue("description", data.description);
        setValue("body", data.body);
    }

    const submitArticle = (data) => {
        createNewArticle(data)
            .then(res => {
                console.log(res)
                props.toast("success", "Success", "Atricle created successfully");
                props.history.push(`/article/${res.data.article.slug}`)
            })
            .catch(err => {
                console.log(err.response);
            })
    }

    const articleUpdate = (data) => {
        updateArticle(props.match.params.id, data)
        .then(res=>{
            console.log(res)
            props.toast("success", "Success", "Atricle updated successfully");
            props.history.push(`/article/${res.data.article.slug}`)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const goBack = () => {
        props.history.goBack();
    }

    return (
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
                            ? <button type="button" onClick={()=>handleSubmit(articleUpdate)()} className="btn btn-color">UPDATE</button>
                            : <button type="button" onClick={()=>handleSubmit(submitArticle)()} className="btn btn-color">CREATE</button>

                    }
                    <button type="button" className="btn btn-primary back-btn" onClick={goBack}>BACK</button>
                </div>
            </form>
        </div>
    )
}

export default CreateArticle
