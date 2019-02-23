import { userLoggedIn } from './auth';
import api from '../api';

export default (data) => dispatch =>
  api.user.signup(data).then(user => {
    localStorage.bookwormJWT = user.token;
    dispatch(userLoggedIn(user))
  });
