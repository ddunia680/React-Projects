import React, { Component } from "react";
// import classes from './BuffetBuilder.module.css';
import Buffet from "../../components/Buffet/Buffet";
import BuildControls from "../../components/BuildControls/BuildControls";
import Aux from "../hoc/Auxiliary";
import Modal from "../../components/UI/Modal/Modal";
// import Backdrop from "../../components/UI/Backdrop/Backdrop";

const ARTICLES_PRICES = {
    rice:12,
    meat: 17,
    fish: 20,
    ships: 14,
    fruits: 8
}

class BuffetBuilder extends Component{
    state = {
        articles: {
            rice:0,
            meat: 0,
            fish: 0,
            ships: 0,
            fruits: 0
        },
        AmountPurchase: 4,
        cannotBeBought: false,
        modalShown: false
    }

    updatePurchasable(articles){
        const sum = Object.keys(articles)
            .map(el => {
                return articles[el]
            }).reduce((sum, el) => {
                return sum + el
            },0);  
        this.setState({cannotBeBought: sum > 0})
    }

    addArticleHandler = (type) => {
        const oldCount = this.state.articles[type];
        const updatedCount = oldCount + 1;
        const updatedArticles = {
            ...this.state.articles
        }

        updatedArticles[type] = updatedCount;
        this.setState({articles: updatedArticles});
        const amount = this.state.AmountPurchase;
        this.setState({AmountPurchase: amount + ARTICLES_PRICES[type]});
        this.setState({cannotBeBought: false});
        this.updatePurchasable(updatedArticles);
    }

    removeArticleHandler = (type) => {
        const oldCount = this.state.articles[type];
        const updatedCount = oldCount - 1;
        const updatedArticles = {
            ...this.state.articles
        }

        updatedArticles[type] = updatedCount;
        this.setState({articles: updatedArticles});
        const amount = this.state.AmountPurchase;
        this.setState({AmountPurchase: amount - ARTICLES_PRICES[type]});
        this.updatePurchasable(updatedArticles);
    }
    
    showModal = () => {
        this.setState({modalShown: true});
    }
    
    closeModal = () => {
        this.setState({modalShown: false})
    }

    sendOrder = () => {
        alert('Order sent!');
        this.setState({modalShown: false});
    }

    render() {
        console.log(this.state.cannotBeBought);
        return (
            <Aux>
                {this.state.modalShown ? 
                        <Modal 
                        articles={this.state.articles} 
                        totalPrice={this.state.AmountPurchase}
                        show={this.state.modalShown}
                        closeModal={this.closeModal}
                        sendOrder={this.sendOrder}
                        />
                : null}
               
                <Buffet articles={this.state.articles}/>
                <BuildControls
                    addArticle={this.addArticleHandler}
                    removeArticle={this.removeArticleHandler}
                    articles={this.state.articles}
                    amountOfPurchase={this.state.AmountPurchase}
                    cannotBeBought={this.state.cannotBeBought}
                    order={this.showModal}
                />
            </Aux>
        );
    }

}

export default BuffetBuilder;