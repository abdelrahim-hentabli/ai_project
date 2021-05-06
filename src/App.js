import './App.css';
import Navbar from './components/navbar.js'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './pages/Home.js';
import EightPuzzle from './pages/EightPuzzle.js';
import NineMen from './pages/NineMen.js';

function App() {
  return (
    <>
        <BrowserRouter>
          <Navbar/>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/eightpuzzle' component={EightPuzzle} />
            <Route path='/ninemen' component={NineMen} />
          </Switch>
        </BrowserRouter>
    </>
  );
}

export default App;
