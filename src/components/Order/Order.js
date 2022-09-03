import React from 'react';
import classes from './Order.module.css';

const Order = (props) => {
    const articles = [];

    for(let artName in props.articles) {
        articles.push({
            name: artName,
            amount: props.articles[artName]
        })
    }

    const articleOutput = articles.map(art => {
        return <span
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px',
                    borderRadius: '5px'
                }}
                key={art.name}
                >
                    {art.name} ({art.amount})
                </span>
    })
    return (
        <div className={classes.Order}>
            <p>Articles: {articleOutput}</p>
            <p>Price: <strong>USD {props.price}</strong></p>
        </div>
    );
};

export default Order;