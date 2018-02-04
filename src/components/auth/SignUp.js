import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Logo from '../commons/Logo';
import {signUpAction, setLoginErrorAction} from '../../actions/AuthAction';

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signupError: null,
      nextStep: 1
    };
    this.onChange = this.onChange.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit(evt) {
    evt.preventDefault();
    const {email, password, rePassword}=this.state;
    if (password != rePassword) return this.props.actions.setLoginError('Password donot match');
    this.props.actions.signup({email, password}, this.props.history);
  }

  nextStep(evt) {
    evt.preventDefault();
    var emailRegEx = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (!emailRegEx.test(this.state.email)) {
      this.props.actions.setLoginError('Please Enter a Valid Email');
    } else {
      this.setState({nextStep: 2});
      this.props.actions.setLoginError(null);
    }
  }

  onChange(evt) {
    const state = this.state;
    const data = {};
    data[evt.target.name] = evt.target.value;
    // console.log(data)
    this.setState({...state, ...data});
  }

  render() {
    const form = this.state.nextStep == 2 ? (
      <div key="signup2" class="m-login__signup" style={{display: 'block'}}>
        <form class="m-login__form m-form" onSubmit={this.submit}>
          {this.props.loginError &&
          <div class="m-alert m-alert--outline alert alert-danger alert-dismissible" role="alert">
            <span>{this.props.loginError}</span>
          </div>}
          <div class="form-group m-form__group">
            <input
              id="signinpas"
              onChange={this.onChange} class="form-control m-input" type="password"
              placeholder="Password" name="password"/>
          </div>
          <div class="form-group m-form__group">
            <input
              onChange={this.onChange} class="form-control m-input m-login__form-input--last" type="password"
              placeholder="Confirm Password" name="rePassword"/>
          </div>
          <div class="m-login__form-action">
            <button
              type="submit" id="m_login_signup_submit"
              class="btn btn-focus m-btn m-btn--pill m-btn--custom m-btn--air  m-login__btn">
              Create Your Account
            </button>
          </div>
        </form>
      </div>
    ) : (
      <div key="signup1" class="m-login__signup" style={{display: 'block'}}>
        <div class="m-login__head">
          <div class="m-login__title">
            Enter Your Email AddressTo Start Your Free Trial
          </div>
        </div>
        <form class="m-login__form m-form">
          {this.props.loginError &&
          <div class="m-alert m-alert--outline alert alert-danger alert-dismissible" role="alert">
            <span>{this.props.loginError}</span>
          </div>}
          <div class="form-group m-form__group">
            <input
              class="form-control m-input" type="email" placeholder="Email" name="email" autoComplete="off"
              onChange={this.onChange}/>
          </div>
          <div class="m-login__form-action">
            <button
              type='submit'
              onClick={this.nextStep}
              id="m_login_signup_submit" class="btn btn-focus m-btn m-btn--pill m-btn--custom m-btn--air  m-login__btn">
              Start Your Free Trial
            </button>
          </div>
        </form>
        <div class="m-login__account">
          <span class="m-login__account-msg">
            Already Have an Account?
          </span>
          &nbsp;&nbsp;
          <Link to='/login' id="m_login_signup" class="m-link m-link--light m-login__account-link">
            Login
          </Link>
        </div>
        <div class="m-login__form m-form">
          <div class="m-login__form-action">
            <button class="btn btn-focus m-btn m-btn--pill m-btn--custom m-btn--air  m-login__btn">
              Continue with your google Account
            </button>
          </div>
        </div>
      </div>
    );

    return (
      <div
        class="m--skin- m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default">
        <div class="m-grid m-grid--hor m-grid--root m-page">
          <div
            class="m-grid__item m-grid__item--fluid m-grid m-grid--hor m-login m-login--singin m-login--2 m-login-2--skin-2"
            id="m_login" style={{backgroundImage: "url(../../../assets/app/media/img//bg/bg-3.jpg)"}}>
            <div class="m-grid__item m-grid__item--fluid	m-login__wrapper">
              <div class="m-login__container">
                <div class="m-login__logo">
                  <Logo onClick={()=> {
                    window.location.replace('/');
                  }}/>
                </div>
                {form}
              </div>
            </div>
          </div>
        </div>
      </div>);
  }
}
function mapStateToProps(state) {
  return {
    loginError: state.runtime.loginError
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      signup: (info, history)=>(dispatch(signUpAction(info, history))),
      setLoginError: (error)=>(dispatch(setLoginErrorAction(error)))
    }
  };
}

// SignUpPage.contextTypes = { setTitle: PropTypes.func.isRequired };
SignUpPage.propTypes = {
  actions: PropTypes.shape({
    signup: PropTypes.func.isRequired
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
