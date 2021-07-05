import { Provider } from "react-redux";
import { store } from "./Utils/Store";
import Index from "./Components/Index/Index";

function App() {
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
}

export default App;
