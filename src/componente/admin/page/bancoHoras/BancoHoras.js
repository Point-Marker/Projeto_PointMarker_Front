import react, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import Header from "../../../header/Header";

export default class BancoDeHoras extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.state ? this.props.state.message : "",
    };
  }

  save = () => {
    const url = "http://localhost:8080/bancohoras";
    let data = {
      funcionario:{
        id: this.id,
      },
      entrada: this.entrada,
      saida: this.saida,
    };
    const token = localStorage.getItem("token");
    const requestInfo = {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      }),
    };
    fetch(url, requestInfo)
      .then((response) => {
        this.props.history.push("/dashboard");
        return response;
      })
      .catch((e) => {
        this.setState({ message: e.message });
      });
  };

  render() {
    return (
      <div>
        <Header title="Marcador de Ponto" />
        <hr />
        <Form>
          <FormGroup>
            <Label for="id"> ID Do Funcionario </Label>
            <Input
              type="number"
              id="id"
              onChange={(e) => (this.id = e.target.value)}
              placeholder="Informe o id do Funcionario"
            />
          </FormGroup>
          <FormGroup>
            <Label for="horario"> Horário de entrada </Label>
            <Input
              type="time"
              id="entrada"
              onChange={(e) => (this.entrada = e.target.value)}
              placeholder="Informe o seu horário de entrada"
            />
          </FormGroup>
          <FormGroup>
            <Label for="horario"> Horário de saída </Label>
            <Input
              type="time"
              id="saida"
              onChange={(e) => (this.saida = e.target.value)}
              placeholder="Informe o seu horário de saida"
            />
          </FormGroup>
          <Button color="danger" block onClick={this.save}>
            Enviar
          </Button>
        </Form>
      </div>
    );
  }
}
