import { takeLatest } from "redux-saga/effects";
import { CREATE_USER_REQUEST, FETCH_CURRENT_USER_REQUEST } from "./types";
import { createUserSaga, fetchUserSaga } from "./sagas/userSagas";

// Root saga
export default function* saga () {
  yield takeLatest(CREATE_USER_REQUEST, createUserSaga);
  yield takeLatest(FETCH_CURRENT_USER_REQUEST, fetchUserSaga);
}