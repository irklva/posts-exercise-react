import {useLocation} from "react-router-dom";

export const usePathName = () => {
    return useLocation().pathname.substring(1);
};