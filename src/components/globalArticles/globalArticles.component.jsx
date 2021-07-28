import React, { useEffect, useState, useRef } from 'react';

import ReactPaginate from 'react-paginate';

import { useToastDispatch } from '../../context/toastContext';

import { getAllArticles } from '../../Services/apiServices';

import ListItem from '../listArticleItem/listItem.component';

import './globalArticles.styles.scss';

function GlobalArticles() {

    const toastDispatch = useToastDispatch();

    const [articles, setArticles] = useState([]);
    const [articleCount, setArticleCount] = useState('');
    const [loaded, setLoaded] = useState(false);

    const listRef = useRef(null)

    useEffect(() => {
        
        fetchArticles(0);

        return () => {
            setArticles([]);
        };

    }, []);

    const fetchArticles = (num) => {

        getAllArticles(num * 10)
            .then(res => {
                setArticles(res.data.articles);
                setArticleCount(res.data.articlesCount)
                setLoaded(true);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const setPage = ({ selected }) => {
        getAllArticles(selected * 10)
            .then(res => {
                setArticles(res.data.articles);
                scrollToRef(listRef)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const deleteBlog = ( ) => {
        toastDispatch("success", "Success", "Deleted Successfully");
        fetchArticles(0);
    }

    const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)   

    return (
        <div ref={listRef} className="mt-4  w-75 m-auto">
            {
                loaded && articles !== [] ? articles.map(article => (
                    <ListItem key={article.slug} article = {article} deleteBlog={()=>deleteBlog()}/>
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

        </div>

    )
}

export default GlobalArticles
