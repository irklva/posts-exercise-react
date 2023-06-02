import React from 'react';
import {useSelector} from "react-redux";
import {privateRoutes, publicRoutes} from "./routes";
import {Route, Routes} from "react-router";
import ErrorPage from "../../pages/ErrorPage";
import LoginDisplay from "../../pages/LoginDisplay";
import {getUserName} from "../store/userSlice";

const MyRouter = () => {

    const currentUser = useSelector(getUserName);

    return currentUser ?
        (
            <Routes>
                {privateRoutes.map(route =>
                    route.paths.map(p =>
                        <Route
                            key={p}
                            element={route.element}
                            path={p}
                        />
                    )
                )}
                <Route element={<ErrorPage/>} path='*'/>
            </Routes>
        )
        :
        (
            <Routes>
                {publicRoutes.map(route =>
                    route.paths.map(p =>
                        <Route
                            key={p}
                            element={route.element}
                            path={p}
                        />
                    )
                )}
                <Route element={<LoginDisplay/>} path='*'/>
            </Routes>
        );
};

export default MyRouter;