import React from "react";
import { useSelector } from "react-redux";
import Aux from "../../../containers/hoc/Auxiliary";
import Button from "../../UI/Button/Button";

const OrderSummary = (props) => {
    let { articles } = useSelector(state => state.articles);
    let { totalPrice } = useSelector(state => state.totalPrice);

    const arts = Object.keys(articles)
    .map(art => {
        return <li key={art}>{art}: {articles[art]}</li>
    });
    return (
        <Aux>
           
            <h3>Your Order</h3>
            <p>A very nice buffet for your guests</p>
            <ul>
               {arts}
            </ul>
            <p><strong>Total Price: {totalPrice} $</strong></p>
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

export default OrderSummary;