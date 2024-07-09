// components/PrivateRoute.js

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';


function isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}

const PrivateRoute = ({ children }) => {
    const navigate = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const isAuthenticated = sessionStorage.getItem("userId");
        if (!isAuthenticated && isEmpty(isAuthenticated)) {
            navigate.push('/');
        } else if (!isEmpty(isAuthenticated) && pathname === "/") {
            navigate.push('/dashboard');
        }
    }, [navigate, pathname]);

    return <>{children}</>;
};

export default PrivateRoute;

