import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import UserStore from './pages/UserStore';
import UserSearch from './pages/UserSearch';
import UserUpdate from './pages/UserUpdate';
import DailyReport from './pages/DailyReport';
import ReportShow from './pages/ReportShow';
import Login from './pages/Login';
import Page404 from './pages/Page404';
import UserShow from './pages/UserShow';
import Header from './components/Header';
import { useAuth } from './contexts/Auth';

// import { Container } from './styles';

function PrivateRoute({ signed, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        signed ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

function PublicRoute({ signed, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        signed ? (
          <Redirect
            to={{
              pathname: '/dashboard',
              state: { from: props.location },
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

function Routes() {
  const { signed } = useAuth();
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute signed={signed} path="/login" component={Login} />
        <Redirect from="/" exact to="/dashboard" />
        <PrivateRoute path={'/dashboard/patients/:page?'} signed={signed} exact>
          <Header />
          <UserSearch />
        </PrivateRoute>
        <PrivateRoute path="/dashboard/patient/store" exact signed={signed}>
          <Header />
          <UserStore />
        </PrivateRoute>
        <PrivateRoute path={'/dashboard/patient/show/:id?'} signed={signed}>
          <Header />
          <UserShow />
        </PrivateRoute>
        <PrivateRoute path={'/dashboard/patient/update/:id?'} signed={signed}>
          <Header />
          <UserUpdate />
        </PrivateRoute>
        <PrivateRoute path={'/dailyreport'} exact signed={signed}>
          <Header />
          <DailyReport />
        </PrivateRoute>
        <PrivateRoute
          path={'/dailyreport/:patientId/:reportId?'}
          signed={signed}
        >
          <Header />
          <ReportShow />
        </PrivateRoute>
        <PrivateRoute path="/dashboard" signed={signed} exact>
          <Header />
          <Home />
        </PrivateRoute>
        <Route path="*">
          <Page404 />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
