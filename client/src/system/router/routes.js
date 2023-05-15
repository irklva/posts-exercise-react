import {loginPagePath, mainIdPage, mainPagePath} from "./paths";
import LoginDisplay from "../../pages/LoginDisplay";
import MainPage from "../../pages/main/MainPage";

export const privateRoutes = [
    {paths: ['', '/', mainPagePath, loginPagePath, mainIdPage], element: <MainPage/>}
]

export const publicRoutes = [
    {paths: ['', '/', loginPagePath], element: <LoginDisplay/>}
]