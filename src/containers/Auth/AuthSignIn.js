import React, { useEffect, useState } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { CLEARERROR, LOGOUT, sendAuth } from '../../store/reducers/authenticate';
import { SWITCHCASE } from '../../store/reducers/authenticate';
import { useNavigate } from 'react-router';
import Spinner from '../../components/UI/Spinner/Spinner';

function Auth(props) {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let setting = useSelector(state => state.articles.settingTable);
    let token = useSelector(state => state.authenticate.token);
    let error = useSelector(state => state.authenticate.error);
    let status = useSelector(state => state.authenticate.status);
    let [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });

    const checkValidity = (value, rules) => {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.isEmail) {
            let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            isValid = pattern.test(value) && isValid;
        }
        return isValid;
    }

    const setLogoutTimeout = () => {
        setTimeout(() => {
            dispatch(LOGOUT());
        }, 3600 * 1000); //3600 being the timeout
    }

    const sendData = (event) => {
        event.preventDefault();

        const authData = {
            email: controls.email.value,
            password: controls.password.value
        }
        dispatch(sendAuth(authData));
        
    }

    useEffect(() => {
        if(token !== null) {
            if(setting) {
                navigate('/checkout');
                setLogoutTimeout();
            } else {
                navigate('/');
                setLogoutTimeout();
            }
        }
    }, [token]);

    const AlterIsSignedHandler = () => {
        dispatch(SWITCHCASE());
    }

    //this [something] means entering inside the defined-after-which object at that something attribute (VI) 
    const inputChangedHandler = (event, elName) => {
        dispatch(CLEARERROR());
        const updatedControls = {
            ...controls,
            [elName]: {
                ...controls[elName],
                value: event.target.value,
                valid: checkValidity(
                    event.target.value, 
                    controls[elName].validation),
                touched: true
            }
        }
        setControls(updatedControls);
    }


    let formElementsArray = [];
    for(let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key]
        })
    }

    let form;
    if(status === 'loading') {
        form = <Spinner/>
    } else {
        form = (
            <form onSubmit={event => sendData(event)}>
            {formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                isValid={formElement.config.valid}
                touched={formElement.config.touched}                    
                changed={(event) => inputChangedHandler(event, formElement.id)}
            />
            ))}
            <Button btnType='Continue'>SIGN IN</Button>
        </form>
        )
    }


    return (
        <div className={classes.auth}>
            <h2>SIGN IN</h2>
            {error ? <p style={{color: 'red'}}>Invalid data entered or not yet signed up</p>: null}
           {form}
            <p><b>Not Yet Signed Up ? </b> 
                <Button 
                    btnType='Danger'
                    clicked={AlterIsSignedHandler}>SIGN UP
                </Button>
            </p>
        </div>
    );
}

export default Auth;