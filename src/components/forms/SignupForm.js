import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import isEmail from 'validator/lib/isEmail';

import InlineError from '../messages/InlineErrors';

class SignupForm extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      data: {
        email: '',
        password: ''
      },
      loading: false,
      errors: {}
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange = e => {
    this.setState({ ...this.state,
    data: { ...this.state.data, [e.target.name]: e.target.value } });
  }

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.submit(this.state.data).catch(err =>
        this.setState({ errors: err.response.data.errors, loading: false }));
    }
  }

  validate = data => {
    const errors = {};
    if (!isEmail(data.email)) errors.email = 'Invalid Email';
    if (!data.password) errors.password = "Password can't be blank";
    return errors;
  }

  render () {

    const { loading, data, errors } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        <Form.Field error={!!errors.email}>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            value={data.email}
            onChange={this.onChange}
            id='email'
            placeholder='example@email.com'
          />
        { errors.email && <InlineError text={errors.email} /> }
        </Form.Field>

        <Form.Field error={!!errors.password}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            placeholder='Provide a strong password'
            onChange={this.onChange}
            value={data.password}
            id='password'
          />
        { errors.password && <InlineError text={errors.password} /> }
        </Form.Field>
        <Button primary>Sign Up</Button>
      </Form>
    );
  }
}

SignupForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default SignupForm;
