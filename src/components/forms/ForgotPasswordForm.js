import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import isEmail from 'validator/lib/isEmail';

class ForgotPasswordForm extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      data: {
        email: ''
      },
      errors: {}
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.submit(this.state.data)
        .catch(err => this.setState({ errors: err.response.data.errors, loading: false }))
    }
  }

  validate = data => {
    const errors = {};
    if(!isEmail(data.email)) errors.email = 'Invalid email';
    return errors;
  }

  render () {

    const { errors, data } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        {!!errors.global && (
          <div className="alert alert-danger">{errors.global}</div>
        )}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={this.onChange}
            className={
              errors.email ? "form-control is-invalid" : "form-control"
            }
          />
          <div className="invalid-feedback">{errors.email}</div>
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Send Recover Password Link
        </button>

        <small className="form-text text-center">
          <Link to="/signup">Sign Up</Link> |
          <Link to="/login">Login</Link>
        </small>
      </form>
    );
  }
}

ForgotPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired
}

export default ForgotPasswordForm;
