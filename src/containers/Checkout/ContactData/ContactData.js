import React, { useEffect, useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../../../components/UI/Spinner/Spinner';



import classes from './ContactData.module.css';


function ContactData() {
    let [articles, setArticles] = useState(null);
    let [AmountPurchase, setAmountPurchase] = useState(4);
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
    
    let price = +loc.state.AmountPurchase;


    useEffect(() => {
        let arts = {...loc.state.arts};
        setArticles(arts);
        setAmountPurchase(price);
    }, [loc.state.arts, price])


    const sendDataToBack = (event) => {
        event.preventDefault();
        
         setLoading(true);
        const order = {
            articles: articles,
            price: AmountPurchase,
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
            setLoading(false);
            navigate('/');
        })
        .catch(error => {
            setLoading(false);
        });
    }

    let form = <Spinner/>
    if(!loading) {
        form = (
            <form>
                <input type='text' name='name' placeholder='enter your name'/>
                <input type='email' name='Email' placeholder='enter your email'/>
                <input type='text' name='Street' placeholder='Your street name'/>
                <input type='text' name='Postal' placeholder='Your postal code'/>
                <br/>
                <Button btnType='Continue' clicked={sendDataToBack}>ORDER</Button>
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