import React from 'react';
import st from './my-modal.module.css';
import {useDispatch, useSelector} from "react-redux";
import {setVisible} from "../../../system/store/postsAppSlice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

const MyModal = ({title, children}) => {

    const dispatch = useDispatch();
    const visible = useSelector(state => state.postsApp.modalVisible);

    return (
        <div className={visible ? `${st.main} ${st.active}` : st.main}>
            <div className={`col-12 col-md-6 col-xl-4 ${st.content}`}>
                <div className={'d-flex justify-content-between'}>
                    <h4>{title}</h4>
                    <button className={`btn_empty ${st.btn_close}`} onClick={() => dispatch(setVisible())}>
                        <FontAwesomeIcon icon={faXmark} style={{color: "#616073",}} />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default MyModal;