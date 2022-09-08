import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import Buffet from '../../components/Buffet/Buffet';
import Button from '../../components/UI/Button/Button';

import ContactData from './ContactData/ContactData';

const Checkout = () => {
    const [articles, setArticles] = useState(null);
    const loc = useLocation();
    const navigate = useNavigate();
    
    
    useEffect(() => {
        const arts ={...loc.state.arts};
        setArticles(arts);
    },[loc.state.arts])

    const cancelBtnHandler = () => {
        navigate('/');
    }

    const continueBtnHandler = () => {
        navigate('/checkout/data', {state: {...loc.state}});
    }

    return (
        <div>
            <h1>Hope your guests will enjoy!</h1>
            {articles? <Buffet articles={articles}/> : null}
            <Button btnType='Danger' clicked={cancelBtnHandler}>CANCEL</Button>
            <Button btnType='Continue' clicked={continueBtnHandler}>CONTINUE</Button>
            <Routes>
                <Route path='/data' element={<ContactData/>}/>
            </Routes>
            
        </div>
    );
};

export default Checkout;