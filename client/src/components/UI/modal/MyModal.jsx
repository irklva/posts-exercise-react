import React from 'react';
import st from './my-modal.module.css';
import {useSelector} from "react-redux";
import {isModalVisible} from "../../../system/store/modalSlice";

const MyModal = ({title, children}) => {

    const visible = useSelector(isModalVisible);

    return (
        <>
            {visible &&
                <div className={st.main}>
                    <div className={`col-12 col-md-6 col-xl-4 ${st.content}`}>
                        <h4>{title}</h4>
                        {children}
                    </div>
                </div>
            }
        </>
    );
};

export default MyModal;