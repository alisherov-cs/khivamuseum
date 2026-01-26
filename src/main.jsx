import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./responsive.css";
import "./i18n.jsx";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
