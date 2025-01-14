import { all } from "redux-saga/effects";
import registerSaga from "./login/userSaga";
import userSaga from "./login/userSaga";

function* rootSaga() {
  yield all([registerSaga(), userSaga()]);
}

export default rootSaga;
