import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Logo from '../commons/Logo';

class Onboarding1 extends Component {
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
  }

  nextStep(evt) {
  }

  onChange(evt) {
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
                      Customize ChatBold
                    </h3>
                    <div class="m-login__desc">
                      Make ChatBold feel like home for both you and your website visitors by
                      customizing the design to match your brand.
                    </div>
                  </div>
                </div>

                <div class="m-login__form m-form">
                  <div class="m-login__form-action">
                    <Link to="/onboarding/2" class="btn btn-focus m-btn m-btn--pill m-btn--custom m-btn--air  m-login__btn">
                      Next
                    </Link>
                  </div>
                </div>
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
    actions: {
    }
  };
}

// SignUpPage.contextTypes = { setTitle: PropTypes.func.isRequired };
Onboarding1.propTypes = {
  actions: PropTypes.shape({
    signup: PropTypes.func.isRequired
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(Onboarding1);
