import { Button } from '@material-ui/core';
import React from 'react';
import './Login.css';
import { auth, provider } from './Firebase';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';

function Login() {

    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then(result => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                });
            })
            .catch(error=> alert(error.message));
    };

    return (
        <div className="login">
            <div className="login_container">
                <img
                    src="data:image/png;base64,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" 
                    alt=""
                />
                <div className="login_text">
                    <h1>Sign in to WhatsApp</h1>
                </div>
                <Button onClick={signIn}>
                    Sign In with Google
                </Button>
            </div>
        </div>
    );
}

export default Login
