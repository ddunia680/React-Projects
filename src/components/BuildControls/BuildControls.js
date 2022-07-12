import React from "react";
import classes from './BuildControls.module.css';
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    {label: 'Rice', type: 'rice'},
    {label: 'Meat', type: 'meat'},
    {label: 'Fish', type: 'fish'},
    {label: 'Ships', type: 'ships'},
    {label: 'Fruits', type: 'fruits'}
];

const buildControls = (props) => {
    return (
        <div className={classes.BuffetBuilder}>
            <p className={classes.amount}>Total Price: <strong>{props.amountOfPurchase} $</strong></p>
            {controls.map(ctrl => {
                return (
                    <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    removed={() => props.removeArticle(ctrl.type)}
                    added={() => props.addArticle(ctrl.type)}
                    disabled={props.articles[ctrl.type] === 0}
                    
                />
                );
                
            })}
            <button 
                className={classes.OrderButton} 
                disabled={!props.cannotBeBought}
                onClick={props.order}>Order Now</button>
        </div>
    );
}

export default buildControls;