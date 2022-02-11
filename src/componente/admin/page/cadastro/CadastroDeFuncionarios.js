import react, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import Header from "../../../header/Header";

export default class CadastroDeFuncionarios extends Component {
  save = () => {
    const url = "http://localhost:8080/dashboard/cadastro/funcionarios";
    let data = {
      nome: this.nome,
      cpf: this.cpf,
      dataDeNascimento: this.dataDeNascimento,
      cargo: {
        id: this.cargo,
      },
      usuario: {
        nomeUsuario: this.nomeUsuario,
        senha: this.senha,
      },
    };
    const requestInfo = {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-type": "application/json",
      }),
    };
    fetch(url, requestInfo)
      .then((response) => {
        if (localStorage.getItem("token") == null) {
          this.props.history.push("/");
        }
        this.props.history.push("/dashboard");
        return response;
      })
      .catch((e) => console.log(e));
  };

  render() {
    return (
      <div>
        <Header title="Cadastro de Funcionarios" />
        <hr />
        <Form>
          <FormGroup>
            <Label for="nome"> Nome do Funcionario: </Label>
            <Input
              type="text"
              id="nome"
              onChange={(e) => (this.nome = e.target.value)}
              placeholder="Informe o seu nome"
            />
          </FormGroup>
          <FormGroup>
            <Label for="cpf"> CPF Do Funcionario: </Label>
            <Input
              type="text"
              id="cpf"
              onChange={(e) => (this.cpf = e.target.value)}
              placeholder="Informe o seu horário de entrada"
            />
          </FormGroup>
          <FormGroup>
            <Label for="dataDeNascimento"> Data De Nascimento: </Label>
            <Input
              type="text"
              id="dataDeNascimento"
              onChange={(e) => (this.dataDeNascimento = e.target.value)}
              placeholder="dd/MM/aaaa"
            />
          </FormGroup>
          <FormGroup>
            <Label for="cargo"> Cargo: </Label>
            <Input
              type="text"
              id="cargo"
              onChange={(e) => (this.cargo = e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="nomeUsuario"> Nome de Usuario: </Label>
            <Input
              type="text"
              id="nomeUsuario"
              onChange={(e) => (this.nomeUsuario = e.target.value)}
              placeholder="Informe o seu nome de usuario"
            />
          </FormGroup>
          <FormGroup>
            <Label for="senha"> Senha: </Label>
            <Input
              type="password"
              id="senha"
              onChange={(e) => (this.senha = e.target.value)}
              placeholder="Digite a sua Senha"
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
