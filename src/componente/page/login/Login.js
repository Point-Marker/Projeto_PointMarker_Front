import react, { Component } from "react";
import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import Header from "../../header/Header";
import "./Login.css";
import "../../layout/Card.css";
import Card from "../../layout/Card";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.state ? this.props.state.message : "",
    };
  }

  signIn = () => {
    const url = "http://localhost:8080/login";
    const data = {
      nomeUsuario: this.nomeUsuario,
      senha: this.senha,
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
        if (response.ok) {
          console.log("O login foi realizado com sucesso.");
          return response.headers.get("Authorization");
        }
        throw new Error("Login inválido");
      })
      .then((token) => {
        localStorage.setItem("token", token);
        this.props.history.push("/dashboard");
      })
      .catch((e) => {
        this.setState({ message: e.message });
        console.log(this.email, this.password);
      });
  };

  render() {
    return (
      <div>
   
        <Header title="Point Marker" />
        <hr />
        {this.state.message !== "" ? (
          <Alert color="danger" className="text-center">
            {this.state.message}
          </Alert>
        ) : (
          ""
        )}
        <Form>
          <FormGroup>
            <Label for="nomeUsuario"> Login</Label>
            <Input
              type="text"
              id="nomeUsuario"
              onChange={(e) => (this.nomeUsuario = e.target.value)}
              placeholder="Email"
            />
          </FormGroup>
          <FormGroup>
            <Label for="senha"> Senha</Label>
            <Input
              type="password"
              id="senha"
              onChange={(e) => (this.senha = e.target.value)}
              placeholder="Digite sua senha"
            />
          </FormGroup>
          <Button color="danger" block onClick={this.signIn}>
            {" "}
            Entrar{" "}
          </Button>
        </Form>
      </div>

      
    );
  }
}
