import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router ,  Route,Switch} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import './index.css';
import './App.css';
import reportWebVitals from './reportWebVitals';
import Register from "./register";
import UnAuth from "./loginbar";
import LogIn from "./login";
import Layout from "./layout";
import Blog from "./blog";
import Home from "./home";
import Subject from "./subject";

import TableList from "./table.js";

import ForgotPass from "./forgotpass";
import ChangePass from "./changePass";

function App() {
return (
    <Router>
        <Switch>
            <Route exact path="/table" component={TableList} />
             <Route exact path="/table/:id" component={TableList} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/blog" component={Blog} />

            <Route exact path="/changepass" component={ChangePass} />
            <Route exact path="/register/:id" component={Register} />
            <Route exact path="/subject" component={Subject} />
            <div>

                <UnAuth/>
                <Route exact path="/forgotpass" component={ForgotPass} />
                <Route exact path="/"  component={Register} />
                <Route exact path="/login" component={LogIn} />
                <Route exact path="/register"  component={Register} />

            </div>
        </Switch>
    </Router>
    /*<div>
      <Router>
        <div>

          <Route exact path="/" component={Home} />
          <Route exact path="/contact"  component={Contact} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/contact/:id" component={Contact} />
          <Route exact path="/table" component={TableList} />
          <Route exact path="/table/:id" component={TableList} />
          <Route exact path="/blog/:id" component={Blog} />
          <Route exact path="/errormes" component={Error} />
        </div>
      </Router>
    </div>*/
);
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={store}>
        <App  />
    </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
