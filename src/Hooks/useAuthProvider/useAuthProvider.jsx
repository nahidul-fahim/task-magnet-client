import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const useAuthProvider = () => {
    
    const authInfo = useContext(AuthContext);

    return authInfo;
};

export default useAuthProvider;