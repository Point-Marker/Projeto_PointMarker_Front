import react, { Component } from "react";
import '../app/App.css';
import Routes from "../routes";

class App extends Component {
  render() {
    return (
      <div className="App">
          <Routes></Routes>
      </div>
    );
  }
}

export default App;
