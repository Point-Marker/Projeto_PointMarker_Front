import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './auth';
import Dashboard from './componente/page/dashboard/Dashboard';

import Login from "./componente/page/login/Login";

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={Login} />
      <PrivateRoute path='/dashboard' component={Dashboard} />
    </Switch>
  </Router>
);

export default Routes;
