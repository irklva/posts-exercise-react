import React from 'react';
import st from './my-button.module.css'

const MyButton = ({children, style, ...props}) => {

    const btnType = () => {
        switch (style) {
            case 'login':
                return st.login;
            case 'action':
                return  st.action;
            case 'body':
                return st.body;
            case 'body-second':
                return st.body_second;
        }
    }

    return (
        <button className={`btn btn-light ${st.main} ${btnType()}`} {...props}>{children}</button>
    );
};

export default MyButton;