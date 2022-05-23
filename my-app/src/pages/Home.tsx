import React, {Component} from 'react';
import Article from '../components/Article';
import { IArticle } from '../components/article';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import { articleUrl } from '../models/const';


type MyProps = {};
type MyState = {
   articles: IArticle[];
   tempArticle: IArticle;
   startIndex: number;
   articlesPerPage: number;
   showModal: boolean;
}; 

class Home extends Component <MyProps , MyState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      articles: [] as IArticle[],
      tempArticle:{
        id: 0,
        title: '',
        tag: '',
        author: '',
        date: '',
        imgUrl: '',
        saying: '',
        content: ''
      },
      showModal: false,
      startIndex: 0,
      articlesPerPage: 3,
   
    }

    this.setStartIndex = this.setStartIndex.bind(this);
    this.getArticles = this.getArticles.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
  }

  componentDidMount() {
    this.getArticles();
  }

  getArticles() {
    fetch(articleUrl)
    .then((response) => response.json())
    .then((articles) => {
      this.setState({ articles: articles, });
    })
    .catch((error) => {
      console.error(error);
    })
  }

  setStartIndex(startIndex: number) {
    this.setState({ startIndex: startIndex })
  }

  openModal() {
    this.setState({ showModal: true });
  }
  
  closeModal() {
    this.setState({ showModal: false });
    this.setState({
      tempArticle: {
        id: 0,
        title: '',
        tag: '',
        author: '',
        date: '',
        imgUrl: '',
        saying: '',
        content: ''
      }
    });
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> ) {
    const { name, value } = event.target;
    this.setState((prevState) => {
      return {
        ...prevState,
        tempArticle: {
          ...prevState.tempArticle,
          [name]: value
        }
      }
    });
  }

  openEditModal(article: IArticle) {
    this.setState({ showModal: true,  tempArticle: {...article}});
  }

  render() {
    const {articles, startIndex: startIndex, articlesPerPage: articlesPerPage, showModal, tempArticle} = this.state;
    return (
      <main>
          <div className="button-box">
                <button className="button" onClick={this.openModal}>+ ADD ARTICLE</button>
          </div>
        {articles
          .filter((articles, index) => index >= startIndex && index < startIndex+ articlesPerPage) 
          .map ( article => (
            <Article 
              article = {article}
              key = {article.id} 
              openEditModal = {this.openEditModal}
              getArticle={this.getArticles}
            />
        ))}

      <Footer
          articlesPerPage={articlesPerPage}
          startIndex={startIndex}
          numberOfArticle={articles.length}
          setStartIndex={this.setStartIndex} />

      <Modal
          handleChange={this.handleChange}
          tempArticle={tempArticle}
          showModal={showModal}
          closeModal={this.closeModal}
          getArticles={this.getArticles}
        />
      </main>
    )
  }
}
export default Home;
