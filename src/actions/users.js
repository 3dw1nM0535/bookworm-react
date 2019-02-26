import { userLoggedIn } from './auth';
import api from '../api';
import { userFetched } from "./actionCreators";

export default (data) => dispatch =>
  api.user.signup(data).then(user => {
    localStorage.bookwormJWT = user.token;
    dispatch(userLoggedIn(user))
  });

export const fetchCurrentUser = () => dispatch =>
  api.user.fetchCurrentUser().then(user => dispatch(userFetched(user)));
