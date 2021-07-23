import React, { useEffect, useState } from 'react';

import ReactPaginate from 'react-paginate';

import { getAllArticles } from '../../Services/apiServices';
import ListItem from '../listArticleItem/listItem.component';

import './globalArticles.styles.scss';

function GlobalArticles() {

    const [articles, setArticles] = useState([]);
    const [articleCount, setArticleCount] = useState('');
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {

        getAllArticles(0)
            .then(res => {
                setArticles(res.data.articles);
                setArticleCount(res.data.articlesCount)
                console.log(res.data);
                setLoaded(true);
            })
            .catch(err => {
                console.log(err);
            })

        return () => {
            setArticles([]);
        };

    }, []);

    const setPage = ({ selected }) => {
        console.log(selected);
        // setLoaded(false);
        getAllArticles(selected * 10)
            .then(res => {
                setArticles(res.data.articles);
                // setLoaded(true);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <>
            {
                loaded && articles !== [] ? articles.map(article => (
                    <ListItem key={article.slug} {...article} />
                ))
                    : <div className="text-center mt-5">Loading ...</div>
            }
            {
                loaded ?
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

        </>

    )
}

export default GlobalArticles
