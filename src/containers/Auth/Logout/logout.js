import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { LOGOUT } from '../../../store/reducers/authenticate';

function Logout() {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    useEffect(() => {
        dispatch(LOGOUT());
        navigate('/');
    }, [])
    return (
        <div>
            
        </div>
    );
}

export default Logout;