import React, { useEffect, useState } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
// import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import { useSelector } from 'react-redux';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';

function Orders() {
    let token = useSelector(state => state.authenticate.token);
    let userId = useSelector(state => state.authenticate.userId);
    let [orders, setOrders] = useState([]);
    let [loading, setLoading] = useState(true);

   useEffect(() => {
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
        .then(response => {
            const fetchedOrders = [];
            for (let key in response.data) {
                fetchedOrders.push({
                    ...response.data[key],
                id: key});
            }
            setLoading(false);
            setOrders(fetchedOrders);

        }).catch(error => {
            console.log(error);
            setLoading(false);
        })
   }, []);
        
  
        let ToDisplay = <Spinner/>
        if(!loading) {
            ToDisplay =
             orders.map(order => (
                <Order 
                    key={order.id}
                    articles={order.articles}
                    price={order.price.toFixed(2)} />
            ))
        }
         return (
            <div>
                {ToDisplay}
            </div>
        );
  
};

export default withErrorHandler(Orders, axios);