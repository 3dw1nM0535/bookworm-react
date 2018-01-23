import React from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import isEmail from 'validator/lib/isEmail';

import InlineError from '../messages/InlineErrors';

class ForgotPasswordForm extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      data: {
        email: ''
      },
      loading: false,
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

    const { loading, errors, data } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        { errors.global && (
          <Message negative>
            <Message.Header>Something went wrong</Message.Header>
            <p>{errors.global}</p>
          </Message>
        )}
        <Form.Field error={!!errors.email}>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            onChange={this.onChange}
            value={data.email}
            placeholder="example@email.com"
          />
        { errors.email && <InlineError text={errors.email} /> }
        </Form.Field>
        <Button primary>Reset Password</Button>
      </Form>
    );
  }
}

ForgotPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired
}

export default ForgotPasswordForm;
