import react, { Component } from "react";
import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import Header from "../../header/Header";

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
      <div className="col-md-6">
        <Header title="Página de login" />
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
            <Label for="nomeUsuario"> Nome De Usuario</Label>
            <Input
              type="text"
              id="nomeUsuario"
              onChange={(e) => (this.nomeUsuario = e.target.value)}
              placeholder="Informe o seu email: "
            />
          </FormGroup>
          <FormGroup>
            <Label for="senha"> Senha</Label>
            <Input
              type="password"
              id="senha"
              onChange={(e) => (this.senha = e.target.value)}
              placeholder="Informe a sua senha: "
            />
          </FormGroup>
          <Button color="primary" block onClick={this.signIn}>
            {" "}
            Entrar{" "}
          </Button>
        </Form>
      </div>
    );
  }
}
