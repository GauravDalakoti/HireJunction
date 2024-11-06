import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ authentication = true, children }) => {

    const auth = useSelector((state) => state.auth)
    const reqruiterToken = localStorage.getItem("reqruiterToken")

    return reqruiterToken ? children : <Navigate to="/login" />;

};

export default ProtectedRoute