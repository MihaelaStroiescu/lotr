import React from 'react';

const AuthContext = React.createContext({
    userName: {},
    setUserName: () => {}
});

export default AuthContext;
