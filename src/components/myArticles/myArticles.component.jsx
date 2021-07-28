import React, { useState, useEffect } from 'react';

import ReactPaginate from 'react-paginate';

import { useAuthState } from '../../context/context';
import { useToastDispatch } from '../../context/toastContext';

import ListItem from '../listArticleItem/listItem.component';

import { articlesByAuther } from '../../Services/apiServices';

function MyArticles(props) {

    const state = useAuthState();
    const toastDispatch = useToastDispatch();

    const [myArticles, setMyArticles] = useState([]);
    const [articleCount, setArticleCount] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [ author, setAuthor ] = useState(false);
    const [authorName, setAuthorName] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {

        const id = props.match.params.id;

        let name;
        if(id) {
            name = id;
            setAuthor(true);
            setAuthorName(name);
            setName(name);
        } else { 
            name = state.user.username;
            setAuthor(false);
            setName(name);
        }

        fetchArticles(name);

        
    }, []);

    const fetchArticles = (name) => {
        articlesByAuther(name)
            .then(res => {
                setMyArticles(res.data.articles);
                setArticleCount(res.data.articlesCount)
                setLoaded(true)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const setPage = ({ selected }) => {
        articlesByAuther(name, selected * 10)
            .then(res => {
                setMyArticles(res.data.articles);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const deleteBlog = ( ) => {
        fetchArticles(state.user.username);
        toastDispatch("success", "Success", "Deleted Successfully")
    }

    return (
        <>
            <div className="col-8 mx-auto">
                {
                    author && state.user.username !== authorName
                     ? <h2 className="mb-4">Articles by {authorName}</h2>   
                     : <h2 className="mb-4">My Blogs</h2>
                }
                {
                    loaded 
                    ? myArticles.length === 0  ? <div className="mt-3">No blogs found...</div> 
                    : myArticles.map(article => (
                        <ListItem key={article.slug} article = {article} deleteBlog={()=>deleteBlog()}
                                  loader={()=>setLoaded(!loaded)} />
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
