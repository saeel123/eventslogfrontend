import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import AsyncComponent from './hoc/asyncComponent/asyncComponent';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = AsyncComponent(() => {
  return import('./containers/Dashboard/Dashboard')
});

class App extends Component {
  render() {

    let  routes = (
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Redirect to="/" />
      </Switch>
    )
   
    return (
      <div className="App">
        {routes}
      </div>
    );
  }
}

export default withRouter((App));