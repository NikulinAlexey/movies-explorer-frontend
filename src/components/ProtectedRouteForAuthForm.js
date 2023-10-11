import { Navigate } from "react-router-dom";

const ProtectedRouteForAuthForm = ({ element: Component, ...props }) => {
  return (
    !props.loggedIn ? <Component {...props} /> : <Navigate to="/" />
  )
};

export default ProtectedRouteForAuthForm;