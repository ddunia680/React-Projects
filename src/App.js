import './App.css';
import BuffetBuilder from './containers/BuffetBuilder/BuffetBuilder';
import Layout from './containers/hoc/Layout/Layout';
import { Routes, Route } from 'react-router-dom';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
// import AuthSignUp from './containers/Auth/AuthSignUp';
// import AuthSignIn from './containers/Auth/AuthSignIn';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { LOGOUT, SETNEWTIMEOUT, SETTOKEN } from './store/reducers/authenticate';
import Logout from './containers/Auth/Logout/logout';
import asyncComponent from './containers/hoc/asyncComponent/asyncComponent';

function App() {
  let dispatch = useDispatch();
  let signinCase = useSelector(state => state.authenticate.signinCase);
  const token = localStorage.getItem('token');
  const authCheck = () => {
    if(!token) {
      dispatch(LOGOUT());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if(expirationDate > new Date()) {
        dispatch(SETTOKEN(token));
        dispatch(SETNEWTIMEOUT((expirationDate.getTime - new Date().getTime()) / 1000 ))
      } else {
        dispatch(LOGOUT());
      }
    }
  }

  useEffect(() => {
    authCheck();
  }, []);


  const AsyncLoadCheckout = asyncComponent(() => {
    return import('./containers/Checkout/Checkout');
  });

  const AsyncLoadAuthSignIn = asyncComponent(() => {
    return import('./containers/Auth/AuthSignIn');
  });

  const AsyncLoadAuthSignUp = asyncComponent(() => {
    return import('./containers/Auth/AuthSignUp');
  });

  const AsyncLoadOrders = asyncComponent(() => {
    return import('./containers/Orders/Orders');
  });

  let authentComponent = null;
  if(signinCase) {
    authentComponent = <AsyncLoadAuthSignIn/>
  } else {
    authentComponent = <AsyncLoadAuthSignUp/>
  }



  let routes;

  if(token) {
    routes = (
      <Routes>
            <Route path='/checkout/*' element={<AsyncLoadCheckout/>}/>
            <Route path='/' element={<BuffetBuilder/>}/>
            <Route path='/orders' element={<AsyncLoadOrders/>}/>
            <Route path='/auth' element={authentComponent}/>
            <Route path='/logout' element={<Logout/>} />
            <Route path='/*' element={<BuffetBuilder/>}/>
      </Routes>
    )
  } else {
    routes = (
      <Routes>
        <Route path='/auth' element={authentComponent}/>
        <Route path='/' element={<BuffetBuilder/>}/>
        <Route path='/checkout/*' element={<AsyncLoadCheckout/>} />
        <Route path='/*' element={<BuffetBuilder/>}/>
      </Routes>
    )
  }

  return (
    <div className="App">
      <Layout>
        {routes}
      </Layout>
    </div>
  );
}

export default App;
