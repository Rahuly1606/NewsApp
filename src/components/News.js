import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps = {
      category : 'general',
      pageTitle: 8
  }
  static propTypes = {
    category : PropTypes.string,
    pageSize : PropTypes.number,
  }
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }

 async componentDidUpdate(prevProps) {
  if (prevProps.category !== this.props.category) {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=97dcd084efd54f80a889c9393c48fc96&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
      page: 1,
    });
  }
}

  handleprevclick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=97dcd084efd54f80a889c9393c48fc96&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();

    this.setState({
      page: this.state.page - 1,
      articles: parseData.articles,
      loading: false,
    });
  };

  handlenextclick = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=97dcd084efd54f80a889c9393c48fc96&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
      this.setState({ loading: true });
      let data = await fetch(url);
      let parseData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parseData.articles,
        loading: false,
      });
    }
  };

 render() {
  return (
    <div className="container my-3">
      <h1 className="text-center" style={{margin:'20px 0', fontWeight:'bolder'}}> NewsMonkey - Top Headlines</h1>
      {this.state.loading && <Spinner />}
      {!this.state.loading && (
        <div className="row">
          {this.state.articles && this.state.articles.length > 0 && this.state.articles.map((element) => {
            return (
              <div className="col-md-3" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={element.description ? element.description.slice(0, 88) : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url} author={!element.author?"Unknown":element.author} date={element.publishedAt} source={element.source.name} />

              </div>
            );
          })}
        </div>
      )}
      <div className="d-flex justify-content-between">
        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handleprevclick}>
          &larr; Previous
        </button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handlenextclick}>
          Next &rarr;
        </button>
      </div>
    </div>
  );
}
}

export default News;
