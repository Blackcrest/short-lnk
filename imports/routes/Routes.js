import React from 'react';
import { Router, Route, Switch} from 'react-router';
import history from '../api/history';

import Login from '../ui/Login';
import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

export const routes = (
    <Router history={history}>
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/links" component={Link} />
            <Route component={NotFound} />
        </Switch>
    </Router>
);

export const onAuthChange = (isAuthenticated) => {
    const pathname = history.location.pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);

    if(isUnauthenticatedPage && isAuthenticated){
        history.replace('/links');
    } else if(isAuthenticatedPage && !isAuthenticated){
        history.replace("/")
    }
};