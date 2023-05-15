import React from 'react';
import MyButton from "../components/UI/button/MyButton";
import {useNavigate} from "react-router";
import {mainPagePath} from "../system/router/paths";

const ErrorPage = () => {

    const navigate = useNavigate();

    return (
        <div className={'container '}>
            <h1 className={'mb-4'}>Ooops, this page doesn't exist</h1>
            <MyButton style={'login'} onClick={() => navigate(mainPagePath)}>Go to main page</MyButton>
        </div>
    );
};

export default ErrorPage;