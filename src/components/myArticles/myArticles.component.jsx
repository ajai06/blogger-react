import React, { useState, useEffect } from 'react';

import ReactPaginate from 'react-paginate';

import { useAuthState } from '../../context/context';

import ListItem from '../listArticleItem/listItem.component';

import { articlesByAuther } from '../../Services/apiServices';

function MyArticles() {

    const state = useAuthState();
    const [myArticles, setMyArticles] = useState([]);
    const [articleCount, setArticleCount] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        articlesByAuther(state.user.username)
            .then(res => {
                console.log(res.data)
                setMyArticles(res.data.articles);
                setArticleCount(res.data.articlesCount)
                setLoaded(true)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    const setPage = ({ selected }) => {
        // setLoaded(false);
        articlesByAuther(state.user.username, selected * 10)
            .then(res => {
                setMyArticles(res.data.articles);
                // setLoaded(true);
            })
            .catch(err => {
                console.log(err);
            })
    }

    console.log(myArticles);

    return (
        <>
            <div className="col-8 mx-auto">
                <h2 className="mb-4">My Blogs</h2>

                {
                    loaded 
                    ? myArticles.length === 0  ? <div className="mt-3">No blogs found...</div> 
                    : myArticles.map(article => (
                        <ListItem key={article.slug} {...article} />
                      ))
                    : <div className="text-center mt-5">Loading ...</div>
                }
                {
                    loaded && myArticles.length !== 0 ?
                        <ReactPaginate
                            pageCount={Math.ceil(articleCount / 10)}
                            pageRangeDisplayed={6}
                            marginPagesDisplayed={1}
                            onPageChange={setPage}
                            containerClassName="pagination"
                            activeClassName="active"
                            pageLinkClassName="page-link"
                            breakLinkClassName="page-link"
                            nextLinkClassName="page-link"
                            previousLinkClassName="page-link"
                            pageClassName="page-item"
                            breakClassName="page-item"
                            nextClassName="page-item"
                            previousClassName="page-item"
                            previousLabel={<>&laquo;</>}
                            nextLabel={<>&raquo;</>}
                        /> : ''
                }
            </div>
        </>
    )
}

export default MyArticles
