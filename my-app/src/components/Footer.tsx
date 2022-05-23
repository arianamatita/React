import React, { Dispatch, SetStateAction } from 'react';

interface FooterProps {
    startIndex : number;
    articlesPerPage: number;
    numberOfArticle:number;
    setStartIndex: Function;
}

function Footer(props:FooterProps) {
    const{startIndex, setStartIndex, numberOfArticle, articlesPerPage} = props
    return (
        <footer className='footer'>
            {
                startIndex > 0 && <button className='previous' onClick={() => setStartIndex(startIndex-articlesPerPage)}>previous</button>
            }
            {
                startIndex + articlesPerPage < numberOfArticle &&
                <button className='next' onClick={() => setStartIndex(startIndex + articlesPerPage)}>next</button>
            }
        </footer>
    );
}

export default Footer;