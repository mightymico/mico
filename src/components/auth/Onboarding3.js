import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Logo from '../commons/Logo';

class Onboarding3 extends Component {
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
    // this.props.history.push('/onboarding/3')
    window.location.assign('/')
  }

  nextStep(evt) {

  }

  onChange(evt) {
    const state = this.state;
    const data = {};
    data[evt.target.name] = evt.target.value;
    this.setState({...state, ...data});
  }

  render() {
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

                <div class="m-login__signin">
                  <div class="m-login__head">
                    <h3 class="m-login__title">
                      Last step to get Chatbold up and running
                    </h3>
                    <div class="m-login__desc">
                      Can you install the code yourself or should you ask a teammate?
                    </div>
                  </div>
                </div>

                <form class="m-login__form m-form" onSubmit={this.submit}>
                  {this.props.loginError &&
                  <div class="m-alert m-alert--outline alert alert-danger alert-dismissible" role="alert">
                    {/*<button type="button" class="close" data-dismiss="alert" aria-label="Close"></button>*/}
                    <span>{this.props.loginError}</span>
                  </div>}

                  <div class="m-login__form m-form">
                    <div class="m-login__form-action">
                      <button
                        type="submit"
                        class="btn btn-focus m-btn m-btn--pill m-btn--custom m-btn--air  m-login__btn">
                        Next
                      </button>
                    </div>
                  </div>

                </form>


              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    loginError: state.runtime.loginError
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {}
  };
}

Onboarding3.propTypes = {
  actions: PropTypes.shape({
    signup: PropTypes.func.isRequired
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(Onboarding3);
