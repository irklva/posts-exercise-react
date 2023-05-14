import React from 'react';
import st from './my-modal.module.css';
import {useSelector} from "react-redux";

const MyModal = ({title, children}) => {

    const visible = useSelector(state => state.postsApp.modalVisible);

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