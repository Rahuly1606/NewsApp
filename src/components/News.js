import React, {Component} from 'react'
import NewsItem from './NewsItem';

export class News extends Component{


      constructor() {
          super();
           this.state = {
              articles: [],
              loading: false
          }
      }
          async componentDidMount() {
              let url = "https://newsapi.org/v2/everything?q=(sports OR politics) AND India&from=2024-11-13&sortBy=publishedAt&apiKey=641116daaa4640c0b5d3b87260c5937c\n"
              let data = await fetch(url)
              let parseData = await data.json()
              this.setState({articles: parseData.articles})
          }

    render(){
      return(
        <div className="container my-3">
          <h2> NewsMonkey - Top Headlines</h2>
             <div className="row">
            {this.state.articles.map((element)=> {
                return <div className="col-md-3" key={element.url}>
                        <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""}
                                  imageUrl={element.urlToImage} newsUrl={element.url}/>
                    </div>

            })}
            </div>
        </div>
      )
    }
}


export default News