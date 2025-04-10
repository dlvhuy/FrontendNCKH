import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import { URL } from '@url';
import '@src/app/common/prototype';
import Loading from '@components/Loading';
import { login } from '@app/services/User';

const ResetPassword = lazy(() => import('@containers/Authenticator/ResetPassword/index'));
const ForgetPassword = lazy(() => import('@containers/Authenticator/ForgetPassword/index'));
const SearchDegree = lazy(() => import('@containers/SearchDegree/SearchDegree'));
const Login = lazy(() => import('@components/../containers/Authenticator/Login/Login'));


const LoginRoutes = (props) => {

  return (<Switch>
      <Route exact={true} path={URL.LOGIN} component={Login}/>
      <Route exact={true} path={URL.FORGET_PASSWORD} component={ForgetPassword}/>
      <Route exact={true} path={URL.RESET_PASSWORD} component={ResetPassword}/>
      <Route exact={true} path={URL.SEARCH_DEGREE} component={SearchDegree}/>
      <Redirect to={URL.LOGIN}/>
    </Switch> 
  );
};


export default withRouter(LoginRoutes);
