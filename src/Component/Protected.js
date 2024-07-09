// import { Navigate, Outlet } from "react-router-dom";

// const Protected = () => {
//   const token = sessionStorage.getItem("userId");
//   return token ? <Outlet /> : <Navigate to="/" />;
// };

// export default Protected;

import { Navigate, Outlet } from "react-router-dom"

export default function Protected({ children }) {
    const token = sessionStorage.getItem("userId");
    if (token) {
        return <Navigate to={"/dashboard"} />
    }
    return children ? children : <Outlet />
}