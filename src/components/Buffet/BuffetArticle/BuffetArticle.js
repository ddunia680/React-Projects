import React, { Component } from "react";
import classes from './BuffetArticle.module.css';
import PropTypes from 'prop-types' 

class BuffetArticle extends Component {
    render() {
        let article = null;

        switch (this.props.type) {
            case('rice'):
                article = <div className={classes.Rice}></div>
                break;
            case('meat'):
                article = <div className={classes.Meat}></div>
                break;
            case('fish'):
                article = <div className={classes.Fish}></div>
                break;
            case('ships'):
                article = <div className={classes.Ships}></div>
                break;
            case('fruits'):
                article = <div className={classes.Fruits}></div>
                break;
            default:
                article = null;
        }

        return article;

    }

}

BuffetArticle.protoTypes = {
    type: PropTypes.string.isRequired
}

export default BuffetArticle;