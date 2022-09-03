import React from "react";
import classes from './Buffet.module.css';
import BuffetArticle from "./BuffetArticle/BuffetArticle";

const buffet = (props) => {
    // there is need to check these props passing here and understand where the error is

    let transformedArticles = Object.keys(props.articles)
    .map(art => {
        return [...Array(props.articles[art])]
        .map((_, i) => {
            return <BuffetArticle key={art + i} type={art}/>
        });
    }).reduce((prevV, currentV) => {
        return prevV.concat(currentV);
    }, []);

    if(transformedArticles.length === 0) {
        transformedArticles = <p className={classes.defText}>Add an article</p>
    }


    return (
        <div className={classes.buffet}>
        <div className={classes.content}>
            {transformedArticles}
        </div>
        <div className={classes.tableContainer}>
            <div className={classes.tableDesk}></div>
            <div className={classes.tableLegs}>
                <div className={classes.tableLeg}></div>
                <div className={classes.tableLeg}></div>
            </div>

        </div>
    </div>
    );
}

export default buffet;