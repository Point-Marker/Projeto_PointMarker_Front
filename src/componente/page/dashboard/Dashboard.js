import { Tab } from "bootstrap";
import PubSub from "pubsub-js";
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
  delete = (id) => {
    this.props.deleteBanco(id);
  };

  onEdit = (bancoHoras,data) => {
    PubSub.publish("edit-bancoHoras", bancoHoras);
  };

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
          {bancoHoras.map((banco) => (
            <tr key={banco.id}>
              <td>{banco.funcionario.nome}</td>
              <td>{banco.diaDoTrabalho}</td>
              <td>{banco.entrada}</td>
              <td>{banco.saida}</td>
              <td>
                <Button
                  color="info"
                  size="sm"
                  onClick={(e) => this.onEdit(banco,banco.diaDoTrabalho)}
                >
                  Editar
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  onClick={(e) => this.delete(banco.id)}
                >
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
    modelBanco: {
      funcionario: {
        cpf: "",
      },
      entrada: "",
      saida: "",
      diaDoTrabalho: ""
    },
  };

  componentWillMount() {
    PubSub.subscribe("edit-bancoHoras", (topic, bancoHoras) => {
      this.setState({ modelBanco: bancoHoras });
    });
  }

  setValuesBanco = (e, field) => {
    const { modelBanco } = this.state;
    modelBanco[field] = e.target.value;
    this.setState({ modelBanco });
  };

  create = () => {
    this.setState({ modelBanco: { entrada: "", saida: "" } });
    this.props.bancoHorasCreate(this.state.modelBanco, this.state.modelBanco.diaDoTrabalho);
  };

  render() {
    return (
      <Form>
        <FormGroup>
          <div className="form-row">
            <Label for="funcionario">Funcionario</Label>
            <Input
              id="funcionario"
              type="text"
              value={this.state.modelBanco.funcionario.cpf}
              onChange={(e) => this.setValuesBanco(e, "funcionario")}
            />
          </div>
        </FormGroup>
        <FormGroup>
          <div className="form-row">
            <Label for="entrada">Entrada</Label>
            <Input
              id="entrada"
              type="time"
              value={this.state.modelBanco.entrada}
              onChange={(e) => this.setValuesBanco(e, "entrada")}
            />
          </div>
        </FormGroup>
        <FormGroup>
          <div className="form-row">
            <Label for="saida">Saida</Label>
            <Input
              id="saida"
              type="time"
              value={this.state.modelBanco.saida}
              onChange={(e) => this.setValuesBanco(e, "saida")}
            />
          </div>
        </FormGroup>
        <Button color="primary" block onClick={this.onEdit}>
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
      .then((bancoHoras) => this.setState({ bancoHoras }))
      .catch((e) => console.log(e));
  }

  onEdit = (bancoHoras) => {
    let json = {
      entrada: bancoHoras.entrada,
      saida: bancoHoras.saida,
      data: bancoHoras.diaDoTrabalho,
    };
    
    const token = localStorage.getItem("token");
    const requestInfo = {
      method: "PUT",
      body: JSON.stringify(json),
      headers: new Headers({
        "Content-type": "application/json",
        Authorization: token,
      }),
    };
    fetch(this.url, requestInfo)
      .then((response) => response.json())
      .then((newBancoDeHoras) => {
        let { bancoHoras } = this.state; 
        bancoHoras.push(newBancoDeHoras);
        this.setState({
          bancoHoras,
          message: {
            text: "BancoDeHoras atualizado com sucesso. ",
            alert: "success",
          },
        });
        this.timerMessage(3000);
      })
      .catch((e) => console.log(e));
  };

  timerMessage = (duration) => {
    setTimeout(() => {
      this.setState({ message: { text: "", alert: "" } });
    }, duration);
  };

  delete = (id) => {
    const token = localStorage.getItem("token");
    const requestInfo = {
      method: "DELETE",
      headers: new Headers({
        "Content-type": "application/json",
        Authorization: token,
      }),
    };
    fetch(`${this.url}/${id}`, requestInfo)
      .then((rows) => {
        const bancoHoras = this.state.bancoHoras.filter(
          (bancoHoras) => bancoHoras.id != id
        );
        this.setState({
          bancoHoras,
          message: {
            text: "Banco de Horas Deletado Com Sucesso.",
            alert: "danger",
          },
        });
        this.timerMessage(3000);
      })
      .catch((e) => console.log(e));
  };

  render() {
    return (
      <div>
        {this.state.message.text !== "" ? (
          <Alert color={this.state.message.alert} className="text-center">
            {this.state.message.text}
          </Alert>
        ) : (
          ""
        )}
        <div className="row">
          <div className="col-md-6 my-3">
            <h2 className="font-weight-bold text-center ">
              ATUALIZAR BANCO DE HORAS
            </h2>
            <FormBancoDeHoras bancoHorasCreate={this.onEdit} />
          </div>
          <div className="col-md-6 my-3">
            <h2 className="font-weight-bold text-center ">
              LISTA DE BANCO DE HORAS
            </h2>
            <ListBancoDeHoras
              bancoHoras={this.state.bancoHoras}
              deleteBanco={this.delete}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
