import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const fetchNews = async (page) => {
    props.setProgress(10);
    const url  = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=641116daaa4640c0b5d3b87260c5937c&page=${page}&pageSize=${props.pageSize}`
  
    setLoading(true);
    const data = await fetch(url);
    props.setProgress(30);
    const parseData = await data.json();
    props.setProgress(70);
    setArticles((prevArticles) => (page === 1 ? parseData.articles : [...prevArticles, ...parseData.articles]));
    setTotalResults(parseData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    setPage(1);
    fetchNews(1)
  }, [props.category]);

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const url  = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=641116daaa4640c0b5d3b87260c5937c&page=${nextPage}&pageSize=${props.pageSize}`
    const data = await fetch(url);
    const parseData = await data.json();
    setArticles((prevArticles) => [...prevArticles, ...parseData.articles]);
    setPage(nextPage);
  };


  return (
    <>
      <h1 className="text-center" style={{ margin: '50px 0', fontWeight: 'bolder' }}>
        NewsMonkey - Top Headlines from {props.category}
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => (
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
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  category: 'general',
  pageSize: 8,
};

News.propTypes = {
  category: PropTypes.string,
  pageSize: PropTypes.number,
  setProgress: PropTypes.func.isRequired,
};
export default News;
