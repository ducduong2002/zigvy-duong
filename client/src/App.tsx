import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/configureStore";
import AppRoutes from "./routes";
import "./style/index.css";
function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppRoutes />
      </PersistGate>
    </Provider>
  );
}

export default App;
