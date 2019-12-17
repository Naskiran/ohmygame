import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import { Values } from "redux-form-website-template";
import store from "src/components/store.js";
import showResults from "src/components/showresults.js";
import SimpleForm from "src/components/adminform.js";

ReactDOM.render(<App />, document.getElementById('root'));

const rootEl = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <div style={{ padding: 15 }}>
      <h2>Simple Form</h2>
      <SimpleForm onSubmit={showResults} />
      <Values form="simple" />
    </div>
  </Provider>,
  rootEl
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
