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

  async componentDidMount() {
    // Changed pageSize=20 to pageSize=15 to load 15 articles per page
    let url = "https://newsapi.org/v2/everything?q=(sports%20OR%20politicsORstocks)%20AND%20India&from=2024-11-13&sortBy=publishedAt&apiKey=641116daaa4640c0b5d3b87260c5937c&page=1&pageSize=15\n";
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({ articles: parseData.articles, totalResults: parseData.totalResults });
  }

  handleprevclick = async () => {

    let url = `https://newsapi.org/v2/everything?q=(sports%20OR%20politicsORstocks)%20AND%20India&from=2024-11-13&sortBy=publishedAt&apiKey=641116daaa4640c0b5d3b87260c5937c&page=${this.state.page - 1}&pageSize=15\n`;
    let data = await fetch(url);
    let parseData = await data.json();

    this.setState({
      page: this.state.page - 1,
      articles: parseData.articles,
    });
  };

  handlenextclick = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 15)) {
    } else {
      let url = `https://newsapi.org/v2/everything?q=(sports%20OR%20politicsORstocks)%20AND%20India&from=2024-11-13&sortBy=publishedAt&apiKey=641116daaa4640c0b5d3b87260c5937c&page=${this.state.page + 1}&pageSize=15\n`;
      let data = await fetch(url);
      let parseData = await data.json();
      this.setState({ loading: true });
      this.setState({
        page: this.state.page + 1,
        articles: parseData.articles,
      });
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center"> NewsMonkey - Top Headlines</h1>
        <div className="row">
          {this.state.articles &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-3" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={element.description ? element.description.slice(0, 88) : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
        </div>
        <div className="d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handleprevclick}>
            &larr; Previous
          </button>
          <button type="button" className="btn btn-dark" onClick={this.handlenextclick}>
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
