import { legacy_createStore as createState } from "redux";
import Reducer from "../reducer/Reducer";

const Store = createState(Reducer);

export default Store;
