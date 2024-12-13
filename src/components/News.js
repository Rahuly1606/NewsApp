import React, { Component } from 'react';
import NewsItem from './NewsItem';

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async fetchArticles(page) {
    const pageSize = 15;
    const url = `https://newsapi.org/v2/everything?q=(sports%20OR%20politicsORstocks)%20AND%20India&from=2024-11-13&sortBy=publishedAt&apiKey=641116daaa4640c0b5d3b87260c5937c&page=${page}&pageSize=${pageSize}`;
    this.setState({ loading: true });
    const data = await fetch(url);
    const parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      loading: false,
    });
  }

  async componentDidMount() {
    this.fetchArticles(this.state.page);
  }

  handleprevclick = async () => {
    const newPage = this.state.page - 1;
    if (newPage >= 1) {
      this.setState({ page: newPage });
      this.fetchArticles(newPage);
    }
  };

  handlenextclick = async () => {
    const newPage = this.state.page + 1;
    const totalPages = Math.ceil(975 / 15); // Total number of pages
    if (newPage <= totalPages) {
      this.setState({ page: newPage });
      this.fetchArticles(newPage);
    }
  };

    render(){
      return(
        <div className="container my-3">
          <h2> NewsMonkey - Top Headlines</h2>
            <div className="row">
                {this.state.articles && this.state.articles.map((element) => {
                    return <div className="col-md-3" key={element.url}>
                        <NewsItem title={element.title ? element.title.slice(0, 45) : ""}
                                  description={element.description ? element.description.slice(0, 88) : ""}
                                  imageUrl={element.urlToImage} newsUrl={element.url}/>
                    </div>

                })}
                </div>
            <div className="d-flex justify-content-between">
            <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handleprevclick}> &larr; Previous</button>
                <button  type="button" className="btn btn-dark" onClick={this.handlenextclick}>Next &rarr; </button>
            </div>
        </div>
      )
    }
}


export default News