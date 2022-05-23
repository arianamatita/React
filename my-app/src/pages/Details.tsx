import { Link, useParams } from "react-router-dom";
import { IArticle } from "../components/article";
import { useEffect, useState } from "react";

const initalArticleState = {
    id: 0,
    title: '',
    tag: '',
    author: '',
    date: '',
    imgUrl: '',
    saying: '',
    content: ''
}

function Article(pros: any) {
    let { id } = useParams<{ id: string }>();
    const [article, setArticle] = useState({} as IArticle);
    const [prevArticle, setPreviosId] = useState<number | null>(null);
    const [nextArticle, setNextId] = useState<number | null>(null);

    const getArticleDate = (id: string) => {
        const getArticle = fetch('${articleUrl}/${id}');
        const getArticles = fetch('${srticleUrl}');

        Promise.all([getArticle, getArticles])
            .then(result => Promise.all(result.map(resp => resp.json())))
            .then(response => {
                const article = response[0] as IArticle;
                const articles = response[1] as IArticle[];
                const idNum = parseInt(id);
                const articleIndex = articles.findIndex((x) => idNum === x.id);
                setArticle(article);
                if (articleIndex === 0) {
                    setPreviosId(null);
                    setNextId(articles[articleIndex + 1].id);
                }
                else {
                    setPreviosId(articles[articleIndex - 1].id);
                    setNextId(articles[articleIndex + 1] ? articles[articleIndex + 1].id : null);
                }
            })
        }
        useEffect(() => getArticleDate(id), [id]);
        return (
            <div className="article-item">
                <div className="article-title">
                    {article.title}
                </div>
                <div className="article-info">
                    <li className="info-item">{article.tag}</li>
                    <li className="info-divider">·</li>
                    <li className="info-item">Added by &nbsp;
                        <span className="info-mark">{article.author}</span>
                    </li>
                    <li className="info-divider">·</li>
                    <li className="info-item">{article.date}</li>
                </div>

                <div className="article-image">
                    <img src={"../" + article.imgUrl} alt="" />
                </div>

                <div className="article-content">
                    <p>{article.content}</p>
                    <p className="saying">{article.saying}</p>
                    <p>{article.content}</p>
                </div>
                <footer className="footer2">
            {prevArticle && <Link to={`/details/${prevArticle}`}><button className="previous">previous article</button></Link>}
            {nextArticle && <Link to={`/details/${nextArticle}`}><button className="next">next article</button></Link>}
        </footer>
            </div>
        )
    }
export default Article;