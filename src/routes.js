import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './auth';
import Dashboard from './componente/page/dashboard/Dashboard';
import CadastroDeFuncionarios from './componente/page/cadastro/CadastroDeFuncionarios';
import Login from "./componente/page/login/Login";
import BancoHoras from './componente/page/bancoHoras/BancoHoras';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={Login} />
      <Route exact path='/cadastro' component={CadastroDeFuncionario} />
      <Route exact path='/bancohoras' component={BancoHoras} />
      <PrivateRoute path='/dashboard' component={Dashboard} />
    </Switch>
  </Router>
);

export default Routes;
