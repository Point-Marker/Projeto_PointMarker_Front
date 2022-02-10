import react, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import Header from "../../header/Header";

export default class BancoDeHoras extends Component {
  constructor(props) {
    
    super(props);
    this.state = {
      message: this.props.state ? this.props.state.message : "",
    };
  }

  save = () => {
    const url = "http://localhost:8080/leads";
    let data = {
      email: this.email,
      nome: this.name,
      descricao: this.observation,
    };
    const requestInfo = {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    };
    fetch(url, requestInfo)
      .then((response) => {
        console.log(this.email, this.name, this.observation);
        return response;
      })
      .catch((e) => {
        this.setState({ message: e.message });
        console.log(this.email, this.nome, this.observacoes);
      });
  };

  render() {
    return (
      <div>
        <Header title="Marcador de Ponto" />
        <hr />
        <Form>
          <FormGroup>
            <Label for="name"> Nome </Label>
            <Input
              type="text"
              id="name"
              onChange={(e) => (this.name = e.target.value)}
              placeholder="Informe o seu nome"
            />
          </FormGroup>
          <FormGroup>
            <Label for="horario"> Horário de entrada </Label>
            <Input
              type="time"
              id="entrada"
              onChange={(e) => (this.email = e.target.value)}
              placeholder="Informe o seu horário de entrada"
            />
          </FormGroup>
          <FormGroup>
            <Label for="horario"> Horário de saída </Label>
            <Input
              type="time"
              id="saida"
              onChange={(e) => (this.observation = e.target.value)}
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