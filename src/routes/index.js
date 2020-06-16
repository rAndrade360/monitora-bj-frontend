import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import Route from './Route';
import Home from '../pages/Home';
import UserStore from '../pages/UserStore';
import UserSearch from '../pages/UserSearch';
import UserUpdate from '../pages/UserUpdate';
import DailyReport from '../pages/DailyReport';
import ReportShow from '../pages/ReportShow';
import StrategyStore from '../pages/StrategyStore';
import StrategyList from '../pages/StrategyList';
import Login from '../pages/Login';
import Page404 from '../pages/Page404';
import UserShow from '../pages/UserShow';
import { useAuth } from '../contexts/Auth';

function Routes() {
  const { user } = useAuth();
  return (
    <Switch>
      <Redirect exact from="/" to="/login" />
      <Route exact path="/login" component={Login} />
      <Route
        path="/dashboard/patients/:page?"
        exact
        component={UserSearch}
        isPrivate
      />
      <Route
        path="/dashboard/patient/:id/show"
        component={UserShow}
        isPrivate
      />
      <Route path="/dashboard" exact component={Home} isPrivate />
      <Route
        path="/dashboard/strategies"
        exact
        component={StrategyList}
        isPrivate
      />
      <Route
        path="/dashboard/strategy/store"
        exact
        component={StrategyStore}
        isPrivate
      />
      <Route
        path="/dashboard/patient/store"
        exact
        component={UserStore}
        isPrivate
      />
      <Route
        path="/dashboard/patient/update/:id?"
        component={UserUpdate}
        isPrivate
      />
      <Route path="/dailyreport" exact component={DailyReport} isPrivate />
      <Route
        path="/dailyreport/:patientId/:reportId?"
        component={ReportShow}
        isPrivate
      />
      <Route path="*" component={Page404} />
    </Switch>
  );
}

export default Routes;
