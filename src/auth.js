import react from "react";

import { Route, Redirect } from "react-router-dom";

const isAuth = () =>{
    if(localStorage.getItem('token') !== null){
        return true;
    }
    return false;
}


const PrivateRoute = ({component : Component, ...rest}) => { 
    return(
        <Route
            {...rest}
            render = { props =>
                isAuth() ? (
                    <Component {...rest} />
                ): (
                    <Redirect
                        to={{
                            pathname: '/',
                            state : {message: "Usuario não autorizado."}
                        }}
                    />
                )

            }
        />
    );
}

export default PrivateRoute;