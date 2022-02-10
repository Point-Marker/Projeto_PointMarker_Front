import react, { Component } from "react";
import '../app/App.css';
import BancoDeHoras from "../componente/page/bancoHoras/BancoHoras";
import CadastroDeFuncionarios from "../componente/page/cadastro/CadastroDeFuncionarios";
import Routes from "../routes";


class App extends Component {
  render() {
    return (
      <div className="App">
          <Routes/>
      </div>
    );
  }
}

export default App;
