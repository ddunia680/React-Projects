import React, { Component } from "react";
// import classes from './BuffetBuilder.module.css';
import Buffet from "../../components/Buffet/Buffet";
import BuildControls from "../../components/BuildControls/BuildControls";
import Aux from "../hoc/Auxiliary";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Buffet/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../hoc/withErrorHandler/withErrorHandler";

const ARTICLES_PRICES = {
    rice:12,
    meat: 17,
    fish: 20,
    ships: 14,
    fruits: 8
}

class BuffetBuilder extends Component{
    state = {
        articles: null,
        AmountPurchase: 4,
        cannotBeBought: false,
        modalShown: false,
        loading: false,
        error: false
    }

    componentDidMount = () => {
        axios.get('/articles.json')
        .then(response => {
            this.setState({articles: response.data, spin: false});
        }).catch(error => {
            this.setState({error: true})
        });
        
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
        // alert('Order sent!');
        this.setState({loading: true});
        const order = {
            articles: this.state.articles,
            price: this.state.AmountPurchase,
            customer: {
                name: 'Dunia',
                address: {
                    street: 'Lukuli',
                    zipCode: '39482',
                    country: 'Uganda'
                },
                emailAddress: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
        .then(response => {
            this.setState({loading: false, modalShown: false});
        })
        .catch(error => {
            this.setState({loading: false, modalShown: false});
            console.log(error);
        });

    }

   

    render() {
        let modalInner = null;

        let buffet = 
            this.state.error? 
                <p style={{marginTop: '10vh'}}>The articles cannot be loaded</p> : 
                <Spinner/>

        if(this.state.articles) {
        buffet = (
            <Aux>
        <Buffet articles={this.state.articles}/>
        <BuildControls
            addArticle={this.addArticleHandler}
            removeArticle={this.removeArticleHandler}
            articles={this.state.articles}
            amountOfPurchase={this.state.AmountPurchase}
            cannotBeBought={this.state.cannotBeBought}
            order={this.showModal}
        /></Aux>)

        
        modalInner = (
            <OrderSummary
                articles={this.state.articles} 
                totalPrice={this.state.AmountPurchase}
                closeModal={this.closeModal}
                sendOrder={this.sendOrder}
            />
        );
        }
        
        if(this.state.loading) {
            modalInner = <Spinner/>
        }


        console.log(this.state.cannotBeBought);
        return (
            <Aux>
                {this.state.modalShown ? 
                        <Modal 
                            show={this.state.modalShown}
                            clicked={this.closeModal}>
                                {modalInner}
                        </Modal>
                        
                : null}
               {buffet}
            </Aux>
        );
    }

}

export default withErrorHandler(BuffetBuilder, axios) ;