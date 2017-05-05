import React from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import smoothScroll from 'smoothscroll';

export class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error: ''
    };
  }

  onSubmit (e) {
    e.preventDefault();

    let email = this.refs.emailRef.value.trim();
    let password = this.refs.passwordRef.value.trim();

    this.props.loginWithPassword({ email }, password, err => {
      if (err) {
        this.setState({
          error: 'Unable to Login. Please recheck your email and password'
        });
      } else {
        this.setState({ error: '' });
      }
    });
  }

  scrollToBottom (e) {
    e.preventDefault();
    var exampleDestination = document.querySelector('button');
    smoothScroll(exampleDestination, 1000);
  }

  render () {
    return (
      <div>
        <div className='header--name'>
          <h1 >Schwifty Notes</h1>
          <h1 className='header--name-sub'>Julian Currie</h1>
          <p onClick={this.scrollToBottom.bind(this)}>&#8675;</p>
        </div>
        <div className='boxed-view'>
          <div className='boxed-view--box' >
            <h1>Login</h1>
            {this.state.error ? <p>{this.state.error}</p> : undefined}
            <form onSubmit={this.onSubmit.bind(this)} noValidate className='boxed-view--form'>
              <input type='email' ref='emailRef' name='email' placeholder='Email' />
              <input
                type='password'
                ref='passwordRef'
                name='password'
                placeholder='Password'
              />
              <button className='button hvr-grow'>Login</button>
            </form>
            <Link to='/signup'>Don't have an account? Signup</Link>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginWithPassword: React.PropTypes.func.isRequired
};

export default createContainer(() => {
  return {
    loginWithPassword: Meteor.loginWithPassword
  };
}, Login);
