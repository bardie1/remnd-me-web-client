import React, { useContext, useEffect } from 'react';
import {
  BrowserRouter as Router
} from "react-router-dom";
import './App.css';
import Auth from './components/auth/Auth';
import BaseApp from './components/baseApp/BaseApp';
import { UserContext } from "./context/userContext";
import { sessionService } from './services/session';

interface IAppProps {
}

const App: React.FunctionComponent<IAppProps> = (props) => {

  const userContext = useContext(UserContext);

  useEffect(() => {
    if (sessionService.getUser()) {
      userContext.login(sessionService.getUser());
    };
  }, [])

  return (
    <Router>
      <div className="App">

        {
          userContext?.user ?
          <BaseApp />
          :
          <Auth />
        }
        
      </div>
    </Router>
  );
};

export default App;
