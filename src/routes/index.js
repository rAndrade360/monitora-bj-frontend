import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import Route from './Route';
import Home from '../pages/Home';
import UserStore from '../pages/UserStore';
import UserSearch from '../pages/UserSearch';
import UserUpdate from '../pages/UserUpdate';
import DailyReport from '../pages/DailyReport';
import ReportShow from '../pages/ReportShow';
import Login from '../pages/Login';
import Page404 from '../pages/Page404';
import UserShow from '../pages/UserShow';

// import { Container } from './styles';

// function PrivateRoute({ signed, children, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         signed ? (
//           <div>
//             {/* <Header /> */}
//             {children}
//           </div>
//         ) : (
//           <Redirect
//             to={{
//               pathname: '/login',
//               state: { from: props.location },
//             }}
//           />
//         )
//       }
//     />
//   );
// }

function Routes() {
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
      <Route path="/dashboard" exact component={Home} isPrivate />
      <Route path="*" component={Page404} />
    </Switch>
  );
}

export default Routes;
