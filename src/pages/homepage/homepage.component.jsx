import React from 'react';
import ArticleList from '../../components/articleList/articleList';

import Banner from '../../components/banner/banner.component'

function Homepage() {
    console.log('xxxxx');
    return (
        <div>
            <Banner />
            <ArticleList />
        </div>
    )
}

export default Homepage
