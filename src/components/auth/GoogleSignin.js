import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {Link} from 'react-router-dom';
import {googleSignInAction} from '../../actions/AuthAction';

class GoogleSignin extends Component {
  constructor(props) {
    super(props);
    this.initGoogleSignin = this.initGoogleSignin.bind(this);
    this.googleSignInOnclick = this.googleSignInOnclick.bind(this);
  }


  initGoogleSignin() {
    console.log('initializing google signin');
    const self = this;
    gapi.load('auth2', function () {
      self.auth2 = gapi.auth2.init({
        client_id: '967919500698-d144mulltuieuin0dab1ur8ln2acq9kt.apps.googleusercontent.com',
      });
    });
  }

  googleSignInOnclick() {
    this.auth2.grantOfflineAccess()
      .then(({code})=> {
        console.log(code)
        this.props.actions.googleSignIn({code})
      })
      .catch((err)=> {
        console.log('isError: ', err)
      });
  }

  componentDidMount() {
    window.addEventListener('google-loaded', this.initGoogleSignin);
  }

  render() {
    return (
      <button id="g-signin2" onClick={this.googleSignInOnclick}>google</button>);
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      googleSignIn: (id_token)=>(dispatch(googleSignInAction(id_token)))
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(GoogleSignin);