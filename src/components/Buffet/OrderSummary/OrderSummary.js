import React from "react";
import Aux from "../../../containers/hoc/Auxiliary";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
    const articles = Object.keys(props.articles)
    .map(art => {
        return <li key={art}>{art}: {props.articles[art]}</li>
    });
    return (
        <Aux>
           
            <h3>Your Order</h3>
            <p>A very nice buffet for your guests</p>
            <ul>
               {articles}
            </ul>
            <p><strong>Total Price: {props.totalPrice} $</strong></p>
            <p>Continue to Checkout?</p>
            <div>
                <Button 
                    btnType={'Danger'}
                    clicked={props.closeModal}>CANCEL</Button>
                <Button 
                    btnType={'Continue'}
                    clicked={props.sendOrder}>CONTINUE</Button>
            </div>
        </Aux>
    );

}

export default orderSummary;