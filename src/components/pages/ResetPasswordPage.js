import React from 'react';
import { Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { validateToken, resetPassword } from '../../actions/auth';
import ResetPasswordForm from '../forms/ResetPasswordForm';

class ResetPasswordPage extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      loading: true,
      success: false
    };
  }

  componentDidMount () {
    this.props.validateToken(this.props.match.params.token).then(
      () => this.setState({ loading: false, success: true })
    ).catch(() => this.setState({ loading: false, success: false }));
  }

  submit = data =>
    this.props.resetPassword(data).then(() => this.props.history.push('/login'));

  render () {

    const { loading, success } = this.state;
    const token = this.props.match.params.token;

    return (
      <div>
        { loading && <Message>Loading</Message> }
        { !loading && success && <ResetPasswordForm submit={this.submit} token={token} /> }
        { !loading && !success && <Message>Invalid Token</Message> }
      </div>
    );
  }
}

ResetPasswordPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  validateToken: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired
}

export default connect(null, { validateToken, resetPassword })(ResetPasswordPage);
