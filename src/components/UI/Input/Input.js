import React from 'react';

import classes from './Input.module.css';

function Input(props) {

    const inputClasses = [classes.inputElement];
    if(!props.isValid && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    let inputElement = null;
    switch(props.elementType) {
        case('input'):
            inputElement = <input 
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                onChange={props.changed}
                value={props.value}/>
            break;
        case('select'):
        inputElement = <select
            className={inputClasses.join(' ')}
            onChange={props.changed}
            value={props.value}
            >
                {props.elementConfig.options.map(opt => (
                    <option 
                        key={opt.value}
                        value={opt.value}
                        
                         >{opt.displayValue}</option>
                ))}
            </select>
            break;
        default: 
        inputElement = <input 
            className={inputClasses.join(' ')}
            {...props.elementConfig}
            onChange={props.changed}
            value={props.value}/>
    }
    return (
        <div>
            <label className={classes.Label} >{props.label}</label>
            {inputElement}
        </div>
    );
}

export default Input;