import './App.css';
import Navbar from './components/navbar.js'
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
        <BrowserRouter>
          <Navbar/>
          <Switch>
            <Route path='/' />
          </Switch>
        </BrowserRouter>
    </>
  );
}

export default App;
