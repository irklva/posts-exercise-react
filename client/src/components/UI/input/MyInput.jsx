import React from 'react';
import st from './my-input.module.css'

const MyInput = ({...props}) => {
    return (
        <input
            className={`form-control ${st.main}`}
            type="text"
            {...props}
        />
    );
};

export default MyInput;