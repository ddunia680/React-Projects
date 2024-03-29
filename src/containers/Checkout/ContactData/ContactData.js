import React, { useEffect, useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { checkValidity } from '../../hoc/utility/utility';



import classes from './ContactData.module.css';
import Input from '../../../components/UI/Input/Input';
import { element } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { sendArticles } from '../../../store/reducers/articles';
import { ADDTOTALPRICE } from '../../../store/reducers/totalPrice';


function ContactData() {
    let { articles } = useSelector(state => state.articles);
    let { totalPrice } = useSelector(state => state.totalPrice);
    let statusSend = useSelector(state => state.articles.statusSend);
    let token = useSelector(state => state.authenticate.token);
    let userId = useSelector(state => state.authenticate.userId);
    let dispatch = useDispatch();


    let [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name' 
            },
            Validation: {
                required: true,
                minLength: 3
            },
            value: '',
            valid: false,
            touched: false
            
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street' 
            },
            Validation: {
                required: true,
                minLength: 3
            },
            value: '',
            valid: false,
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Zip Code' 
            },
            Validation: {
                required: true,
                minLength: 3
            },
            value: '',
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country' 
            },
            Validation: {
                required: true,
                minLength: 3
            },
            value: '',
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-Mail' 
            },
            Validation: {
                required: true,
                minLength: 3
            },
            value: '',
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'fastest', displayValue: 'Fastest' },
                    {value: 'cheapest', displayValue: 'Cheapest'}
                ] 
            },
            Validation: {},
            value: 'fastest',
            valid: true,
            touched: false
        },
    });
    let [formIsValid, setFormValidity] = useState(false);
    // let [articles, setArticles] = useState(null);
    // let [AmountPurchase, setAmountPurchase] = useState(4);
    // let [cannotBeBought, setCannotBeBought] = useState(false);
    let [loading, setLoading] = useState(false);
    // let [error, setError] = useState(false);

    // let [name, setName] = useState('');
    // let [email, setEmail] = useState('');
    // let [address, setAddress] = useState({
    //     street: '',
    //     postalCode: ''
    // });

    let loc = useLocation();
    let navigate = useNavigate();
    
    // let price = +loc.state.AmountPurchase;


    useEffect(() => {
        if(statusSend === 'succeeded') {
            dispatch(ADDTOTALPRICE(0));
            navigate('/');

        }
    })


    const sendDataToBack = (event) => {
        event.preventDefault();
        
         setLoading(true);

         let customerInfo = {};
         for(let info in orderForm) {
                customerInfo[info] = orderForm[info].value
         }

        //  console.log(customerInfo);

        const order = {
            articles: articles,
            price: totalPrice,
            orderData: {
                ...customerInfo
            }
        }
        const orderToSend = {
            order: order,
            token: token,
            userId: userId
        }

        dispatch(sendArticles(orderToSend));
        // axios.post('/orders.json', order)
        // .then(response => {
        //     setLoading(false);
        //     navigate('/');
        // })
        // .catch(error => {
        //     setLoading(false);
        // });
    }


    let formElementArray = [];
    for(let key in orderForm) {
        formElementArray.push({
            id: key,
            config: orderForm[key]
        })
    }

    const onChangeHandler = (event, inputIdentifier) => {
        const updatedOrders = {
            ...orderForm
        }

        const updatedFormElement = {
            ...updatedOrders[inputIdentifier] 
        };

        const updatedValue = event.target.value;
        updatedFormElement.value = updatedValue;
        updatedFormElement.valid = checkValidity(updatedValue, updatedFormElement.Validation);
        updatedFormElement.touched = true;

        updatedOrders[inputIdentifier] = updatedFormElement;

        let formValid = true;
        for(inputIdentifier in updatedOrders) {
            formValid = updatedOrders[inputIdentifier].valid && formValid
        }
        // console.log(formValid);
        setFormValidity(formValid);
        setOrderForm(updatedOrders);
    }



    let form = <Spinner/>
    if(!loading) {
        form = (
            <form onSubmit={sendDataToBack}>
                {formElementArray.map(element => (
                    <Input 
                        key={element.id}
                        elementType={element.config.elementType}
                        elementConfig={element.config.elementConfig}
                        value={element.config.value}
                        isValid={element.config.valid}
                        touched={element.config.touched}
                        changed={(event) => onChangeHandler(event, element.id)}/>
                        
                ))}

                <Button btnType='Continue' isValid={!formIsValid}>ORDER</Button>
            </form>
        )
    }

    return (
        <div className={classes.ContactData}>
            <h4>Enter your contact Info</h4>
            {form}
        </div>
    );
}

export default ContactData;