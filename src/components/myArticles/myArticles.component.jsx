import React, { useState, useEffect } from 'react';

import { useAuthState } from '../../context/context';

import ListItem from '../listArticleItem/listItem.component';

import { articlesByAuther } from '../../Services//apiServices';

function MyArticles() {

    const state = useAuthState();
    const [ myArticles, setMyArticles ] = useState([]);
    const [ loaded, setLoaded ] = useState(false);

    console.log(state);

    useEffect(() => {
        articlesByAuther(state.user.username)
        .then(res => {
            console.log(res)
            setMyArticles(res.data.articles);
            setLoaded(true)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <>
            {
                loaded ? myArticles.map(article => (
                    <ListItem key={article.slug} {...article}/>
                ))
                    : <div className="text-center mt-5">Loading ...</div>
            }
        </>
    )
}

export default MyArticles
