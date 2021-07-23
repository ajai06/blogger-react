import React, { useEffect, useState } from 'react';

import { getAllArticles } from '../../Services/apiServices';
import ListItem from '../listArticleItem/listItem.component';

import './globalArticles.styles.scss';

function GlobalArticles() {

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
            setArticles([]);
        };

    }, [])

    return (
        <>
            {
                loaded ? articles.map(article => (
                    <ListItem key={article.slug} {...article}/>
                ))
                    : <div className="text-center mt-5">Loading ...</div>
            }
        </>

    )
}

export default GlobalArticles
