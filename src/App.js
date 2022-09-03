import './App.css';
import BuffetBuilder from './containers/BuffetBuilder/BuffetBuilder';
import Layout from './containers/hoc/Layout/Layout';
import { Routes, Route } from 'react-router-dom';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
            <Route path='/' element={<BuffetBuilder/>}/>
            <Route path='/checkout/*' element={<Checkout/>}/>
            <Route path='/orders' element={<Orders/>}/>
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
