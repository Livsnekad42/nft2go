import * as React from 'react';
import {
    Route,
    Redirect,
    RouteProps,
} from 'react-router-dom';
import {isLogged} from "../settings/utils";

interface IPrivateRouteProps extends RouteProps {
    component: any;
}

const PrivateRoute = (props: IPrivateRouteProps) => {
    const { component: Component,  ...rest } = props;

    return (
        <Route
            {...rest}
            render={(routeProps) =>
                isLogged() ? (
                    <Component {...routeProps} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: routeProps.location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;