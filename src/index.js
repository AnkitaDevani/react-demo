import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router ,  Route,Switch} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import './index.css';
import './styles.scss';
import reportWebVitals from './reportWebVitals';
import Register from "./register";
import UnAuth from "./loginbar";
import LogIn from "./login";
import Layout from "./layout";
import Blog from "./blog";
import Home from "./home";
import Subject from "./subject";
import Form from "./form";
import TableList from "./table.js";
import "./sheetstyle.scss";
import ForgotPass from "./forgotpass";
import ChangePass from "./changePass";
import LogOut from "./logout";
import LogInGoogle from "./googleLogin";
import ResGoogle from "./regWithGoogle";
import GoogleUser from "./googleUser";

function App() {
return (
    <Router>
        <Switch>
            <Route exact path="/table" component={TableList}/>
            <Route exact path="/table/:id" component={TableList} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/blog" component={Blog} />
            <Route exact path="/changepass" component={ChangePass} />
            <Route exact path="/register/:id" component={Register} />
            <Route exact path="/subject" component={Subject} />
            <Route exact path="/logout" component={LogOut} />
            <Route exact path="/form" component={Form} />
            <Route exact path="/googlelogin" component={LogInGoogle} />
            <Route exact path="/reswithgoogle" component={GoogleUser} />
            <>
              <UnAuth/>

              <Route exact path="/"  component={Register} />
              <Route exact path="/forgotpass" component={ForgotPass} />
              <Route exact path="/login" component={LogIn} />
              <Route exact path="/register"  component={Register} />
            </>
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
