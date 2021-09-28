import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Auth from './components/auth/Auth';


function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route path={["/login", "/signup"]}>
          <Auth />
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
