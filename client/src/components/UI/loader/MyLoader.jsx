import React from 'react';
import {ThreeDots} from "react-loader-spinner";

const MyLoader = ({loaderHeight}) => {
    return (
        <>
            <ThreeDots
                height={loaderHeight || "80"}
                width={loaderHeight || "80"}
                radius="9"
                color="#616073"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            />
        </>
    );
};

export default MyLoader;