import react, { Component } from "react";
import {
  Table,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Navbar,
} from "reactstrap";
import Header from "../../../header/Header";
import "../dashboard-principal/estilo.css";

class ListaFuncionarios extends Component {
  render() {
    const { funcionarios } = this.props;
    return (
      <Table className="table-bordered border-dark text-center" id="tabela">
        <thead className="thead-dark text-dark " id="linhas">
          <tr>
            <th>Funcionario</th>
            <th>Data De Nascimento</th>
            <th>Horas Extras</th>
            <th>Salario</th>
            <th>Status</th>
            <th>Horas Trabalhadas</th>
            <th>Cargo</th>
          </tr>
          {funcionarios.map((funcionario) => (
            <tr
              key={funcionario.id}
              className="thead-dark text-dark "
              id="linhas"
            >
              <td>{funcionario.nome}</td>
              <td>{funcionario.dataDeNascimento}</td>
              <td>{funcionario.horasExtras}</td>
              <td>{funcionario.salario}</td>
              <td>{funcionario.status}</td>
              <td>{funcionario.totalHorasTrabalhadas}</td>
              <td>{funcionario.cargo.nome}</td>
            </tr>
          ))}
        </thead>
        <tbody></tbody>
      </Table>
    );
  }
}

class TelaPrincipal extends Component {
  url = "http://localhost:8080/dashboard";

  state = {
    funcionarios: [],
    message: {
      text: "",
      alert: "",
    },
  };

  componentDidMount() {
    let token = localStorage.getItem("token");
    const requestInfo = {
      method: "GET",
      headers: new Headers({
        "Content-type": "application/json",
        Authorization: token,
      }),
    };
    fetch(this.url, requestInfo)
      .then((response) => response.json())
      .then((funcionarios) => this.setState({ funcionarios }))
      .catch((e) => console.log(e));
  }

  render() {
    return (
      <div>
        <div>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
              <a class="navbar-brand" href="/dashboard">
                Point Marker
              </a>
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      aria-current="page"
                      href="/dashboard"
                    >
                      Home
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/atualizacaohoras">
                      Atualizar Banco de Horas
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/cadastro">
                      Cadastrar Funcionario
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/bancohoras">
                      Bater o Ponto
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/">
                      Sair
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <hr />
        <Header title="Bem Vindo" />
        <h2 className="font-weight-bold text-center "></h2>
        <ListaFuncionarios funcionarios={this.state.funcionarios} />
      </div>
    );
  }
}

export default TelaPrincipal;
