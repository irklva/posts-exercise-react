import {loginPagePath, mainIdPage, mainPagePath} from "./paths";
import LoginPage from "../../pages/LoginPage";
import MainPage from "../../pages/main/MainPage";

export const privateRoutes = [
    {paths: ['', '/', mainPagePath, loginPagePath, mainIdPage], element: <MainPage/>}
]

export const publicRoutes = [
    {paths: ['', '/', loginPagePath], element: <LoginPage/>}
]