import { Provider } from "react-redux";
import { store } from "./store";
import ClickerRender from "./render";

const Clicker = () => {
  return (
    <Provider store={store}>
      <ClickerRender />
    </Provider>
  );
};

export default Clicker;
