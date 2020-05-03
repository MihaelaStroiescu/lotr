import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from './AuthContext';


function PrivateRoute({children, ...rest}) {
    let { userName } = useContext(AuthContext);
    if (!userName) {
        userName = localStorage.getItem('userName');
    }

    return (
        <Route
        {...rest}
        render={({ location }) =>
            userName ? (
            children
            ) : (
            <Redirect
                to={{
                pathname: "/login",
                state: { from: location }
                }}
            />
            )
        }
        />
    );
}

export default PrivateRoute;
