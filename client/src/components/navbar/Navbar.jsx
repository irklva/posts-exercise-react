import React from 'react';
import st from './navbar.module.css';
import MyButton from "../UI/button/MyButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {removeUser} from "../../system/store/postsAppSlice";
import {useNavigate} from "react-router";
import {loginPage} from "../../system/router/paths";

const Navbar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userName = useSelector(state => state.postsApp.userName);

    const logout = () => {
        localStorage.removeItem('userName');
        dispatch(removeUser());
        navigate(loginPage);
    };

    return (
        <div className={st.main}>
            <div className={'container d-flex justify-content-between justify-content-lg-end align-items-center h-100'}>
                <div className={'me-2 mx-lg-5 d-flex align-items-center'}>
                    <FontAwesomeIcon icon={faUser} size="xl" style={{color: "#ffffff"}} />
                    <h3>{userName}</h3>
                </div>
                <MyButton style={'action'} onClick={() => logout()}>
                    LogOut
                </MyButton>
            </div>
        </div>
    );
};

export default Navbar;