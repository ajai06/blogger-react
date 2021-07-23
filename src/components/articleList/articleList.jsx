import React, { useEffect, useState } from 'react';

import { Tabs, Tab } from 'react-bootstrap'

import './articleList.styles.scss';

import { useAuthState } from '../../context/context';

import GlobalArticles from '../globalArticles/globalArticles.component';
import MyArticles from '../myArticles/myArticles.component';

function ArticleList() {

    const state = useAuthState();

    return (
        <div className="mt-4">

            <Tabs id="controlled-tab-example" className="mb-3" >
                <Tab eventKey="home" title="Global Articles">
                    <GlobalArticles />
                </Tab>
                {
                    state.isLoggedIn
                        ? <Tab eventKey="profile" title="My Articles">
                            <MyArticles />
                        </Tab>
                        : ''
                }
            </Tabs>


        </div>
    )
}

export default ArticleList
