import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import Store from "./store/store";
import { storeRedux } from "./store/store-redux";

interface State {
  store: Store;
}

const store = new Store();

export const Context = createContext<State>({
  store,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Context.Provider value={{ store }}>
    <Provider store={storeRedux}>
      <App />
    </Provider>
  </Context.Provider>
);
