import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
// import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

   componentDidMount() {
        axios.get('/orders.json')
        .then(response => {
            console.log(response.data);
            const fetchedOrders = [];
            for (let key in response.data) {
                fetchedOrders.push({
                    ...response.data[key],
                id: key});
            }
            this.setState({loading: false, orders: fetchedOrders});
            console.log(this.state.orders);

        }).catch(error => {
            console.log(error);
            this.setState({loading: false});
        })
    }
    // let toDisplay = <Spinner/>
    // if(!loading) {
    //     toDisplay =  (
    //         orders.map(order => {
    //             <Order 
    //                 key={order.id}
    //                 articles={order.articles}
    //                 price={order.price.toFixed(2)} />
    //         })
    //     )
    // }

    render() {
        let ToDisplay = <Spinner/>
        if(!this.state.loading) {
            ToDisplay =
             this.state.orders.map(order => (
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
    }
  
};

export default Orders;