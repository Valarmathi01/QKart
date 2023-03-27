import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
import Login from "./components/Login";
import Products from "./components/Products";
import Checkout from "./components/Checkout";
import {Route,Switch} from 'react-router-dom';
import Thanks from "./components/Thanks";
export const config = {
  endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
};

function App() {
  return (
    
    
    <div className="App">
      <Switch>
        <Route exact path="/"><Products/></Route>
        <Route exact path="/Register"><Register/></Route>
        <Route exact path="/Login"><Login/></Route>
        <Route exact path="/Checkout"><Checkout/></Route>
        <Route exact path="/Thanks"><Thanks/></Route>
      </Switch>
          
    </div> 
    
  );
}

export default App;
