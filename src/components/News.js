import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    category: 'general',
    pageSize: 8,
  };

  static propTypes = {
    category: PropTypes.string,
    pageSize: PropTypes.number,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
  }

  async componentDidMount() {
    this.fetchNews(this.state.page);
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.setState({ page: 1 });
      this.fetchNews(1);
    }
  }

fetchNews = async (page) => {
       this.props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&apiKey=641116daaa4640c0b5d3b87260c5937c&page=${page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
     this.props.setProgress(30)
    let parseData = await data.json();
      this.props.setProgress(70)
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
      page: page,
    });
       this.props.setProgress(100);
};

  // handleprevclick = () => {
  //   if (this.state.page > 1) {
  //     this.fetchNews(this.state.page - 1);
  //   }
  // };
  //
  // handlenextclick = () => {
  //   if (this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pageSize)) {
  //     this.fetchNews(this.state.page + 1);
  //   }
  // };
fetchMoreData = async () => {
    let nextPage = this.state.page + 1;
    let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&apiKey=97dcd084efd54f80a889c9393c48fc96&page=${nextPage}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
      page: nextPage,
    });
};

 render() {
  return (
    <>
      <h1 className="text-center" style={{ margin: '20px 0', fontWeight: 'bolder' }}>
        NewsMonkey - Top Headlines from {this.props.category}
      </h1>
        {this.state.loading && <Spinner/>}
      <InfiniteScroll
        dataLength={this.state.articles.length}
        next={this.fetchMoreData}
        hasMore={this.state.articles.length !== this.state.totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-3" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={element.description ? element.description.slice(0, 88) : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={!element.author ? "Unknown" : element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
}
}
export default News;
