import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./components/AuthProvider.jsx";
import createStore from "./store/store.jsx";
import { Provider } from "react-redux";
//-------------------------------------------------------------------------------------------
const store = createStore();
console.log("store", store.getState());
store.subscribe(() => {
  console.log("store updated", store.getState());
});

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </BrowserRouter>
);
