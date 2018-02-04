import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {loginAction, setLoginErrorAction} from '../../actions/AuthAction';
import Logo from '../commons/Logo';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  onChange(evt) {
    const state = this.state;
    const data = {};
    data[evt.target.name] = evt.target.value;
    this.setState({...state, ...data});
  }

  submit(evt) {
    evt.preventDefault();
    var emailRegEx = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (!emailRegEx.test(this.state.email)) {
      this.props.actions.setLoginError('Please Enter a Valid Email');
    } else if (!this.state.password) {
      this.props.actions.setLoginError('Please Enter a Valid Password');

    } else {
      this.props.actions.login(this.state);
      this.props.actions.setLoginError(null);
    }
  }
  componentWillReceiveProps(props){
    if(props.isAuthenticated){
      this.props.history.push('/')
    }
  }

  render() {
    return (
      <div
        class="m--skin- m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default">
        <div class="m-grid m-grid--hor m-grid--root m-page">
          <div
            class="m-grid__item m-grid__item--fluid m-grid m-grid--hor m-login m-login--singin m-login--2 m-login-2--skin-2"
            id="m_login" style={{backgroundImage: "url(img//bg/bg-3.jpg)"}}>
            <div class="m-grid__item m-grid__item--fluid	m-login__wrapper">
              <div class="m-login__container">
                <div onClick={()=> {
                  window.location.replace('/');
                }}
                class="m-login__logo">
                  <Logo width="250px"/>
                </div>
                <div class="m-login__signin">
                  <div class="m-login__head">
                    <h3 class="m-login__title">
                      Sign in to Mico
                    </h3>
                  </div>
                  <form class="m-login__form m-form" onSubmit={this.submit}>
                    {this.props.loginError &&
                    <div class="m-alert m-alert--outline alert alert-danger alert-dismissible" role="alert">
                      {/*<button type="button" class="close" data-dismiss="alert" aria-label="Close"></button>*/}
                      <span>{this.props.loginError}</span>
                    </div>}
                    <div class="form-group m-form__group">
                      <input
                        class="form-control m-input" type="text" placeholder="Email" name="email"
                        autoComplete="off" onChange={this.onChange}/>
                    </div>
                    <div class="form-group m-form__group">
                      <input
                        class="form-control m-input m-login__form-input--last" type="password"
                        placeholder="Password" name="password" onChange={this.onChange}/>
                    </div>
                    <div class="row m-login__form-sub">
                      <div class="col m--align-left m-login__form-left">
                        {/*<label class="m-checkbox  m-checkbox--focus">*/}
                        {/*<input type="checkbox" name="remember"/>
                         Remember me*/}
                        Forget Password ?
                        <span></span>
                        {/*</label>*/}
                      </div>
                      <div class="col m--align-left m-login__form-right">
                        <a href="javascript:;" id="m_login_forget_password" class="m-link">
                          reset it
                        </a>
                      </div>
                    </div>
                    <div class="m-login__form-action">
                      <button
                        id="m_login_signin_submit"
                        class="btn btn-focus m-btn m-btn--pill m-btn--custom m-btn--air m-login__btn m-login__btn--primary">
                        Sign In
                      </button>
                    </div>
                  </form>
                </div>

                <div class="m-login__account">
                  <span class="m-login__account-msg">
                    Don't have an account yet ?
                  </span>
                  &nbsp;&nbsp;
                  <Link to="/signup" id="m_login_signup" class="m-link m-link--light m-login__account-link">
                    Sign Up
                  </Link>
                </div>
                <div class="m-login__form m-form">
                  <div class="m-login__form-action">
                    <button class="btn btn-focus m-btn m-btn--pill m-btn--custom m-btn--air  m-login__btn">
                      Login with your google Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>);
  }
}

function mapStateToProps(state) {
  return {
    loginError: state.runtime.loginError,
    isAuthenticated: state.auth.isAuthenticated,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      login: (info)=>(dispatch(loginAction(info))),
      setLoginError: (error)=>(dispatch(setLoginErrorAction(error)))
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
