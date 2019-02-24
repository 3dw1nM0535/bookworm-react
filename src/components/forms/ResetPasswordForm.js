import React from 'react';
import PropTypes from 'prop-types';

class ResetPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        token: this.props.token,
        password: '',
        passwordConfirmation: ''
      },
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = e => this.setState({
    data: { ...this.state.data, [e.target.name]: e.target.value }
  })

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.submit(this.state.data).catch(err =>
        this.setState({ errors: err.response.data.errors, loading: false})
      );
    }
  }

  validate = data => {
    const errors = {};
    if (!data.password) errors.password = "Password can't be blank";
    if (data.password !== data.passwordConfirmation) errors.passwordConfirmation = 'Passwords must match';
    return errors;
  }

  render () {

    const { data, errors } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={this.onChange}
            className={
              errors.password ? "form-control is-invalid" : "form-control"
            }
          />
          <div className="invalid-feedback">{errors.password}</div>
        </div>

        <div className="form-group">
          <label htmlFor="passwordConfirmation">Confirm Password</label>
          <input
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            value={data.passwordConfirmation}
            onChange={this.onChange}
            className={
              errors.passwordConfirmation
                ? "form-control is-invalid"
                : "form-control"
            }
          />
          <div className="invalid-feedback">{errors.passwordConfirmation}</div>
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Reset Password
        </button>
      </form>
      </div>
    );
  }
}

ResetPasswordForm.propTypes = {
  token: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired
}

export default ResetPasswordForm;
