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
     </Table>
    );
  }
}

class FormBancoDeHoras extends Component {
  render() {
      return(
   <Form>
       <FormGroup>
           <div className="form-row">
                <Label for="funcionarios">Funcionario</Label>
                <Input id="funcionario" type="number" placeholder="Informe o Id do Funcionario"/>
           </div>
       </FormGroup>
       <FormGroup>
           <div className="form-row">
                <Label for="funcionarios">Entrada</Label>
                <Input id="funcionario" type="time" placeholder="Informe o Id do Funcionario"/>
           </div>
       </FormGroup>
       <FormGroup>
           <div className="form-row">
                <Label for="funcionarios">Saida</Label>
                <Input id="funcionario" type="time" placeholder="Informe o Id do Funcionario"/>
           </div>
       </FormGroup>
       <Button color="primary" block>Atualizar</Button>
   </Form>
    );
  }
}

class Dashboard extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6 my-3">
              <h2 className="font-weight-bold text-center ">ATUALIZAR BANCO DE HORAS</h2>
            <FormBancoDeHoras />
            </div>
            <div className="col-md-6 my-3">
              <h2 className="font-weight-bold text-center ">LISTA DE BANCO DE HORAS</h2>
                <ListBancoDeHoras/>
            </div>
          </div>
        </div>
    );
  }
}

export default Dashboard;
