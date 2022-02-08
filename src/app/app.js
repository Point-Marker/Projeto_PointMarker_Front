import react, {Component} from "react";
import BancoDeHoras from "../componente/page/bancoHoras/BancoHoras";
import Login from "../componente/page/login/Login";


class App extends Component {
    render(){
        return(
            <div className="App">
                <BancoDeHoras/>
            </div>
        );
    }
}

export default App;