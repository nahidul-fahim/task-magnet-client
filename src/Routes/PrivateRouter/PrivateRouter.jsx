import { Navigate, useLocation } from 'react-router-dom';
import useAuthProvider from '../../Hooks/useAuthProvider/useAuthProvider';
import LoadingAnimation from '../../Shared/LoadingAnimation/LoadinAnimation';


const PrivateRouter = ({ children }) => {

    const { currentUser, loading } = useAuthProvider();
    const location = useLocation();

    if (loading) {
        return <LoadingAnimation />
    }

    if (currentUser) {
        return children;
    }

    return (<Navigate state={location.pathname} to="/login"></Navigate>
    );
};

export default PrivateRouter;