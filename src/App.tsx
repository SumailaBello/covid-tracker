import React from 'react';
import './App.css';
import MainApp from './components/MainApp/MainApp';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'mobx-react';
import Store from './components/Store/Store';

const store = new Store(); //instantiating state store
const App = ()=> {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}

export default App;
