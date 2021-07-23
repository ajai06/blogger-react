import React from 'react';
import ArticleList from '../../components/articleList/articleList';

import Banner from '../../components/banner/banner.component'

function Homepage(props) {
    return (
        <div>
            <Banner {...props}/>
            <ArticleList />
        </div>
    )
}

export default Homepage
