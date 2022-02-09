import { Tab } from "bootstrap";
import react, { Component } from "react";
import {
  Table,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";

class ListBancoDeHoras extends Component {
  render() {
    const { bancoHoras } = this.props;
    return (
      <Table className="table-bordered text-center">
        <thead className="thead-dark">
          <tr>
            <th>Funcionario</th>
            <th>Dia do Trabalho</th>
            <th>Entrada</th>
            <th>Saida</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bancoHoras.map((bancoHoras) => (
            <tr key={bancoHoras.id}>
              <td>{bancoHoras.funcionario.nome}</td>
              <td>{bancoHoras.diaDoTrabalho}</td>
              <td>{bancoHoras.entrada}</td>
              <td>{bancoHoras.saida}</td>
              <td>
                <Button color="info" size="sm">
                  Editar
                </Button>
                <Button color="danger" size="sm">
                  Deletar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

class FormBancoDeHoras extends Component {
  state = {
    model: {
      funcionario: "",
      entrada: "",
      saida: "",
    },
  };

  render() {
    return (
      <Form>
        <FormGroup>
          <div className="form-row">
            <Label for="funcionarios">Funcionario</Label>
            <Input
              id="funcionario"
              type="number"
              placeholder="Informe o Id do Funcionario"
            />
          </div>
        </FormGroup>
        <FormGroup>
          <div className="form-row">
            <Label for="funcionarios">Entrada</Label>
            <Input
              id="funcionario"
              type="time"
              placeholder="Informe o Id do Funcionario"
            />
          </div>
        </FormGroup>
        <FormGroup>
          <div className="form-row">
            <Label for="funcionarios">Saida</Label>
            <Input
              id="funcionario"
              type="time"
              placeholder="Informe o Id do Funcionario"
            />
          </div>
        </FormGroup>
        <Button color="primary" block>
          Atualizar
        </Button>
      </Form>
    );
  }
}

class Dashboard extends Component {
  url = "http://localhost:8080/bancohoras";

  state = {
    bancoHoras: [],
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
      .then((bancoHoras) => this.setState({ bancoHoras }))
      .catch((e) => console.log(e));
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6 my-3">
            <h2 className="font-weight-bold text-center ">
              ATUALIZAR BANCO DE HORAS
            </h2>
            <FormBancoDeHoras />
          </div>
          <div className="col-md-6 my-3">
            <h2 className="font-weight-bold text-center ">
              LISTA DE BANCO DE HORAS
            </h2>
            <ListBancoDeHoras bancoHoras={this.state.bancoHoras} />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
