import React, {useEffect} from 'react';
import MyRouter from "../system/router/MyRouter";
import {BrowserRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addUser, getUserName} from "../system/store/postsAppSlice";
import Navbar from "./navbar/Navbar";

const MainComponent = () => {

    const dispatch = useDispatch();
    const savedName = localStorage.getItem('userName');
    const currentUser = useSelector(getUserName);

    useEffect(() => {
        if (savedName)
            dispatch(addUser(savedName));
    }, []);

    return (
        <BrowserRouter>
            {currentUser && <Navbar/>}
            <div className={'container pb-4'}>
                <MyRouter/>
            </div>
        </BrowserRouter>
    );
};

export default MainComponent;