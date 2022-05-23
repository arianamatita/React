import { ChangeEvent } from 'react';
import { articleUrl } from '../models/const';
import { IArticle } from '../components/article';

type ModalProps = {
    showModal: boolean;
    closeModal: () => void;
    tempArticle: IArticle;
    getArticles: () => void;
    handleChange: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
}

function Modal(props: ModalProps) {
    const { showModal, closeModal, tempArticle, handleChange, getArticles } = props;
    let modalClass = "modal--overlay";
    const saveUpdateArticle = (tempArticle: IArticle) => {
        const { id } = tempArticle;
        const url = id === 0 ? articleUrl : '${articleUrl}/${id}';
        const method = id === 0 ? 'POST' : 'PUT';
        let article: IArticle;

        if (id === 0) {
            article = {
                title: tempArticle.title,
                tag: tempArticle.tag,
                author: tempArticle.author,
                date: tempArticle.date,
                imgUrl: tempArticle.imgUrl,
                saying: tempArticle.saying,
                content: tempArticle.content
            }
        } else {
            article = { ...tempArticle }
        }
        fetch(url, {
            method: method,
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(article)
        }).then(function () {
            closeModal();
            getArticles()
        });
    }


    if (showModal) {
        modalClass = `${modalClass} show-modal`
    }

    return (
        <div className={modalClass}>
            <div className="modal">
                <div className="modal-content">
                    <h2 className="title">Add/Edit articles</h2>
                    <div className="inputs-container">
                        <input
                            type="text"
                            name="title"
                            value={tempArticle.title}
                            className="input"
                            onChange={handleChange}
                            placeholder="Please eneter title" />
                        <input
                            type="text"
                            name="tag"
                            value={tempArticle.tag}
                            className="input"
                            onChange={handleChange}
                            placeholder="Please eneter tag" />
                        <input
                            type="text"
                            name="author"
                            value={tempArticle.author}
                            className="input"
                            onChange={handleChange}
                            placeholder="Please eneter author" />
                        <input
                            type="text"
                            name="date"
                            value={tempArticle.date}
                            className="input"
                            onChange={handleChange}
                            placeholder="Please eneter date" />
                        <input
                            type="text"
                            name="imgUrl"
                            value={tempArticle.imgUrl}
                            className="input"
                            onChange={handleChange}
                            placeholder="Please eneter image URL" />
                        <input
                            type="text"
                            name="saying"
                            value={tempArticle.saying}
                            className="input"
                            onChange={handleChange}
                            placeholder="Please eneter saying" />
                    </div>
                    <textarea
                        className='textarea'
                        cols={28}
                        rows={7}
                        value={tempArticle.content}
                        name="content"
                        onChange={handleChange}
                        placeholder="Please eneter content">
                    </textarea>
                    <div className='modal-buttons'>
                        <button type="button" className='button button--pink' onClick={() => saveUpdateArticle(tempArticle)}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;
