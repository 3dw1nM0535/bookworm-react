import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import DashboardPage from './components/pages/DashboardPage';
import ConfirmationPage from './components/pages/ConfirmationPage';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage';
import AddNewBookPage from './components/pages/AddNewBookPage';
import TopNavigation from './components/navigation/TopNavigation';
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';

const App = ({ location, isAuthenticated }) => (
  <div className='ui container'>
    {isAuthenticated && <TopNavigation /> }
    <Route location={location} path='/' exact component={HomePage} />
    <Route location={location} path='/confirmation/:token' exact component={ConfirmationPage} />
    <GuestRoute location={location} path='/signup' exact component={SignupPage} />
    <GuestRoute location={location} path='/login' exact component={LoginPage} />
    <GuestRoute location={location} path='/reset_password' component={ForgotPasswordPage} />
    <GuestRoute location={location} path='/reset-password/:token' component={ResetPasswordPage} />
    <UserRoute location={location} path='/dashboard' exact component={DashboardPage} />
    <UserRoute location={location} path='/books/new' exact component={AddNewBookPage} />
  </div>
)

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps (state) {
  return {
    isAuthenticated: !!state.user.email
  };
}
export default connect(mapStateToProps)(App);
