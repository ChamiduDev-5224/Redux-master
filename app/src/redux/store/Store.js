import { legacy_createStore as createState } from "redux";
import Reducer from "../reducer/Reducer";

const Store = createState(
  Reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default Store;
