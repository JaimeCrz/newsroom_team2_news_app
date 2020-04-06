import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import configureStore from "./state/store/configureStore";
import axios from "axios";
import { StripeProvider } from "react-stripe-elements";
import "./i18n";

axios.defaults.baseURL = "http://localhost:3000/api/";
// axios.defaults.baseURL = "https://urban-living.herokuapp.com/api/";
const key = `${process.env.REACT_APP_STRIPE_API_KEY}`;
const store = configureStore();
window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<div>Loading...</div>}>
      <StripeProvider apiKey={key}>
        <App />
      </StripeProvider>
    </Suspense>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();

if (window.Cypress) {
  window.store = store;
}
