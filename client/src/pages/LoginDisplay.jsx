import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {addUser} from "../system/store/postsAppSlice";
import MyButton from "../components/UI/button/MyButton";
import {useNavigate} from "react-router";
import {usePathName} from "../hooks/usePathName";
import MyInput from "../components/UI/input/MyInput";

const LoginDisplay = () => {

    const [nameInput, setNameInput] = useState('');
    const [errorText, setErrorText] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const pathName = usePathName();

    const login = event => {
        event.preventDefault();
        if (!nameInput.trim()) {
            setErrorText("username can't be empty")
            return;
        }
        localStorage.setItem('userName', nameInput);
        dispatch(addUser(nameInput));
    };

    return (
        <div className={'container'}>
            <h1>Login with username</h1>
            <form className={'my_form'} onSubmit={login}>
                <div className={'separate_group'}>
                    <MyInput
                        placeholder="Enter username"
                        onChange={e => {
                            setNameInput(e.target.value);
                            setErrorText('');
                        }}
                    />
                </div>
                <div className={'text-danger px-4'}>
                    {errorText}
                </div>
                <div className={'separate_group'}>
                    <MyButton style={'login'} type="submit">
                        Login
                    </MyButton>
                </div>
            </form>
        </div>
    );
};

export default LoginDisplay;