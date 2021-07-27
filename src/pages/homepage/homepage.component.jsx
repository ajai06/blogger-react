import React from 'react';
import Banner from '../../components/banner/banner.component'
import GlobalArticles from '../../components/globalArticles/globalArticles.component';

function Homepage(props) {
    return (
        <div>
            <Banner {...props}/>
            <GlobalArticles {...props}/>
        </div>
    )
}

export default Homepage
