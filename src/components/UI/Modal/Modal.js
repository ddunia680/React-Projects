import React from "react";
import classes from './Modal.module.css';
import Aux from "../../../containers/hoc/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";

const modal = (props) => {
    const articles = Object.keys(props.articles)
    .map(art => {
        return <li key={art}>{art}: {props.articles[art]}</li>
    });
    console.log(articles);
    return (
        <Aux>
            <Backdrop clicked={props.closeModal}/>
        <div className={classes.modal}
            style={{
                transform: 
                    props.show ? 
                        'translateY(0)' : 
                        'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
            }}>
            <h3>Your Order</h3>
            <p>A very nice buffet for your guests</p>
            <ul>
               {articles}
            </ul>
            <p><strong>Total Price: {props.totalPrice}</strong></p>
            <p>Continue to Checkout?</p>
            <div>
                <button 
                    className={classes.Danger}
                    onClick={props.closeModal}>CANCEL</button>
                <button 
                    className={classes.Continue}
                    onClick={props.sendOrder}>CONTINUE</button>
            </div>
        </div>
        </Aux>
    );

}

export default modal;