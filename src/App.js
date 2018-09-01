import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import configureStore from './store/configureStore';
import Welcome from './welcome/Welcome';
import Locks from './locks/Locks';


const store = configureStore();


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Welcome} />
            <Route path="/locks" component={Locks} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
