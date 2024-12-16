import React from 'react'
import {format} from "date-fns";

const NewsItem =(props)=> {

        let {title,description,imageUrl, newsUrl,author,date,source} = props;
        return (
            <div className="my-3">
                <div className="card">
                <span
                    className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'85%',zIndex:1}}>{source}</span>
                    <img
                        src={!imageUrl ? "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg" : imageUrl}
                        className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">by {author} on {format(new Date(date), 'dd MMM yyyy')}</small></p>
                        <a href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }

export default NewsItem