import React, {useEffect} from 'react';
import MyRouter from "../../system/router/MyRouter";
import {BrowserRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addUser, getUserName} from "../../system/store/userSlice";
import Navbar from "../navbar/Navbar";
import st from "./main-component.module.css";
import {getNeedGlobalLoader} from "../../system/store/loaderSlice";

const MainComponent = () => {

    const dispatch = useDispatch();
    const savedName = localStorage.getItem('userName');
    const currentUser = useSelector(getUserName);
    const globalLoader = useSelector(getNeedGlobalLoader);

    useEffect(() => {
        if (savedName)
            dispatch(addUser(savedName));
    }, []);

    return (
        <>
            {globalLoader &&
                <div className={st.global_loader}></div>
            }
            <BrowserRouter>
                {currentUser && <Navbar/>}
                <div className={'container pb-4'}>
                    <MyRouter/>
                </div>
            </BrowserRouter>
        </>
    );
};

export default MainComponent;