import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./auth";
import Dashboard from "./componente/admin/page/dashboard/Dashboard";
import CadastroDeFuncionarios from "./componente/admin/page/cadastro/CadastroDeFuncionarios";
import Login from "../src/public/login/Login";
import BancoHoras from "./componente/admin/page/bancoHoras/BancoHoras";
import TelaPrincipal from "./componente/admin/page/dashboard-principal/TelaPrincipal";

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/cadastro" component={CadastroDeFuncionarios} />
      <Route exact path="/bancohoras" component={BancoHoras} />
      <PrivateRoute path="/atualizacaohoras" component={Dashboard} />
      <Route path="/dashboard" component={TelaPrincipal} />
    </Switch>
  </Router>
);

export default Routes;
