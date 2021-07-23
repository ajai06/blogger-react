import React from 'react';


import './banner.styles.scss';

function Banner(props) {


    const toCreatePage = () => {
        props.history.push('/createArticle')
    }

    return (
        <div className="banner-container">
            <div className="banner-text">
                <h1>Publish your passions, your way</h1>
                <span>Create a unique and beautiful blog. It’s easy and free.</span>
            </div>
            <button className="btn create-blog-button" onClick={toCreatePage}>Create Your Blog</button>
        </div>
    )
}

export default Banner
