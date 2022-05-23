import React from 'react';
import { Link } from 'react-router-dom';
import { articleUrl } from '../models/const';


export interface articleProps {
    article: IArticle;
    openEditModal: (article: IArticle) => void;
    getArticle: () => void;
}

export interface IArticle {
    id?: number;
    title: string;
    tag: string;
    author: string;
    date: string;
    imgUrl: string;
    saying: string;
    content: string;
}

function Article(props: articleProps) {
    const { article, openEditModal, getArticle } = props;
    const deleteArticles = (id: number) => {
        fetch(`${articleUrl}/${id}`, {
            method: 'DELETE',
        }).then(function () {
            getArticle();
        });
    }
    return (
        <><div className="article-item">
            {article.title}
        </div>
            <div className='article-info'>
                <li className='info-item'>
                    {article.tag}
                </li>
                <li className='info-divider'>·</li>
                <li className='info-item'>
                    Added by &nbsp;
                    <span className="info-mark">
                        {article.author}
                    </span>
                </li>
                <li className="info-divider">·</li>
                <li className="info-item">
                    {article.date}
                </li>
            </div>
            <div className='button-group'>
                <button type="button" className='buttons' 
                onClick={() => deleteArticles(article.id)}>Delete</button>
                 <div className="divider"> | </div>
                 <button type="button" className='buttons'
                 onClick={()=> openEditModal(article)}>Edit</button>
            </div>
            <div className='article-image'>
                <img src={article.imgUrl} alt=""/>
            </div>
            <div className='article-content'>
                {article.content}
            </div>
            <div className='btn-readmore'>
                <Link to={'/details/${article.id}'}>
                    <button type="button" className='button'>READ MORE</button>
                </Link>
            </div></>
    )
}

export default Article