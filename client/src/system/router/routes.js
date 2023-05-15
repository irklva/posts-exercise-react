import {loginPage, mainPage, postsMainPage} from "./paths";
import LoginDisplay from "../../pages/LoginDisplay";
import MainPage from "../../pages/main/MainPage";

export const privateRoutes = [
    {paths: ['', '/', mainPage, postsMainPage, loginPage], element: <MainPage/>}
]

export const publicRoutes = [
    {paths: ['', '/', loginPage], element: <LoginDisplay/>}
]