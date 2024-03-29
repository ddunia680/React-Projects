import React, { useState, useEffect } from "react";
// import classes from './BuffetBuilder.module.css';
import Buffet from "../../components/Buffet/Buffet";
import BuildControls from "../../components/BuildControls/BuildControls";
import Aux from "../hoc/Auxiliary";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Buffet/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../hoc/withErrorHandler/withErrorHandler";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ADDARTICLES, SETSTATUS } from "../../store/reducers/articles";
import { ADDTOTALPRICE, RESETTOTALPRICE } from "../../store/reducers/totalPrice";
import { getArticles } from "../../store/reducers/articles";

const ARTICLES_PRICES = {
    rice:12,
    meat: 17,
    fish: 20,
    ships: 14,
    fruits: 8
}

function BuffetBuilder() {
    // let [articles, setArticles] = useState(null);
    let {articles} = useSelector(state => state.articles);
    let {totalPrice} = useSelector(state => state.totalPrice);
    let statusGet = useSelector(state => state.articles.statusGet);
    let dispatch = useDispatch();
    // let [AmountPurchase, setAmountPurchase] = useState(4);
    let [cannotBeBought, setCannotBeBought] = useState(false);
    let [modalShown, setModalShown] = useState(false);
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState(false);
    let [Spin, setSpin] = useState(true);

    const navigate = useNavigate();


    useEffect(() => {
        dispatch(RESETTOTALPRICE());
        dispatch(SETSTATUS('idle'));
        dispatch(getArticles());
        // axios.get('/articles.json')
        // .then(response => {
        //     // setArticles(response.data);
        //     dispatch(ADDARTICLES(response.data));
        //     setSpin(false);
        // }).catch(error => {
        //     setError(true);
        // });
        
    }, [])

    useEffect(() => {
        if(statusGet === 'succeeded') {
        setSpin(false);
    }
    }, [statusGet])
    

    const updatePurchasable = (arts) => {
        const sum = Object.keys(arts)
            .map(el => {
                return arts[el]
            }).reduce((sum, el) => {
                return sum + el
            },0);  
        setCannotBeBought(sum > 0);
    }

    const addArticleHandler = (type) => {
        const oldCount = articles[type];
        const updatedCount = oldCount + 1;
        const updatedArticles = {
            ...articles
        }

        updatedArticles[type] = updatedCount;
        // setArticles(updatedArticles);
        dispatch(ADDARTICLES(updatedArticles));
        // setAmountPurchase(amount + ARTICLES_PRICES[type]);
        dispatch(ADDTOTALPRICE(( totalPrice + ARTICLES_PRICES[type])));
        setCannotBeBought(false);
        updatePurchasable(updatedArticles);
    }

    const removeArticleHandler = (type) => {
        const oldCount = articles[type];
        const updatedCount = oldCount - 1;
        const updatedArticles = {
            ...articles
        }

        updatedArticles[type] = updatedCount;
        // setArticles(updatedArticles);
        dispatch(ADDARTICLES(updatedArticles));
        // setAmountPurchase(amount - ARTICLES_PRICES[type]);
        dispatch(ADDTOTALPRICE((totalPrice - ARTICLES_PRICES[type])));
        updatePurchasable(updatedArticles);
    }
    
    const showModal = () => {
        setModalShown(true);
    }
    
    const closeModal = () => {
        setModalShown(false);
    }

    const sendOrder = () => {
        // // alert('Order sent!');
        navigate('/checkout')
    }

    const beforeSigning = () => {
        navigate('/auth');
    }

   
        let modalInner = null;

        let buffet = 
            error? 
                <p style={{marginTop: '10vh'}}>The articles cannot be loaded</p> : 
                <Spinner/>
        
        if(Spin) {
            buffet = <Spinner/>
        } else {
            if(articles) {
                buffet = (
                    <Aux>
                        <Buffet/>
                        <BuildControls
                            addArticle={addArticleHandler}
                            removeArticle={removeArticleHandler}
                            articles={articles}
                            amountOfPurchase={totalPrice}
                            cannotBeBought={cannotBeBought}
                            beforeSignin={beforeSigning}
                            order={showModal}
                        /></Aux>)
                }

        

        
        modalInner = (
            <OrderSummary
                // articles={articles} 
                // totalPrice={totalPrice}
                closeModal={closeModal}
                sendOrder={sendOrder}
            />
        );
        }
        
        if(loading) {
            modalInner = <Spinner/>
        }

        return (
            <Aux>
                {modalShown ? 
                        <Modal 
                            show={modalShown}
                            clicked={closeModal}>
                                {modalInner}
                        </Modal>
                        
                : null}
               {buffet}
            </Aux>
        );
}

export default withErrorHandler(BuffetBuilder, axios) ;