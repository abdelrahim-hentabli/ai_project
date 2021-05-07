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
            <Route path='/ai_project/' exact component={Home} />
            <Route path='/ai_project/eightpuzzle' component={EightPuzzle} />
            <Route path='/ai_project/ninemen' component={NineMen} />
          </Switch>
        </BrowserRouter>
    </>
  );
}

export default App;
